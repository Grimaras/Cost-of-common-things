const express = require('express');
const router = express.Router();
const handlerComponents = require('../handlers/component');

router.route('/')
    .post(handlerComponents.create)
    .get(handlerComponents.readAll);

router.route('/all/yes/')
    .delete(handlerComponents.deleteAll);

router.route('/:id')
    .get(handlerComponents.readOne)
    .put(handlerComponents.update)
    .delete(handlerComponents.delete);

module.exports = router;