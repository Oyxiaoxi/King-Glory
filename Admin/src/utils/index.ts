// 对象转换成数据
export const objectToArray = <T>(obj: Record<string, T>) => {
  return Object.keys(obj).map(key => obj[key])
}

// 数据转换成对象
export const arrayToObject = <T extends { _id?: string }>(array: Array<T>) => {
  return array.reduce((prev, current) => {
    if (current._id)
      prev[current._id] = current

    return prev
  }, {} as Record<string, T>)
}
