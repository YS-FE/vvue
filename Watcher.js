
/*
Dep, 用于进行监视器的添加和执行
*/
class Dep {
  constructor(){
    this.watchers = []
  }
  addWatcher(newWatch){
    this.watchers.push(newWatch)
  }
  notify(){
    this.watchers.forEach(e => {
      e.update()
    })
  }
}

/*
监视器操作
*/
class Watcher{
  constructor(vm, exp, cb){
    this.vm = vm
    this.cb = cb
    this.exp = exp  //a.b.c

    //new Watcher()执行时，就对Dep.target进行赋值，便于添加到Dep中
    Dep.target = this
    this.value =  this.get()
    Dep.target = null
  }

  get(){
    var value = this.vm
    this.exp.split('.').forEach(key => {
      value = value[key]
    })
    return value
  }

  update(){
    var oldValue = this.value
    var newValue = this.get();

    if (oldValue != newValue){
      this.value = newValue
      //值变化之后，执行注册的回调函数
      this.cb.call(this, this.value, oldValue)
    } else {
      return
    }
  }
}
