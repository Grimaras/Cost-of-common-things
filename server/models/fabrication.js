const mongoose = require('mongoose');
const localisation = require('./localisation')

//schema
const Fabrication = new mongoose.Schema({
    _id: false,
    idEtape : {
        type : Number,
        required : true,
    },
    localisation : {
        type : localisation,
        required: true,
    },
});

//Export
module.exports = Fabrication;