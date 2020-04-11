import Estimator from '../estimator';

// Sample Data
let data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

describe('covid19ImpactEstimator', () => {
  beforeEach(() => {
    data = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
      },
      periodType: 'days',
      timeToElapse: 58,
      reportedCases: 674,
      population: 66622705,
      totalHospitalBeds: 1380614
    };
  });
  it(
    'should return the given region data as it were given, the estimated impact and ' +
      'an estimated severeImpact',
    () => {
      // Given our non empty data
      // If we run the estimator
      const result = Estimator(data);
      // expect the returned result
      const keys = Object.keys(result);
      // to contain the data given
      expect(keys).toContain('data');
      // unchanged
      expect(result.data).toEqual(data);
      // to also contain impact
      expect(keys).toContain('impact');
      // and the severeImpact
      expect(keys).toContain('severeImpact');
    }
  );
  it(
    'should calculate estimated number of currently infected people as reportedCases * 10 ' +
      'and return the value as "currentlyInfected" a property of impact',
    () => {
      // Given our non empty data
      // if we run the estimator
      const { impact } = Estimator(data);
      // expect to have the key currentlyInfected under impact
      expect(Object.keys(impact)).toContain('currentlyInfected');
      // and the value of impact.currentlyInfected to Equal reportedCasess * 50
      expect(impact.currentlyInfected).toEqual(data.reportedCases * 10);
    }
  );
  it(
    'should calculate severe estimate of number currently infected people as reportedCases * 50' +
      ' and return the value as "currentlyInfected" a property of severeImpact',
    () => {
      // Given our non empty data
      // if we run the estimator
      const { severeImpact } = Estimator(data);
      // expect to have the key currentlyInfected under severeImpact
      expect(Object.keys(severeImpact)).toContain('currentlyInfected');
      // and the value of severeImpact.currentlyInfected to Equal reportedCasess * 50
      expect(severeImpact.currentlyInfected).toEqual(data.reportedCases * 50);
    }
  );

  it(
    'should estimate the number of infected people from now to a given period and return ' +
      'it as "infectionsByRequestedTime" a property of both impact and severeImpact',
    () => {
      // Given our non empty data
      // if we run the estimator
      const { impact, severeImpact } = Estimator(data);
      // expect to have the key infectionsByRequestedTime under impact
      expect(Object.keys(impact)).toContain('infectionsByRequestedTime');
      // expect to have the key infectionsByRequestedTime under severeImpact
      expect(Object.keys(severeImpact)).toContain('infectionsByRequestedTime');
    }
  );

  it(
    'should estimate infectionsByRequestedTime for both impact and severImpact as there respective' +
      ' currentlyInfected x (2 to the power of days/3)',
    () => {
      // given our non empty data with a periodType in days
      // if we run the estimator
      const { impact, severeImpact } = Estimator(data);
      // expect infectionsByRequestedTime = be currentlyInfected *  (2 power time in day /3)
      // for impact
      expect(impact.infectionsByRequestedTime).toBe(
        impact.currentlyInfected * 2 ** Math.trunc(data.timeToElapse / 3)
      );
      // and for severImpact
      expect(severeImpact.infectionsByRequestedTime).toBe(
        severeImpact.currentlyInfected * 2 ** Math.trunc(data.timeToElapse / 3)
      );
    }
  );

  it(
    'should be able to make calculations for infectionsByRequestedTime for both impact and severImpact' +
      ' even if periodType is not in days but in weeks',
    () => {
      // given our non empty data with a periodType in weeks
      data.periodType = 'weeks';
      // if we run the estimator
      const { impact, severeImpact } = Estimator(data);
      // expect infectionsByRequestedTime = be currentlyInfected *  (2 power time in day /3)
      const power = Math.trunc((data.timeToElapse * 7) / 3);
      // for impact
      expect(impact.infectionsByRequestedTime).toBe(
        impact.currentlyInfected * 2 ** power
      );
      // and for severImpact
      expect(severeImpact.infectionsByRequestedTime).toBe(
        severeImpact.currentlyInfected * 2 ** power
      );
    }
  );
  it(
    'should be able to make calculations for infectionsByRequestedTime for both impact and severImpact' +
      'even if periodType is not in days but in months assuming a month has 30 days',
    () => {
      // given our non empty data with a periodType in weeks
      data.periodType = 'months';
      // if we run the estimator
      const { impact, severeImpact } = Estimator(data);
      // expect infectionsByRequestedTime = be currentlyInfected *  (2 power time in day /3)
      const power = (data.timeToElapse * 30) / 3;
      // for impact
      expect(impact.infectionsByRequestedTime).toBe(
        impact.currentlyInfected * 2 ** power
      );
      // and for severImpact
      expect(severeImpact.infectionsByRequestedTime).toBe(
        severeImpact.currentlyInfected * 2 ** power
      );
    }
  );
  it(
    'should calculate the "severeCasesByRequestedTime" estimate of a given period as' +
      ' 15% of the respective "infectionsByRequestedTime" for both impact and severeImpact',
    () => {
      // given our non empty data
      const { impact, severeImpact } = Estimator(data);
      // expect severeCasesbyRequestedTime to be 15% of infectionsByRequestedTime
      // for impact
      expect(impact.severeCasesByRequestedTime).toBe(
        impact.infectionsByRequestedTime * (15 / 100)
      );
      // and for severImpact
      expect(severeImpact.severeCasesByRequestedTime).toBe(
        severeImpact.infectionsByRequestedTime * (15 / 100)
      );
    }
  );
  it(
    'should calculate the "hospitalBedsByRequestedTime" based on a availability of 35%  and ' +
      'number of respective severeCasesByRequestedTime for both impact and severeImpact',
    () => {
      // given our non empty data
      const { impact, severeImpact } = Estimator(data);
      // expect severeCasesbyRequestedTime to be 15% of infectionsByRequestedTime
      // for impact
      expect(impact.hospitalBedsByRequestedTime).toBe(
        Math.trunc(
          data.totalHospitalBeds * (35 / 100) -
            impact.severeCasesByRequestedTime
        )
      );
      // and for severImpact
      expect(severeImpact.hospitalBedsByRequestedTime).toBe(
        Math.trunc(
          data.totalHospitalBeds * (35 / 100) -
            severeImpact.severeCasesByRequestedTime
        )
      );
    }
  );

  // it('should calculate the "hospitalBedsByRequestedTime" as negative to mean shortage'
  // + ' if respective severeCasesByRequestedTime are more than available beds', () => {
  //   // given our non empty data a
  //   const { impact, severeImpact } = Estimator(data);
  //   // if impact  impact.hospitalBedsByRequestedTime
  //   expect(impact.hospitalBedsByRequestedTime < 0)
  //     .toBe(true);
  //   // and for severImpact
  //   expect(severeImpact.hospitalBedsByRequestedTime < 0)
  //     .toBe(true);
  // });

  it(
    'should calculate expected intensive care cases by that time "casesForICUByRequestedTime" at a rate of ' +
      '5% of infected at the time "infectionsByRequestedTime" for both impact and severImpact',
    () => {
      // given our non empty data
      const { impact, severeImpact } = Estimator(data);
      // expect casesForICUByRequestedTime to be 5% of infectionsByRequestedTime
      // for impact
      expect(impact.casesForICUByRequestedTime).toBe(
        impact.infectionsByRequestedTime * (5 / 100)
      );
      // and for severImpact
      expect(severeImpact.casesForICUByRequestedTime).toBe(
        severeImpact.infectionsByRequestedTime * (5 / 100)
      );
    }
  );

  it(
    'should calculate expected intensive care cases by that time "casesForVentilatorsByRequestedTime" at a rate of ' +
      '2% of infected at the time "infectionsByRequestedTime" for both impact and severImpact',
    () => {
      // given our non empty data
      const { impact, severeImpact } = Estimator(data);
      // expect casesForICUByRequestedTime to be 5% of infectionsByRequestedTime
      // for impact
      expect(impact.casesForVentilatorsByRequestedTime).toBe(
        Math.trunc(impact.infectionsByRequestedTime * (2 / 100))
      );
      // and for severImpact
      expect(severeImpact.casesForVentilatorsByRequestedTime).toBe(
        Math.trunc(severeImpact.infectionsByRequestedTime * (2 / 100))
      );
    }
  );

  it(
    'should given estimate how much money "dollarsInFlight" the economy is likely to lose over the time period ' +
      'based on "infectionsByRequestedTime" the average income of region, income population proportion and period in days',
    () => {
      // given our non empty data
      const { impact, severeImpact } = Estimator(data);
      const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
      // for impact
      expect(impact.dollarsInFlight).toBe(
        Math.trunc(
          (impact.infectionsByRequestedTime *
            avgDailyIncomePopulation *
            avgDailyIncomeInUSD) /
            data.timeToElapse
        )
      );
      // and for severImpact
      expect(severeImpact.dollarsInFlight).toBe(
        Math.trunc(
          (severeImpact.infectionsByRequestedTime *
            avgDailyIncomePopulation *
            avgDailyIncomeInUSD) /
            data.timeToElapse
        )
      );
    }
  );
});
