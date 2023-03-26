<template>
  <div>
    <component
      :is="renderView"
      v-bind="$attrs"
      v-model:data="val"
    />
  </div>
</template>
<script>
import Input from './async-components/input.vue'
import Textarea from './async-components/textarea.vue'
import Select from './async-components/select.vue'
import Cascader from './async-components/cascaderTree.vue'
import Checkbox from './async-components/checkbox.vue'
import Image from './async-components/image.vue'
import ImageUploader from './async-components/imageUploader.vue'
import DatePicker from './async-components/datePicker.vue'
import UnRegister from './async-components/unregister.vue'
export default {
  name: 'DynamicViewLoader',
  props: {
    data: {
      type: [Array, String, Number, Boolean, Object, Date],
      default: () => null
    },
    type: {
      type: String,
      default: 'input'
    }
  },
  setup () {
    const rtn = {
      components: {
        input: Input,
        textarea: Textarea,
        select: Select,
        cascader: Cascader,
        checkbox: Checkbox,
        image: Image,
        imageUploader:ImageUploader,
        datePicker: DatePicker,
        unRegister:UnRegister
      }
    }
    return rtn
  },
  computed: {
    val: {
      get () {
        return this.data
      },
      set (value) {
        this.$emit('update:data', value)
      }
    },
    renderView () {
    //   return () => import(`${this.path}`)
      return this.components[this.type] || this.components['unRegister']
    }
  }
}
</script>
