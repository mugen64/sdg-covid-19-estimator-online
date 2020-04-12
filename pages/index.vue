<template>
  <section aria-label="Estimation Calculator and Results" class="index-page">
    <calculator v-model="estimate" style="margin-top: 0.5rem;" />
    <div ref="estimationBox" class="estimation-results">
      <estimations
        :estimate="estimate.impact"
        label="Estimated Impact"
        :multiple="10"
      />
      <estimations
        :estimate="estimate.severeImpact"
        :multiple="50"
        label="Estimated Severe Impact"
      />
    </div>
  </section>
</template>

<script>
import Calculator from '~/components/Calculator';
import Estimations from '~/components/Estimations';
import SampleData from '~/data';
export default {
  components: {
    Calculator,
    Estimations
  },
  data: () => ({
    estimate: { data: SampleData[0] }
  }),
  created() {
    this.estimate = this.$Estimator(SampleData[0]);
  }
};
</script>
<style lang="scss">
.index-page {
  .estimation-results {
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
    margin-top: $padding-md;
  }
}

@media (min-width: 720px) {
  .index-page {
    display: flex;
    .estimation-results {
      max-width: none;
      flex-grow: 1;
      margin: $padding-sm;
    }
  }
}
</style>
