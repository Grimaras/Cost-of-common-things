const db = require('../models');


exports.create = async (req, res) => {
    try {
        let newComponent = await db.Component.create(req.body);
        console.log(newComponent);
        return res.status(200).json(newComponent)
    } catch (err) {
        return res.status(400).json({
            message : 'Oops ! An error occured during the component creation',
            error : err
        });
    }
};

exports.readAll = async (req, res) => {
    try {
        let components = await db.Component.find();
        return res.status(200).json(components);
    } catch (err) {
        return res.status(400).json({
            message : 'Oops ! An error occured during the component reading',
            error : err
        });
    }
};


exports.readOne = async (req, res) => {
    try {
        let component = await db.Component.findById(req.params.id, 'criteres');
        console.log(`component : ${component}`);
        console.log(`criteres : ${component.criteres}`);
        return res.status(200).json(component);
    } catch (err) {
        return res.status(400).json({
            message : `Oops ! An error occured during the component reading : ${req.params.id} !`,
            error : err
        });
    }
};

exports.deleteAll = async (req, res) => {
    try {
        let components = await db.Component.find().select('_id');
        await Promise.all(components.map((id) => db.Component.findByIdAndDelete(id._id)));
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

exports.delete = async (req, res) => {
    try {
        await db.Component.findByIdAndDelete(req.params.id);
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

exports.update = async (req, res) => {
    try {
        let newComponent = await db.Component.findByIdAndUpdate(req.params.id, { $set : req.body }, { new : true });
        return res.status(200).json({
            message : "Component modified with success",
            newComponent
        });
    } catch (err) {
        return res.status(400).json({
            message : `Oops ! An error occured during the component update : ${req.params.id} !`,
            error : err
        });
    }
};




