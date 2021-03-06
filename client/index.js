const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 7777;
const routeApi = require('./routes/routeApi')
const routeDetails = require('./routes/routeDetails')
const config = require('./config')

console.log("Trying to connect on ... ", config.redisHost);

// Middleware(i)
app.use(cors());
app.use(express.json());
app.use('/api', routeApi);
app.use('/details', routeDetails);
app.use(express.static('gui/build'));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
    console.error("Updated ");
});

config.redisClient.on('connect', function() {
    console.log('Connected to Redis !');
});
