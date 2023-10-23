# Yeoman Generator开发

## 项目创建


## 运行时上下文

使用 `yeoman`开发 generator最重要的就是理解Generator中方法是如何运行的，以及运行在哪个Context中。

### 原型方法即Action

首先，在Generator prototype中绑定的每个方法都会被认为是一个task, 每个task都会Yeoman的执行循环中按照顺序执行。也就是: `Object.getPrototypeOf(Generator)`中的每个函数都会被自动运行。

如果希望方法不被自动执行有三种方式:

1. 方法名以`_`开头（例如: `_private_method`）
2. 使用实例方法
3. 扩展父类Generator
   
```javascript
// private method
class extends Generator {
    method1() {
    console.log('hey 1');
    }

    _private_method() {
    console.log('private hey');
    }
}

// use instance method
class extends Generator {
    constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.helperMethod = function () {
        console.log('won\'t be called automatically');
    };
    }
}

// extend a parent generator
class MyBase extends Generator {
    helper() {
    console.log('methods on the parent generator won\'t be called automatically');
    }
}

module.exports = class extends MyBase {
    exec() {
    this.helper();
    }
};
```

### 执行循环

顺序执行任务在单个generator通常是足够的，但是当我们需要组合generators的时候就可能有点捉襟见肘了。所以Yeoman引入了 `Run Loop` 执行循环。 `Run Loop`本质是一套支持优先级的排队系统（内部使用`Grouped-queue`模块）。


