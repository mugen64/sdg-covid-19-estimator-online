<template>
  <section aria-label="Estimation Calculator and Results">
    <calculator v-model="estimate" style="margin-top: 0.5rem;" />
    <br />
    <div class="estimation-results">
      <pre><code>{{ estimate }}</code></pre>
    </div>
  </section>
</template>

<script>
import Calculator from '~/components/Calculator';
import SampleData from '~/data';
export default {
  components: {
    Calculator
  },
  data: () => ({
    estimate: { data: SampleData[0] }
  }),
  created() {
    // this.estimate = this.$Estimator({});
  }
};
</script>
