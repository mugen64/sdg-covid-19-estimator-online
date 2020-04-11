<template>
  <div>
    Home
  </div>
</template>

<script>
import { Estimator } from '~/logic';
import SampleData from '~/data';
export default {
  data: () => ({
    estimate: Estimator(SampleData[0])
  })
};
</script>
