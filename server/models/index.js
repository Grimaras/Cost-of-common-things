const mongoose = require('mongoose');
const DB_HOST = process.env.DB_HOST || "localhost";

mongoose.connect('mongodb://' + DB_HOST + ':27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('Connected to XPS Team DB...'))
    .catch(err => console.error(`Error connecting to db : ${err}`));

//export all modules

module.exports.Component = require('./component');
module.exports.GameStats = require('./gameStats');