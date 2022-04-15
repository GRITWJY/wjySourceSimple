function YVue(options) {
  this._data = options.data;
  let elm = document.querySelector(options.el); // vue是字符串，这里是DOM
  this._template = elm;
  this._parent = elm.parentNode;

  this.initData(); // 将data进行响应式转换和代理

  this.mount();
}
