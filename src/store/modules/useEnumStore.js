import { defineStore } from 'pinia'
import { reactive } from 'vue'
import useForage from '@/plugins/useForage'

const useEnumStore = defineStore('enumStore', {
  state: () => {
    return {
      ingredientEnum: [],
      ingredientEnumMap: {}
    }
  },
  getters: {},
  actions: {
    fetchIngredientEnum() {
      const { fetchList } = useForage('material', 'ingredient')
      fetchList().then(res=>{
        this.ingredientEnum.length = 0
        res.list.forEach(ingredient=>{
          this.ingredientEnumMap[ingredient.ingredientCode] = { ...ingredient }
          this.ingredientEnum.push({ code: ingredient.ingredientCode, name: ingredient.ingredientName, ...ingredient })
        })
      })
    }
  }
})

export default useEnumStore
