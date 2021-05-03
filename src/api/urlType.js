/**
 * @param {String} name 接口名称
 * @param {String} url  接口url
 * @param {String} type 接口请求类型分别支持json, form, micro
 */
export const blog = [
  // 博客详情
  {
    name: 'detail',
    url: '/blog/detail',
    type: "form"
  },
  // 新增博客
  {
    name: 'new',
    url: '/blog/new',
    type: "form"
  },
]

export const postList = [
  {
    name: 'addUser',
    url: '/user/save',
    type: "form"
  },
]

export const deleteList = [
  {
    name: 'deleteUser',
    url: 'user/delete',
    type: "form"
  }
]

