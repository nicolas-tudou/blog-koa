export const dealComment = (list) => {
  list = list.map(comment => comment.toJSON())
  console.log('>>>', list)
  while (list.some(com => com.parent)) {
    let top = list.pop()
    if (top.parent) {
      let pCom = list.filter(com => com.id === top.parent)[0]
      pCom.children ? pCom.children.push(top) : pCom.children = [top]
    } else {
      list.unshift(top)
    }
  }
  console.log(list)
  return list
}
