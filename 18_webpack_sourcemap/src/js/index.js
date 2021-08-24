/**
 * @desc 开发环境例子
 * @author tankm
 * @since 2021-08-10 01:08:59
 */
import print from './print';
import '../css/iconfont.css';
import '../css/index.less';

console.log('js文件被重新加载');

function add(a, b) {
  return a + b;
}

console.log(add(1, 2));

if (module.hot) {
  // module.hot 为 true，说明开启了HMR功能。
  module.hot.accept('./print.js', function () {
    // 监听print.js文件的变化，此文件发生变化，其他模块不会重新打包构建
    // 执行后面的回调函数
    print();
  });
}
