// class VNode{
//   constructor(tag,children,text){
//     this.tag = tag
//     this.text = text
//     this.children = children
//   }
//   render(){
//     if(this.tag === '#text'){
//       return document.createTextNode(this.text)
//     }
//     let el = document.createElement(this.tag)
//     this.children.forEach(vChil=>{
//       el.appendChild(vChild.render())
//     })
//     return el
//   }
// }
//


function vNode(tag,children,text){
  this.tag = tag
  this.text = text
  this.children = children
}

function v(tag,children,text){
  // if(typeof children ==='string'||typeof children ==='number')
  if(typeof children !== "object"){
    text = children
    children = []
  }
  return new vNode(tag,children,text)
}


vNode.prototype.render = function(){
    if(this.tag==='#text'){
      return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag)
    let text = document.createTextNode(this.text)
    el.appendChild(text)
    if(this.children){
      this.children.forEach(vChild=>{
        el.appendChild(vChild.render())
      })
    }

    return el
}

// function detection(obj){
//   return  JSON.stringify(obj)=="{}"
// }

function patchElement(parent,newVNode,oldVNode,index=0){
  if(!oldVNode){
    parent.appendChild(newVNode.render())
  }else if(!newVNode){
    parent.removeChild(parent.childNodes[index])
  }else if(newVNode.tag!==oldVNode.tag||newVNode.text!==oldVNode.text){
      parent.replaceChild(newVNode.render(),parent.childNodes[index])
  }else{
    for(let i = 0;i<newVNode.children.length||oldVNode.children.length;i++){
      patchElement(parent.childNodes[index],newVNode.children[i],oldVNode.children[i])
    }
  }
}

// let VNodes1 = v('div',[
//   v('p',[
//     v('span',[v('#text','xiedaimala.com')])
//     ]
//   ),
//   v('span',[
//     v('#text','jirengu.com')
//     ]
//   )
// ]
// )
//
// let VNodes2 = v('div',[
//   v('p',[
//     v('span',[v('#text','xiedaimala.com')])
//     ]
//   ),
//   v('span',[
//     v('#text','jirengu.com'),
//     v('#text','ruoyu')
//     ]
//   )
// ]
// )
let test1 = v('p',[],'大渣好 我系渣渣辉')
let test2 = v('p',[],'大渣好 我系股添洛')
let VNode1 = v('div',[test1])
let VNode2 = v('div',[test2])

const root = document.querySelector('#root')
useMe.onclick=function(){
  patchElement(root,VNode1,VNode2)
}
