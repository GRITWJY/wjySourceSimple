/*Watcher 是管擦着，用于发布更新的行为*/

let watcherid = 0;
class Watcher {
  /**
   *
   * @param {Object} vm JGVue 实例
   * @param {String|Function} expOrfn 如果是渲染 watcher, 传入的就是渲染函数, 如果是 计算 watcher 传入的就是路径表达式, 暂时只考虑 expOrFn 为函数的情况.
   */
  constructor(vm, expOrfn) {
    this.vm = vm;
    this.getter = expOrfn;
    this.deps = []; // 依赖项
    this.id = watcherid++;

    // 一开始需要渲染
    this.get();
  }

  // 计算，触发getter
  get() {
    pushTarget(this);
    this.getter.call(this.vm, this.vm);
    // 上下文的问题就解决了
    popTarget();
  }

  /*
   * 执行，并判断是懒加载，还是同步执行，还是异步执行
   * 现在只考虑异步执行，简化是同步执行
   * */

  run() {
    this.get();
    // 在真正的 vue 中是调用 queueWatcher, 来触发 nextTick 进行异步的执行
  }

  /** 对外公开的函数, 用于在 属性发生变化时触发的接口 */
  update() {
    this.run();
  }
  /** 清空依赖队列 */
  cleanupDep() {}

  /*将当前的dep与当前的watcher关联*/
  addDep(dep) {
    this.deps.push(dep);
  }
}
