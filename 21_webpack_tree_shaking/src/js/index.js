/**
 * @desc 缓存
 * @author tankm
 * @since 2021-09-05 17:16:39
 */
import { sub } from './test';
import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sub(1, 2));

console.log(sum(1, 2, 3, 4));
