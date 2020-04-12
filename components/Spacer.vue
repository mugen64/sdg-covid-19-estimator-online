<template>
  <span :class="`spacer--${dr}`"></span>
</template>
<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'hr'
    }
  },
  computed: {
    dr() {
      return this.direction === 'vr' ? this.direction : 'hr';
    }
  }
};
</script>
