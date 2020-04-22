const express = require('express');
const app = express();
const port = process.env.PORT || 80;

const componentsRoutes = require('./routes/components');
const gameStatsRoutes = require('./routes/gameStats');


//middleware(s)
app.use(express.json());

app.get('/ping',(req, res) => {
    res.send('pong');
});

app.use('/api/components', componentsRoutes);
app.use('/api/gamestats', gameStatsRoutes);

if(port === 80) {
    console.log("Your port is 80, you need to be root to launch a server on port 80. If there is no errors don't mind me");
}

app.listen(port, () => console.log(`Components server listening on port ${port}`));