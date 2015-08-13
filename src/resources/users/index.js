'use strict';

const controller = require('./users.controller');
const router = require('koa-router')();

router.get('/', controller.get);
router.post('/', controller.create);


module.exports = router.routes();
