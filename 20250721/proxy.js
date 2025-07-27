const p = {

}
const obj = new Proxy(p, {
  set(target, property, value, receiver) {
    Reflect.set(target, property, value, receiver)
  },
  defineProperty(target, property, attribute) {
    const result = Reflect.defineProperty(target, property, attribute)
    return result // 或者直接 return true
  }
})
obj.a = '123'
console.log(obj, 'obj')
console.log(p, 'p')
console.log(obj.a)
console.log(p.a)
