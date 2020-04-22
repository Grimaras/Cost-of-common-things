const mongoose = require('mongoose');
const fabrication = require('./fabrication');
const criteres = require('./criteres');

//schema
const componentSchema = new mongoose.Schema({
    idProject : {
        type : Number,
        required : true,
    },
    idEtape : {
        type : Number,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    image : {
        type : String,
    },
    etapesFabrication : {
        type : [fabrication],
        required : true,
        min : 0,
    },
    criteres : {
        type : criteres,
        required : true,
    },
});

//model
const Component = mongoose.model('Component', componentSchema);


//Export
module.exports = Component;