<template>
  <article class="estimate" :aria-label="label">
    <h3 class="estimate__label">{{ label }}</h3>
    <div class="estimate__cards">
      <!-- {{ estimate }} -->
      <div class="estimate__card">
        <h4 class="estimate__card__title">
          Currently Infected
        </h4>
        <h5 class="estimate__card__subtitle">
          (= Reported Cases x {{ multiple }})
        </h5>
        <div class="estimate__card__value">
          {{ estimate.currentlyInfected | seperator }}
        </div>
      </div>
      <div class="estimate__card">
        <h4 class="estimate__card__title">
          Infections
        </h4>
        <div class="estimate__card__value">
          {{ estimate.infectionsByRequestedTime | seperator }}
        </div>
      </div>
      <div class="estimate__card">
        <h4 class="estimate__card__title">
          Severe Cases
        </h4>
        <div class="estimate__card__value">
          {{ estimate.severeCasesByRequestedTime | seperator }}
        </div>
      </div>
      <div class="estimate__card">
        <h4 class="estimate__card__title">
          Available Hospital Beds
        </h4>
        <div
          class="estimate__card__value"
          :class="{
            'text--danger': estimate.hospitalBedsByRequestedTime <= 0,
            'text--success': estimate.hospitalBedsByRequestedTime > 0
          }"
        >
          {{ estimate.hospitalBedsByRequestedTime | seperator }}
        </div>
      </div>
      <div class="estimate__card">
        <h4 class="estimate__card__title">
          ICU Cases
        </h4>
        <div
          class="estimate__card__value"
          :class="{
            'text--danger': estimate.casesForICUByRequestedTime > 0
          }"
        >
          {{ estimate.casesForICUByRequestedTime | seperator }}
        </div>
      </div>
      <div class="estimate__card">
        <h4 class="estimate__card__title">
          Ventilators Cases
        </h4>
        <div
          class="estimate__card__value"
          :class="{
            'text--danger': estimate.casesForVentilatorsByRequestedTime > 0
          }"
        >
          {{ estimate.casesForVentilatorsByRequestedTime | seperator }}
        </div>
      </div>
      <div class="estimate__card">
        <h4 class="estimate__card__title">
          Money Lost Daily
        </h4>
        <div class="estimate__card__value">
          $ {{ estimate.dollarsInFlight | seperator }}
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    estimate: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    multiple: {
      type: Number,
      default: 10
    }
  }
};
</script>
<style lang="scss">
.estimate {
  &__label {
    background: $white;
    padding: calc(#{$padding-sm} * 2);
  }
  &__cards {
    display: flex;
    padding: calc(#{$padding-sm} * 2);
    justify-content: space-between;
    flex-wrap: wrap;
    padding: $padding-sm;
    padding-right: 0;
    background: $white;
  }
  &__card {
    flex: 1 1 calc(50% - #{$padding-md});
    margin-bottom: $padding-sm;
    margin-right: $padding-sm;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    padding: 1rem;
    background: $white;

    &__title,
    &__subtitle {
      word-break: none;
      white-space: nowrap;
      padding-bottom: $padding-sm;
    }

    &__subtitle {
      color: $secondary;
      // width: 100%;
      text-align: right;
    }

    &__value {
      font-size: 1.5em;
      font-weight: 100;
    }
  }
}
</style>
