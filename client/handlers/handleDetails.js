const rp = require('request-promise');
var fs = require('fs');

const SERVICE_ADDRESS = process.env["SERVICE_HOST"] || "3.229.135.170";
const SERVICE_PORT = process.env["SERVICE_PORT"] || "80";

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
        fs.readFile('./heatmap.html', 'utf8', function(err, data) {
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
