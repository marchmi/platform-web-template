<template>
  <div style="width:100%">
    <component
      :is="renderView"
      v-bind="$attrs"
      v-model:data="val"
      :events="events"
    />
  </div>
</template>

<script setup>

import { defineAsyncComponent,computed } from 'vue'

const props = defineProps({
  data: {
    type: [Array, String, Number, Boolean, Object, Date],
    default: () => null
  },
  type: {
    type: String,
    default: 'input'
  },
  events: {
    type: Object,
    default: () => {
      {}
    }
  }
})

const componentView = {
  input: defineAsyncComponent(()=>import('./async-components/input')),
  textarea: defineAsyncComponent(()=>import('./async-components/textarea')),
  select: defineAsyncComponent(()=>import('./async-components/select')),
  cascader: defineAsyncComponent(()=>import('./async-components/cascaderTree')),
  checkbox: defineAsyncComponent(()=>import('./async-components/checkbox')),
  image: defineAsyncComponent(()=>import('./async-components/image')),
  imageUploader: defineAsyncComponent(()=>import('./async-components/imageUploader')),
  datePicker: defineAsyncComponent(()=>import('./async-components/datePicker')),
  unRegister: defineAsyncComponent(()=>import('./async-components/unregister'))
}

const renderView = computed(()=>{
  return componentView[props.type] || componentView['unRegister']
})

const emit = defineEmits(['update:data'])

const val = computed({
  get: ()=> props.data,
  set: (value)=>{
    emit('update:data', value)
  }
})

</script>
