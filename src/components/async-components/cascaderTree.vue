<template>
  <div>
    <mi-cascader
      v-model="val"
      :options="options"
      :props="CascaderProps"
      v-bind="$attrs"
      v-on="$attrs.events || {}"
      style="width:100%"
    >
    </mi-cascader>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String, Array],
      default: ''
    },

    CascaderProps: {
      type: [Object],
      default: () => {
        return {
          label: 'name',
          value: 'id',
          expandTrigger: 'hover'
        }
      }
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
