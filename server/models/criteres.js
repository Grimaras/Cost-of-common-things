const mongoose = require('mongoose');

//schema
const Criteres = new mongoose.Schema({
    _id: false,
    prix : {
        type : Number,
        required : true,
    },
    eco : {
        type : Number,
        required: true,
    },
    perf : {
        type : Number,
        required: true,
    },
    design : {
        type : Number,
        required: true,
    },
});


//Export
module.exports = Criteres;