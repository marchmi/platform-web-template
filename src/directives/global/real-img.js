/**
 * 使用v-real-img指令指定图片的src属性,
 * 当v-real-img指定的图片加载失败时,加载原生src属性指定的图片,src指定的图片为错误异常提示图片
 */
const realImg = {
  async beforeMount(el, binding) {
    const imgURL = binding.value;
    console.log(imgURL)
    if (imgURL) {
      const exist = await imageIsExist(imgURL);
      exist && el.setAttribute('src', imgURL);
    }
    // 判断一个图片是否存在, 注意是异步行为
    function imageIsExist(url) {
      return new Promise(resolve => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
          if(img.complete) {
            resolve(true);
            img = null;
          }
        }
        img.onerror = () => {
          resolve(false);
          img = null;
        }
      })
    }
  }
}
  
export default realImg
