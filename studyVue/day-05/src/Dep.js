let depid = 0;
class Dep {
  constructor() {
    this.id = depid++;
    this.subs = []; // 存储的是与 当前 Dep 关联的 watcher
  }

  /** 添加一个 watcher */
  addSub(sub) {
    this.subs.push(sub);
  }
  /** 移除 */
  removeSub(sub) {
    for (let i = this.subs.length; i >= 0; i--) {
      if (sub === this.subs[i]) {
        this.subs.splice(i, 1);
      }
    }
  }

  /** 将当前 Dep 与当前的 watcher ( 暂时渲染 watcher ) 关联*/
  depend() {
    // 就是将当前的Dep 与当前的wtacher互相关联
    if (Dep.target) {
      // 将当前的watcher 关联到当前的dep上
      this.addSub(Dep.target);
      Dep.target.addDep(this); // 当前的dep与target互相关联
    }
  }
  /** 触发与之关联的 watcher 的 update 方法, 起到更新的作用 */
  notify() {
    // 在真实的 Vue 中是依次触发 this.subs 中的 watcher 的 update 方法

    // 此时deps中已经关联到需要的watcher

    let deps = this.subs.slice();
    deps.forEach((watcher) => {
      watcher.update();
    });
  }
}

// 全局的容器存储渲染 Watcher
// let globalWatcher
// 学 Vue 的实现
Dep.target = null; // 这就是全局的 Watcher

/*当前操作德邦wtacher， 存储到全局Watcher中，参数target就是当前watcher*/

let targetStack = [];

function pushTarget(target) {
  targetStack.unshift(Dep.target); // vue源码中是push
  Dep.target = target;
}

/*将当前watcher提出*/
function popTarget() {
  Dep.target = targetStack.shift(); // 踢到最后就是 undefined
}

/**
 * 在watcher 调用 get方法时， 调用 pushTarget (this)
 *
 * 在watcher结束时，调用poptarget
 * */
