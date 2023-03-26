/**
 * 自动载入指定目录下的文件并绑定为指令
 */

export default (app) => {
    
  const modules = import.meta.globEager('./global/*.js');
  
  Object.keys(modules).forEach((key) => {
    const directName = key.replace('./global/', '').replace('.js', '')
    app.directive(directName, modules[key].default)
  })
  
}