'use strict';

const controller = require('./albums.controller');
const router = require('koa-router')();

router.get('/', controller.getAll);
router.get('/:albumId', controller.get);
router.post('/', controller.save);
router.delete('/:albumId', controller.delete);

module.exports = router.routes();
