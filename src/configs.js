const context = '/management'
const menuTree = [
  {
    label: '首页',
    hide: true
  },
  {
    label: '内容管理',
    children: [
      {
        label: '文章管理',
        href: `${context}/article/list`,
        children: [
          {
            label: '文章编辑',
            hide: true,
            href: `${context}/article/edit`
          },
          {
            label: '文章新增',
            hide: true,
            href: `${context}/article/add`
          }
        ]
      },
      {
        label: '留言管理',
        href: `${context}/404`
      }
    ]
  },
  {
    label: '显示设置',
    children: [
      {
        label: '卡片设置',
        href: `${context}/settings/card/list`,
        children: [
          {
            label: '新增卡片',
            href: `${context}/settings/card/add`,
            hide: true
          },
          {
            label: '编辑卡片',
            href: `${context}/settings/card/edit/:id`,
            hide: true
          }
        ]
      },
      {
        label: '登录设置',
        href: `${context}/settings/login`,
        children: [
          {
            label: '登录背景图',
            href: `${context}/settings/login/bgimage`
          }
        ]
      },
      {
        label: '标签管理',
        href: `${context}/settings/tags`
      },
      {
        label: '菜单设置',
        href: `${context}/settings/menuSettings`
      }
    ]
  },
  {
    label: '全部任务',
    href: `${context}/tasks`,
    hide: true
  }
]
export {
  context,
  menuTree
}
