const data = [
    {title: '根目录', expand: true, id: 1},
    {title: '内容管理', expand: true, id: 2, parentId: 1, index: 0},
    {title: '显示设置', expand: true, id: 3, parentId: 1, index: 1},
    {title: '文章管理', expand: true, id: 4, parentId: 2, index: 0},
    {title: '标签管理', expand: true, id: 5, parentId: 3, index: 0},
    {title: '菜单设置', expand: true, id: 6, parentId: 3, index: 1},
    {title: '登录设置', expand: true, id: 7, parentId: 3, index: 2}
  ]

  let arrayToTree = (parentId)=> {   
    let children = getChildren(parentId)
    if (children) {
      for (let val of children) {
        let c = arrayToTree(val.id)
        if (c && c.length>0) {
            val.children = c
        }
      }
    }
    if (parentId) {
        return children
    } else {
        return children[0]
    }        
  }
let  getChildren = (parentId)=> {
    if (Array.isArray(data)) {
      return data.filter((value)=> {
        return value.parentId === parentId
      })
    }
  }
  console.log(JSON.stringify(arrayToTree()))