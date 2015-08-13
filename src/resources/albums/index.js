'use strict';

const controller = require('./albums.controller');
const router = require('koa-router')();

router.get('/', controller.getAll);
router.get('/:albumId', controller.get);
router.post('/', controller.create);
router.delete('/:albumId', controller.delete);

router.post('/:albumId/picture/', controller.uploadPicture);


module.exports = router.routes();
