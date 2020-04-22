const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('Connected to XPS Team DB...'))
    .catch(err => console.error(`Error connecting to db : ${err}`));

//export all modules

module.exports.Component = require('./component');
module.exports.GameStats = require('./gameStats');