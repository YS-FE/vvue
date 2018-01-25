/*
模板编译，数值的替换
*/
function compile(vm) {
  var el = document.querySelector(vm.$el)
  //利用fragment减少dom操作
  var fg  = document.createDocumentFragment()

  var child;
  while (child = el.firstChild){
    fg.appendChild(child)
  }
  replaceData(fg, vm)
  el.appendChild(fg)
}

/*
值的替换
*/
function replaceData(fg, vm){

  var childs = fg.childNodes
  Array.from(childs).forEach(node => {
    //文本
    var text = node.textContent

    //纯文本节点
    if (node.nodeType == 3 && /\{\{.*\}\}/.test(text)) {
      let keys = []
      //第一次替换
      node.textContent = text.replace(/\{\{(\s*([^\{\}]*)\s*)\}\}/g, function(match, p1, p2){
        keys.push(p2)
        let value = vm
        p2.split('.').forEach(key => {
          value = value[key]
        })
        return value
      })

      //替换之后，将key添加到监听队列中
      keys.forEach( key => {
        new Watcher(vm, key, function(newValue){
          node.textContent= text.replace(/\{\{(\s*([^\{\}]*)\s*)\}\}/g, function(match, p1, p2){
            if (p2 == key) return newValue

            let value = vm
            p2.split('.').forEach(key => {
              value = value[key]
            })
            return value
          })

        })
      })

    } else if (node.nodeType == 1){
      // 元素，比如input
      // 比如 input的双向绑定实现
      var attrs = node.attributes;

      //扫描节点
      Array.from(attrs).forEach(attr => {
        var attrName = attr.name
        var attrValue = attr.value

        if (attrName.indexOf('v-model') != -1){

          node.value = vm[attrValue]

          //将key添加到监听队列中
          new Watcher(vm, attrValue, function(newValue){
            node.value = newValue
          })

          //input的事件
          node.addEventListener('input', function(event){
            vm[attrValue] = event.target.value
          },false)
        }
      })
    }

    if(node.childNodes){
      replaceData(node, vm)
    }
  })
}
