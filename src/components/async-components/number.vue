<template>
  <div>
    <mi-input type="number" v-model.trim="val" clearable v-bind="$attrs" />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String, Number],
      default: ''
    },

    options: {
      type: [Array, String, Object],
      default: () => {
        return []
      }
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
