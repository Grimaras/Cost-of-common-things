const rp = require('request-promise');
var fs = require('fs');
const request = require('request')


const SERVICE_ADDRESS = process.env["SERVICE_HOST"] || "3.229.135.170";
const SERVICE_PORT = process.env["SERVICE_PORT"] || "80";

exports.home = (req, res) => {
    try {
        const msg = '<h2>Welcome to Phone tycoon !</h2><img src="https://i.ytimg.com/vi/AenC4B59rSA/maxresdefault.jpg"/>';

        res.set('Content-Type', 'text/html');
        res.status(200).send(msg);
    } catch (err) {
        return res.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};

exports.alive = (req, res) => {
    try {
        const msg = '<h2>I\'m alive !</h2>';

        res.set('Content-Type', 'text/html');
        res.status(200).send(msg);
    } catch (err) {
        return res.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};

exports.getGameResult = async (req, res) => {
    try {
        console.log(req.params.scenario);
        const server_data = await rp({ uri: `http://${SERVICE_ADDRESS}:${SERVICE_PORT}/api/gamestats/scenario/${req.params.scenario}`, json: true});
        console.log(server_data);

        res.send(server_data);
    } catch (err) {
        return res.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};

exports.getOneGameResult = async (req, res) => {
    try {
        const server_data = await rp({ uri: `http://${SERVICE_ADDRESS}:${SERVICE_PORT}/api/gamestats/${req.params.id}`, json: true});
        console.log(server_data);
        res.send(server_data);
    } catch (err) {
        return res.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};


exports.gameresult = async (req, res) => {
    try {
        var tabIds = [];

        for (var i = 0; i < req.body.components.length; i++) {
          tabIds.push(req.body.components[i]);
        } 

        try {
            const body = await rp.post(`http://${SERVICE_ADDRESS}:${SERVICE_PORT}/api/gamestats`,
                {
                    json:
                        {
                            "componentIds": tabIds,
                            "score": req.body.score,
                            "scenarioID": req.body.scenarioId,
                            "cost": req.body.cost,
                            "rAndD": req.body.rAndD
                        }
                }
            );

            console.log("Body ", body);
            res.send(body);
        } catch (e) {
            res.status(500).body(e);
        }
    } catch (err) {
        return res.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};

exports.default = (request, response) => {
    try {
        fs.readFile('./' + request.url, function(err, data) {
            if (!err) {
                var dotoffset = request.url.lastIndexOf('.');
                var mimetype = dotoffset == -1
                                ? 'text/plain'
                                : {
                                    '.html' : 'text/html',
                                    '.ico' : 'image/x-icon',
                                    '.jpg' : 'image/jpeg',
                                    '.png' : 'image/png',
                                    '.gif' : 'image/gif',
                                    '.css' : 'text/css',
                                    '.js' : 'text/javascript'
                                    }[ request.url.substr(dotoffset) ];
                response.setHeader('Content-type' , mimetype);
                response.end(data);
                //console.log( request.url, mimetype );
            } else {
                console.log ('file not found: ' + request.url);
                response.writeHead(404, "Not Found");
                response.end();
            }
        });
    } catch (err) {
        console.log(err);
        return response.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};


