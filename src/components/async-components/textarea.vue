<template>
  <div>
    <mi-input
      maxlength="100"
      show-word-limit
      resize="none"
      type="textarea"
      :rows="3"
      v-model="val"
      v-bind="$attrs"
      v-on="$attrs.events || {}"
    />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String],
      default: ''
    }
  },

  computed: {
    val: {
      get () {
        return this.data
      },
      set (value) {
        this.$emit('update:data', value)
      }
    }
  }
}
</script>
