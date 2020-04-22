const express = require('express');
const router = express.Router();
const handlers = require('../handlers/handleComponents')

router.route('/')
    .get(handlers.getData)
    .delete(handlers.clearData);

module.exports = router;