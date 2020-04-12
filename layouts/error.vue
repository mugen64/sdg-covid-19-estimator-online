<template>
  <div class="error">
    <h2>{{ error.statusCode }}</h2>
    <p style="text-align:center; margin-top: 0.5em;">
      {{ error.message }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  layout: 'default' // you can set a custom layout for the error page
};
</script>
<style lang="scss" scoped>
.error {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  h2,
  p {
    text-align: center;
  }
}
</style>
