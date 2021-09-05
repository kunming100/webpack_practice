/**
 * @desc 缓存
 * @author tankm
 * @since 2021-09-05 17:16:39
 */
import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sum(1, 2, 3, 4));
