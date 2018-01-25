
/*
添加数据代理，方便数据的访问： 将 vm._data.key 变为 vm.key
*/
function proxy(vm){
  var _vm = vm
  Object.keys(_vm._data).forEach(key => {
    Object.defineProperty(_vm, key, {
      configureable: true,
      enumberable: true,
      get(){
        return _vm._data[key]
      },
      set(newValue){
        _vm._data[key] = newValue
      }
    })
  })
}
