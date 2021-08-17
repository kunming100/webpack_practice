/**
 * @desc webpack 配置js兼容性处理
 * @author tankm
 * @since 2021-08-17 23:25:22
 */
// 当使用 core-js 进行按需加载兼容性代码时，就不需要引入 @babel/polyfill
// import '@babel/polyfill';

const add = (a, b) => a + b;
console.log(add(1, 2));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器结束');
    resolve();
  }, 1000);
});
console.log(promise);
