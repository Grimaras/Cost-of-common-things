const db = require('../models');
const _ = require('lodash');


exports.create = async (req, res) => {
    try {
        const tmpComponents = await Promise.all(_.map(req.body.componentIds, (id) => db.Component.findById(id, 'criteres')));
        const criteres = tmpComponents.map((component) => component.criteres);
        const futureCritere = _.reduce(criteres, (sum, tmp) => {
            return {
                prix : sum.prix + tmp.prix,
                eco : sum.eco + tmp.eco,
                perf : sum.perf + tmp.perf,
                design : sum.design + tmp.design,
            };
        });
        let futureGamestat = {...req.body, timestamp : Date.now(), criteres : futureCritere};
        let newGameStats = await db.GameStats.create(futureGamestat);
        console.log(newGameStats);
        return res.status(200).json(newGameStats)
    } catch (err) {
        return res.status(400).json({
            message : 'Oops ! An error occured during the gameStats creation',
            error : err
        });
    }
};

exports.readScenario = async (req, res) => {
    try {
        let gameStats = await db.GameStats.find({scenarioID : `${req.params.id}` });
        return res.status(200).json(gameStats);
    } catch (err) {
        return res.status(400).json({
            message : `Oops ! An error occured during the gameStats reading the scenario: ${req.params.id} !`,
            error : err
        });
    }
};

exports.readAll = async (req, res) => {
    try {
        let gameStatss = await db.GameStats.find();
        return res.status(200).json(gameStatss);
    } catch (err) {
        return res.status(400).json({
            message : 'Oops ! An error occured during the gameStats reading',
            error : err
        });
    }
};


exports.readOne = async (req, res) => {
    try {
        let gameStats = await db.GameStats.findById(req.params.id);
        return res.status(200).json(gameStats);
    } catch (err) {
        return res.status(400).json({
            message : `Oops ! An error occured during the gameStats reading : ${req.params.id} !`,
            error : err
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await db.GameStats.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message : "GameStats deleted with success",
        });
    } catch (err) {
        return res.status(400).json({
            message : `Oops ! An error occured during the gameStats deletion : ${req.params.id} !`,
            error : err
        });
    }
};

exports.update = async (req, res) => {
    try {
        let newGameStats = await db.GameStats.findByIdAndUpdate(req.params.id, { $set : req.body }, { new : true });
        return res.status(200).json({
            message : "GameStats modified with success",
            newGameStats
        });
    } catch (err) {
        return res.status(400).json({
            message : `Oops ! An error occured during the gameStats update : ${req.params.id} !`,
            error : err
        });
    }
};

exports.deleteAll = async (req, res) => {
    try {
        let gameStats = await db.GameStats.find().select('_id');
        await Promise.all(gameStats.map((id) => db.GameStats.findByIdAndDelete(id._id)));
        return res.status(200).json({
            message : "Component deleted with success",
        });
    } catch (err) {
        return res.status(400).json({
            message : `Oops ! An error occured during the component deletion : ${req.params.id} !`,
            error : err
        });
    }
};


