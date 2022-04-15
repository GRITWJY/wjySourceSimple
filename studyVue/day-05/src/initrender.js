YVue.prototype.mount = function () {
  // 需要提供一个render方法:生成一个虚拟DOM
  // 这个render方法就是带有缓存功能
  this.render = this.createRenderFn();
  this.mountComponent();
};

YVue.prototype.mountComponent = function () {
  // 执行 mountComponent() 函数
  let mount = () => {
    // 这里是一个函数，函数的this默认是全局对象
    this.update(this.render());
  };
  // 这个 Watcher 就是全局的 Watcher, 在任何一个位置都可以访问他了 ( 简化的写法 )
  new Watcher(this, mount); // 这里相当于调用了mount
};

// 这里是生成render函数，目的是缓存抽象语法树，我们使用虚拟DOM模拟
YVue.prototype.createRenderFn = function () {
  let ast = getVNode(this._template);

  // vue: 将 AST + data => VNode
  // 我们： 带有坑的VNode + data => 含有数据的VNode
  return function render() {
    // 将带坑的VNode转化为真正的带数据的VNode
    let _tmp = combine(ast, this._data);
    return _tmp;
  };
};

// 将虚拟DOM渲染到页面中： diff算法就在这里
YVue.prototype.update = function (vnode) {
  // 简化，直接生成HTML DOM ，replaceChild 到页面中
  // 父元素replaceChild
  let realDOM = parseVNode(vnode);
  this._parent.replaceChild(realDOM, document.querySelector("#root"));
};
