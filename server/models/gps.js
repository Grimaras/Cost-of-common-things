const mongoose = require('mongoose');

//schema
const Gps = new mongoose.Schema({
    _id: false,
    x : {
        type : Number,
        required : true,
    },
    y : {
        type : Number,
        required: true,
    }
});


//Export
module.exports = Gps;