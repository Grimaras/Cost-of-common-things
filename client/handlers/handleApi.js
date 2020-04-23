const rp = require('request-promise');
var fs = require('fs');

exports.home = (req, res) => {
    try {
        const msg = '<h2>Welcome to Aperture Science Enrichissement Center !</h2><img src="https://i.ytimg.com/vi/AenC4B59rSA/maxresdefault.jpg"/>';

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

exports.gameresult = (req, res) => {
    try {
        console.log(req.body);

        res.send(req.body);
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


