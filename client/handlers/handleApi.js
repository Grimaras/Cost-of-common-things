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

exports.heatmap = (req, res) => {
    try {
        page_start = "<!DOCTYPE html><html lang=\"en\"><head><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">  <meta charset=\"utf-8\">  <link rel=\"stylesheet\" href=\"leaflet_heatmap_files/example-commons.css\">  <link rel=\"stylesheet\" href=\"leaflet_heatmap_files/leaflet.css\">  <script src=\"leaflet_heatmap_files/leaflet.js\"></script></head><body class=\"\">  <div class=\"wrapper\">    <div class=\"demo-wrapper\">      <div class=\"heatmap leaflet-container leaflet-fade-anim\" id=\"map-canvas\" style=\"position: relative;\" tabindex=\"0\">      </div>    </div>  <script src=\"leaflet_heatmap_files/heatmap.js\"></script>  <script src=\"leaflet_heatmap_files/leaflet-heatmap.js\"></script>  <script>    window.onload = function() {      var ";
        
        data = "testData = {max: 2,data: [{lat: 35.8278, lng:-78.6421, count: 1}, {lat: 46.90, lng:-117.46, count: 1}]};";
        
        page_end = "var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ maxZoom: 18, minZoom: 2 }); var cfg = { \"radius\": 2, \"maxOpacity\": .8, \"scaleRadius\": true, \"useLocalExtrema\": true, latField: 'lat', lngField: 'lng', valueField: 'count' }; var heatmapLayer = new HeatmapOverlay(cfg); var map = new L.Map('map-canvas', { center: new L.LatLng(25.6586, -80.3568), zoom: 4, layers: [baseLayer, heatmapLayer] }); heatmapLayer.setData(testData); }; </script></body></html>";

        page = "<!DOCTYPE html><html lang=\"en\"><head><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"leaflet_heatmap_files/example-commons.css\"><link rel=\"stylesheet\" href=\"leaflet_heatmap_files/leaflet.css\"><script src=\"leaflet_heatmap_files/leaflet.js\"></script></head><body class=\"\"><div class=\"wrapper\"><div class=\"demo-wrapper\"><div class=\"heatmap leaflet-container leaflet-fade-anim\" id=\"map-canvas\" style=\"position: relative;\" tabindex=\"0\"></div></div><script src=\"leaflet_heatmap_files/heatmap.js\"></script><script src=\"leaflet_heatmap_files/leaflet-heatmap.js\"></script><script>function movePoint(a, b, distance){var vector = [(b[0] - a[0]), (b[1] - a[1])];var length = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);var unitVector = [(vector[0] / length), (vector[1] / length)];return [(a[0] + unitVector[0] * distance), (a[1] + unitVector[1] * distance)];};window.onload = function() {var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom: 18});var cfg = {\"radius\": 2,\"maxOpacity\": .8,\"scaleRadius\": true,\"useLocalExtrema\": true,latField: 'lat',lngField: 'lng',valueField: 'count'};var heatmapLayer = new HeatmapOverlay(cfg);var map = new L.Map('map-canvas', {center: new L.LatLng(0, 0),zoom: 3,layers: [baseLayer, heatmapLayer]});var testData = {max: 8,data: [{lat: 35.8278, lng:-78.6421, count: 1}, {lat: 46.90, lng:-117.46, count: 1}]};heatmapLayer.setData(testData);startPoint = [35.8278, -78.6421];setTimeout(function() {var refreshIntervalId = setInterval(function() {newVal = movePoint(startPoint, [46.90, -117.46], 1);startPoint = newVal;var testData = {max: 8,data: [{lat: newVal[0], lng:newVal[1], count: 1}, {lat: 46.90, lng:-117.46, count: 1}]};heatmapLayer.setData(testData);if (startPoint[1] < -117)clearInterval(refreshIntervalId);}, 10);}, 1000);};</script></body></html>";

        res.set('Content-Type', 'text/html');
        res.status(200).send(page);
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


