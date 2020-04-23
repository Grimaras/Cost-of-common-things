const rp = require('request-promise');
var fs = require('fs');

exports.details = (req, res) => {
    try {
        fs.readFile('./heatmap.html', 'utf8', function(err, data) {
            if (!err) {
                res.setHeader('Content-type' , 'text/html');
                res.end(data);
                //console.log( req.url, mimetype );
            } else {
                console.log ('file not found: ' + req.url);
                res.writeHead(404, "Not Found");
                res.end();
            }
        });
    } catch (err) {
        return res.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};

exports.heatmap = (req, res) => {
    try {
        fs.readFile('./heatmap.html', function(err, data) {
            if (!err) {
                var newData = data.replace(/\/\*-\*\/.*\/\*-\*\//g, req.params.startp);
                newData = newData.replace(/\/\*_\*\/.*\/\*_\*\//g, req.params.endp);
                res.setHeader('Content-type' , 'text/html');
                res.end(newData);
                //console.log( req.url, mimetype );
            } else {
                console.log ('file not found: ' + req.url);
                res.writeHead(404, "Not Found");
                res.end();
            }
        });
    } catch (err) {
        return res.status(400)
            .json({
                message: 'Whoops, an error has occured',
                error: err
            });
    }
};

exports.detailsDefault = (request, response) => {
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


