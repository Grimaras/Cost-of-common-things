const express = require('express');
const router = express.Router();
const handlerGameStats = require('../handlers/gameStats');

router.route('/')
    .post(handlerGameStats.create)
    .get(handlerGameStats.readAll);

router.route('/all/yes/')
    .delete(handlerGameStats.deleteAll);

router.route('/scenario/:id')
    .get(handlerGameStats.readScenario);

router.route('/:id')
    .get(handlerGameStats.readOne)
    .put(handlerGameStats.update)
    .delete(handlerGameStats.delete);

module.exports = router;