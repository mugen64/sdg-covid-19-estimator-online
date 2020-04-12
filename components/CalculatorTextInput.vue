<template>
  <div class="calculator__input">
    <label :for="fieldName">{{ label }}</label>
    <input
      :id="fieldName"
      v-model="model"
      :type="type"
      :name="fieldName"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: 'Text Input'
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(v) {
        if (isNaN(+this.value)) {
          this.$emit('input', v);
        } else {
          this.$emit('input', +v);
        }
      }
    },
    fieldName() {
      const v = (this.name || this.label).split(' ');
      // console.log(v, v.join('_'));
      return v.join('_');
    }
  }
};
</script>
