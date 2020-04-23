const express = require('express');
const router = express.Router();
const handlers = require('../handlers/handleApi')
const handlersComponents = require('../handlers/handleComponents')

router.route('/')
    .get(handlers.home)

router.route('/alive')
    .get(handlers.alive)

router.route('/gameresult')
    .post(handlers.gameresult)

router.route('/components')
    .get(handlersComponents.getData)
    .delete(handlersComponents.clearData);

router.route('/*')
    .get(handlers.default)


module.exports = router;