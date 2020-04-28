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
    idComponent: { // Id interne destine a ne jamais changer
        type: Number,
        required: true
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
        min : 0
    },
    bans: {
        type: [String],
        required: true,
        default: [] // Contiens les id internes des composants bannis par ce choix
    },
    criteres : {
        type : criteres,
        required : true
    }
});

//model
const Component = mongoose.model('Component', componentSchema);


//Export
module.exports = Component;