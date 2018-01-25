/*
简化 computed的访问，将vm.computed.key 变为 vm.key.
computed的属性支持函数，支持get,set

new Vvue({
...
computed: {
  //函数
  one(){
  return ....
  },

  two: {
  get(){
    return ...
  }
  }
}
})

*/
function computed(vm) {
  let computed = vm.computed

  Object.keys(computed).forEach( key => {
    Object.defineProperty(vm, key, {
      enumerable: true,
      get: (typeof computed[key] == 'function') ? (computed[key]) : computed[key].get,
      set(){},
    })
  })
}
