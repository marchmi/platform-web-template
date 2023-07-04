import { defineStore } from 'pinia'
import useForage from '@/plugins/useForage'

const useEnumStore = defineStore('enumStore', {
  state: () => {
    return {
      ingredientEnum: [], // 食材信息
      ingredientEnumMap: {}, // 食材信息Map
      ingredientTagEnum: [], // 食材Tag
      dishTagEnum: [], // 菜品Tag
    }
  },
  getters: {},
  actions: {
    /**
     * 获取食材信息
     */
    fetchIngredientEnum() {
      if(this.ingredientEnum.length) {
        return
      }
      const { fetchList } = useForage('material', 'ingredient')
      fetchList().then(res=>{
        this.ingredientEnum.length = 0
        res.list.forEach(ingredient=>{
          this.ingredientEnumMap[ingredient.ingredientCode] = { ...ingredient }
          this.ingredientEnum.push({ code: ingredient.ingredientCode, name: ingredient.ingredientName, ...ingredient })
        })
      })
    },

    /**
     * 获取食材Tag信息
     */
    fetchIngredientTagEnum() {
      if(this.ingredientTagEnum.length) {
        return
      }
      const { fetchList } = useForage('material', 'tag')
      fetchList().then(res=>{
        this.ingredientTagEnum.length = 0
        res.list.forEach(tag=>{
          this.ingredientTagEnum.push({ code: tag.tagCode, name: tag.tagName })
        })
      })
    },

    /**
     * 获取食材Tag信息
     */
    fetchDishTagEnum() {
      if(this.dishTagEnum.length) {
        return
      }
      const { fetchList } = useForage('dish', 'tag')
      fetchList().then(res=>{
        this.dishTagEnum.length = 0
        res.list.forEach(tag=>{
          this.dishTagEnum.push({ code: tag.tagCode, name: tag.tagName })
        })
      })
    }

  }
})

export default useEnumStore
