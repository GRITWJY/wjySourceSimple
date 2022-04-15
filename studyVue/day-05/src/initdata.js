// 响应式
let ARRAY_METHOD = [
  "push",
  "pop",
  "shift",
  "unshift",
  "reverse",
  "sort",
  "splice",
];

let array_methods = Object.create(Array.prototype);

ARRAY_METHOD.forEach((method) => {
  array_methods[method] = function () {
    console.log("调用了拦截的方法");

    // 将数组进行响应式化
    for (let i = 0; i < arguments.length; i++) {
      observe(arguments[i]);
    }

    // 调用原来的方法
    let res = Array.prototype[method].apply(this, arguments);
    return res;
  };
});

// vue源码中也做了判断，如果浏览器支持__proto__
// 若不支持，就换入法
// 折中处理后，this就是vue实例
function defineReactive(data, key, val, enumerable) {
  if (typeof val === "object" && val != null) {
    observe(val);
  }

  let dep = new Dep();
  dep.__propName__ = key;

  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: !!enumerable,
    get() {
      dep.depend();
      return val;
    },
    set(newValue) {
      if (val === newValue) return;
      if (typeof newValue === "object" && newValue != null) {
        observe(val);
      }
      val = newValue;
      // 模板刷新
      // 如何获取vue实例？

      // 派发更新, 找到全局的 watcher, 调用 update
      dep.notify();
    },
  });
}

/*将某一个对象的属性 访问 映射到某一个属性成员上*/
function proxy(target, prop, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return target[prop][key];
    },
    set(nv) {
      target[prop][key] = nv;
    },
  });
}

function observe(obj) {
  // 之前没有对o本身进行操作，这一次就直接对Obj进行判断
  if (Array.isArray(obj)) {
    // 对每一个元素处理
    obj.__proto__ = array_methods;
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]); //递归
    }
  } else {
    // 对每个成员
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let prop = keys[i];
      defineReactive(obj, prop, obj[prop], true);
    }
  }
}

YVue.prototype.initData = function () {
  // 遍历 this._data的成员，将 属性转换为响应式的，将 直接属性，代理到实例上
  let keys = Object.keys(this._data);

  // 响应式化
  observe(this._data);

  // 代理
  for (let i = 0; i < keys.length; i++) {
    proxy(this, "_data", keys[i]);
  }
};
