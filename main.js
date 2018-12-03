class VNode{
  constructor(tag,children,text){
    this.tag = tag
    this.text = text
    this.children = children
  }
  render(){
    if(this.tag === '#text'){
      return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag)
    this.children.forEach(vChil=>{
      el.appendChild(vChild.render())
    })
    return el
  }
}

function v(tag,children,text){
  if(typeof children ==='string'){
    text = children
    children = []
  }
  return new VNode(tag,children,text)
}
