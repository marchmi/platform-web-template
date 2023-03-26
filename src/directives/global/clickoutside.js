const clickoutside = {
  beforeMount(el, binding) {
    const cb = binding.value
    if(typeof cb !== 'function') return console.warn('v-clickoutside指令必须接收一个回调函数')
    document.addEventListener('click', (e) => {
      el.contains(e.target) && binding.value();
    }, false)
  },
  unmounted() {
    document.removeEventListener('click', () => {})
  }
}
  
export default clickoutside
    