<template>
  <div>
    <mi-date-picker
      v-model="val"
      type="date"
      v-bind="$attrs"
      v-on="$attrs.events || {}"
    />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String, Number, Date, Array],
      default: ''
    }
  },

  methods: {},

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
