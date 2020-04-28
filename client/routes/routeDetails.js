const express = require('express');
const routerDetails = express.Router();
const handlers = require('../handlers/handleDetails')

routerDetails.route('/')
    .get(handlers.details)
routerDetails.route('/:startp/:endp')
    .get(handlers.heatmap)
    .post(handlers.heatmap)

routerDetails.route('/*')
    .get(handlers.detailsDefault)


module.exports = routerDetails;