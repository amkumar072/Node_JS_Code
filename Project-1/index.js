var http = require("http"),
    formidable = require('formidable'),
    fs = require("fs");

var port = 3001;

/**
 * Listen the port 3001
 * Read the local file madhan.txt and send the output as content in file.
 */
http.createServer(function (req, res) {

    var filePath = __dirname + '/madhan.txt'

    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data + "\n");
            res.end();
        } else {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.write(err + "\n");
            res.end();
        }
    });

}).listen(port);
