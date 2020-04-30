const mongoose = require('mongoose');
const criteres = require('./criteres');

const GameStatsSchema = new mongoose.Schema({
    componentIds : {
        type : [String],
        required : true,
    },
    scenarioID : {
        type: Number,
        required : true,
    },
    score : {
        type : Number,
        required: true,
        description : "Réussite en % de la mission",
        max: 100,
    },
    timestamp : {
        type : Number,
        required: true,
    },
    criteres : {
        type : criteres,
        required : true,
    },
    rAndD : {
        type : Number,
        required : true,
    },
    cost : {
        type : Number,
        required : true,
    }
});

//model
const GameStats = mongoose.model('GameStats', GameStatsSchema);

module.exports = GameStats;