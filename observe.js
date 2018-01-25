function observe(data){
  return new Observe(data)
}

/*利用Object.defineProperty进行数据劫持
*/
function Observe(data){
  if (!data || (typeof data !== 'object')) return

  let dep = new Dep()

  for (let key in  data) {
    let value = data[key]
    observe(value)

    Object.defineProperty(data, key, {
      enumerable:true,
      get(){
        //当通过 new Wather()添加数据监视时，就会触发该行代码，将其添加到更新列表中
        Dep.target && dep.addWatcher(Dep.target)

        
        return value
      },
      set(newValue){
        //一旦某个值被改变，就执行注册好的更新操作, dep.notify()
        if(newValue  == value) return
        value = newValue
        observe(value)
        dep.notify()
      }
    })
  }
}
