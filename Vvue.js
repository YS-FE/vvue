
/*
从 options中取出所需的参数
*/
class Vvue {
  constructor(options = {}){
    this.$options = options
    this._data = options.data
    this.$el =  options.el
    this.computed = options.computed || {}
    this.init()
  }

  init(){
    //数据劫持
    observe(this._data)

    //数据代理
    proxy(this)

    //计算属性
    computed(this)

    //模板编译
    compile(this)
  }
}
