/**
 * @desc 服务器代码
 * @author tankm
 * @since 2021-09-05 17:31:35
 */

/**
 * 启动服务器指令
 * npm i nodemon -g
 * npdemon server.js
 *
 * node server.js
 */

const express = require('express');

const app = express();

app.use(express.static('build', { maxAge: 1000 * 3600 }));

app.listen(3000);
