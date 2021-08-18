/**
 * @desc webpack打包入口文件
 * @author tankm
 * @since 2021-07-25 16:18:01
 */

/**
 * 打包指令
 *  开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
 *  生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
 */

import data from './data.json';

function add(a, b) {
  return a + b;
}

console.log(add(1, 2));
console.log(data);
