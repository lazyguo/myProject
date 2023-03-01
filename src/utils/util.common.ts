// 作用：弹框关闭后，表单内容清除
export const clear = (data:any) => {
    const keys = Object.keys(data)
    let obj: { [name: string]: string } = {}
    keys.forEach(item => {
      obj[item] = ''
    })
    Object.assign(data, obj)
  }