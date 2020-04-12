<template>
  <article class="calculator" aria-label="Estimation Form">
    <!-- <h3>Change The Values</h3>
     -->
    <form class="box-shadow" role="form" @submit.prevent="submit()">
      <p>Edit Values Below And Click Estimate</p>
      <br />
      <fieldset class="calculator__fieldset">
        <legend>Region Data</legend>
        <div class="calculator__field">
          <div class="calculator__input">
            <label for="name">Name</label>
            <select id="name" v-model="model.region.name">
              <option
                v-for="v in regions"
                :key="`region-name-option-${v}`"
                v-text="v"
              />
            </select>
          </div>
        </div>
        <div class="calculator__field">
          <calculator-text-input
            v-model="model.region.avgAge"
            label="Average Age"
            type="number"
            min="0"
            step="0.01"
          />
        </div>
        <div class="calculator__field">
          <calculator-text-input
            v-model="model.region.avgDailyIncomeInUSD"
            label="Average Daily Income In $"
            type="number"
            min="0"
            step="0.01"
          />
        </div>
        <div class="calculator__field">
          <calculator-text-input
            v-model="model.region.avgDailyIncomePopulation"
            label="Average Daily Income IPopulation"
            min="0"
          />
        </div>
        <div class="calculator__field">
          <calculator-text-input
            v-model="model.reportedCases"
            label="Reported Cases"
            type="number"
            min="0"
            :data-reported-cases="model.reportedCases"
          />
        </div>
        <div class="calculator__field">
          <calculator-text-input
            v-model="model.population"
            label="Population"
            type="number"
            :data-population="model.population"
            min="0"
          />
        </div>
        <div class="calculator__field">
          <calculator-text-input
            v-model="model.totalHospitalBeds"
            label="Total Hospital Beds"
            type="number"
            :data-total-hospital-beds="model.totalHospitalBeds"
          />
        </div>
      </fieldset>
      <fieldset class="calculator__fieldset">
        <legend>Estimation Parameters</legend>
        <div class="calculator__field">
          <div class="calculator__input">
            <label for="periodType">Period Type</label>
            <select
              id="periodType"
              v-model="model.periodType"
              :data-period-type="model.periodType"
            >
              <option
                v-for="v in periodTypes"
                :key="`period-type-option-${v}`"
                v-text="v"
              />
            </select>
          </div>
        </div>
        <div class="calculator__field">
          <calculator-text-input
            v-model="model.timeToElapse"
            label="Time To Elapse"
            :data-time-to-elapse="model.timeToElapse"
            type="number"
            min="1"
          />
        </div>
      </fieldset>
      <button
        type="submit"
        value="Estimate"
        data-goestimate
        v-text="`Do Estimation`"
      />
    </form>
  </article>
</template>
<script>
import CalculatorTextInput from '~/components/CalculatorTextInput';
export default {
  components: {
    CalculatorTextInput
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      periodTypes: ['days', 'weeks', 'months'],
      regions: ['Africa']
    };
  },
  created() {
    this.model = this.value.data;
  },
  methods: {
    submit(e) {
      this.$emit('input', this.$Estimator(this.model));
    }
  }
};
</script>
<style lang="scss">
.calculator {
  width: 100%;
  form {
    width: 100%;
    background: $white;
    padding: calc(#{$padding-sm} * 2);
    max-width: 360px;
    margin: 0 auto;
    button {
      margin-left: auto;
      display: block;
    }
    p {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
  .result {
    text-align: right;
    color: $secondary;
  }
  &__fieldset {
    margin-bottom: $padding-md;
    legend {
      // font-weight: 200;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
  label {
    text-transform: uppercase;
    font-weight: bold;
  }
  &__input {
    display: flex;
    flex-flow: column;
    padding: $padding-sm;
    // padding-bottom: none;
    // background-color: $bg-light;
    margin-bottom: $padding-sm;
    input,
    select {
      // flex-grow: 1;
      height: $input-size;
      border: none;
      background: none;
      box-shadow: none;
      border-bottom: 1px solid $black;
      font-size: 18px;
      font-weight: 400;

      &:focus {
        outline: 0;
      }
    }
    &:focus-within {
      label {
        color: $secondary;
      }
      outline-style: double;
      outline-color: $secondary;
      outline-width: 1px;
      input,
      select {
        border-bottom: 1px solid $secondary;
      }
    }
  }
}

@media (min-width: 720px) {
  .calculator {
    width: inherit;
    form {
      max-width: 480px;
      min-width: 480px;
      margin: 0;
    }
  }
}
</style>
