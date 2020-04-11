<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        COVID-19 Estimator Online - SDG
      </h1>
      <h2 class="subtitle">
        FrontEnd For SDG Assesment Challenge
      </h2>
      <div class="links">
        <code>{{ estimate }}</code>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import { Estimator } from '~/logic';
import SampleData from '~/data';
export default {
  components: {
    Logo
  },
  data: () => ({
    estimate: Estimator(SampleData[0])
  })
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
