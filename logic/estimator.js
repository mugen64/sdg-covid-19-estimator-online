function estimator(data) {
  /**
   * Normalize time period to days
   * @param {*} duration
   * @param {*} unit
   */
  const calcDays = (duration, unit) => {
    let days = duration;
    // We assume default unit =days so if none of the conditions match we assume its days
    if (unit === 'weeks') {
      days = duration * 7;
    } else if (unit === 'months') {
      // With no way of knowing the months lets assume all months have 30 days
      days = duration * 30;
    }
    return days;
  };

  /**
   * Generates an estimator
   * @param {*} data
   * @returns {Function}
   */
  /**
   * Calcs the estimated cases based on current infected and duration
   * @param {Number} infected
   * @param {Number} duration
   * @param {String} unit
   * @return {Number}
   */
  const calcEstimateAfterGivenPeriod = (infected, duration, unit) => {
    const power = Math.trunc(calcDays(duration, unit) / 3);
    const factor = 2 ** power;
    // console.log(power, factor);
    return infected * factor;
  };

  const { reportedCases, periodType, timeToElapse, region } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
  return (multiplier) => {
    // calculate currently infected based on reportedCases and a multiplier for correction
    const currentlyInfected = reportedCases * multiplier;
    // calculate severe cases by req time based on an estimate of 15% of infections by that time
    // console.log(currentlyInfected, timeToElapse, periodType);
    const infectionsByRequestedTime = Math.trunc(
      calcEstimateAfterGivenPeriod(currentlyInfected, timeToElapse, periodType)
    );
    // calculate severe cases by req time based on an estimate of 15% of infections by that time
    const severeCasesByRequestedTime = Math.trunc(
      infectionsByRequestedTime * (15 / 100)
    );
    // calculate number of beds that will be available at the time based on an availabilty of 35%
    const hospitalBedsByRequestedTime = Math.trunc(
      data.totalHospitalBeds * (35 / 100) - severeCasesByRequestedTime
    );
    // calculate expected intensive care cases by that time at a rate of 5% of infected at the time
    const casesForICUByRequestedTime = Math.trunc(
      infectionsByRequestedTime * (5 / 100)
    );
    // calculate expected ventilatore cases by that time at a rate of 2% of infected at the time
    const casesForVentilatorsByRequestedTime = Math.trunc(
      infectionsByRequestedTime * (2 / 100)
    );

    const dollarsInFlight = Math.trunc(
      (infectionsByRequestedTime *
        avgDailyIncomePopulation *
        avgDailyIncomeInUSD) /
        calcDays(timeToElapse, periodType)
    );

    // console.log(infectionsByRequestedTime,
    //   avgDailyIncomePopulation,
    //   avgDailyIncomeInUSD,
    //   calcDays(timeToElapse, periodType));
    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };
}

const covid19ImpactEstimator = (data) => {
  // generate a function that takes a multiplier to generate
  // our estimates
  const fn = estimator(data);
  return {
    data,
    impact: fn(10),
    severeImpact: fn(50)
  };
};

export default covid19ImpactEstimator;
