const mongoose = require('mongoose');
const gps = require('./gps');

//schema
const Localisation = new mongoose.Schema({
    _id: false,
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    codePays : {
        type : String,
    },
    gps : {
        type : gps,
        required : true,
    },
});

//Export
module.exports = Localisation;