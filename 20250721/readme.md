### proxy
1. 要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作
2. 如果handler没有设置任何拦截，那就等同于直接通向原对象。
   ``` javascript
    var target = {};
    var handler = {};
    var proxy = new Proxy(target, handler);
    proxy.a = 'b';
    target.a // "b"
3. 一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
   ```
   var object = { proxy: new Proxy(target, handler) };
4. Proxy 实例也可以作为其他对象的原型对象。
   ``` javascript
   var proxy = new Proxy({}, {
    get: function(target, propKey) {
    return 35;
    }
   });
    let obj = Object.create(proxy);
    obj.time // 35
5. proxy身上的receiver参数是proxy实例本身
6. - js中字符串支持下标访问
   -  字符串有 length 属性
   -  字符串不能通过下标修改内容
   -  字符串没有数组的修改方法（push、pop 等）
7. Object.create() 静态方法以一个现有对象作为原型，创建一个新对象。
   + 结构：Object.create(proto, propertiesObject)
   + proto：新创建对象的原型对象。
   + propertiesObject：如果该参数被指定且不为 undefined，则该传入对象可枚举的自有属性将为新创建的对象添加具有对应属性名称的属性描述符。这些属性对应于 Object.defineProperties() 的第二个参数。
   + 默认情况下，属性是不可写、可枚举和可配置的。
```javascript
       o = {};
// 等价于：
o = Object.create(Object.prototype);

o = Object.create(Object.prototype, {
  // foo 是一个常规数据属性
  foo: {
    writable: true,
    configurable: true,
    value: "hello",
  },
  // bar 是一个访问器属性
  bar: {
    configurable: false,
    get() {
      return 10;
    },
    set(value) {
      console.log("Setting `o.bar` to", value);
    },
  },
});

// 创建一个新对象，它的原型是一个新的空对象，并添加一个名为 'p'，值为 42 的属性。
o = Object.create({}, { p: { value: 42 } });
```
8. set代理应当返回一个布尔值。严格模式下，set代理如果没有返回true，就会报错。
9. Object.setPrototypeOf() 静态方法可以将一个指定对象的原型（即内部的 [[Prototype]] 属性）设置为另一个对象或者 null。
    + 语法：Object.setPrototypeOf(obj, prototype)
    + obj:要设置其原型的对象。
    + prototype:该对象的新原型（一个对象或 null）。
10. Object.defineProperty 的属性描述符分为两类：数据描述符 和存取描述符 ，以及共享描述符 。
    + 数据描述符:用于定义属性的值和可写性。独有属性：1.value：设置属性的值，默认值 ：undefined；2.writable：控制属性值是否可以被修改，默认值：false
    + 存取描述符:用于定义 getter 和 setter 函数。独有属性：1.get：定义属性的 getter 函数，默认值：undefined；2.set：定义属性的 setter 函数，默认值：undefined
    + 共享描述符:两种描述符类型都可以使用的属性。1.enumerable：控制属性是否在枚举中显示，默认值：false；2.configurable：控制属性描述符是否可以被修改，以及属性是否可以被删除，默认值：false；
    + 注意事项：1.同一属性不能同时使用数据描述符和存取描述符；
11. ES6 规格将键值对（key-value map）的数据结构称为 Record，其中的每一组键值对称为 field。这就是说，一个 Record 由多个 field 组成，而每个 field 都包含一个键名（key）和一个键值（value）。
    + ES6 规格大量使用[[Notation]]这种书写法，比如[[Value]]、[[Writable]]、[[Get]]、[[Set]]等等。它用来指代 field 的键名。
    + 举例来说，obj是一个 Record，它有一个Prototype属性。ES6 规格不会写obj.Prototype，而是写obj.[[Prototype]]。一般来说，使用[[Notation]]这种书写法的属性，都是对象的内部属性。
    + 所有的 JavaScript 函数都有一个内部属性[[Call]]，用来运行该函数。F.[[Call]](V, argumentsList)
12. 每一个语句都会返回一个 Completion Record，表示运行结果。每个 Completion Record 有一个[[Type]]属性，表示运行结果的类型。[[Type]]属性有五种可能的值。
    + normal
    + return
    + throw
    + break
    + continue
   如果[[Type]]的值是normal，就称为 normal completion，表示运行正常。其他的值，都称为 abrupt completion。其中，开发者只需要关注[[Type]]为throw的情况，即运行出错；break、continue、return这三个值都只出现在特定场景，可以不用考虑。
