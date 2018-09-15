var express = require('express'),
    fs = require("fs");
var app = express();

/**
 * When the file api calls it reads the input file and writes the data in output file using Stream.
 */
app.get("/file", (req, res) => {
    try {
        var input = __dirname + '/input.txt';
        var output = __dirname + '/output.txt';
        if (fs.readFileSync(input)) {
            var readFileStream = fs.createReadStream(input);
            var outputFileStream = fs.createWriteStream(output)
            readFileStream.pipe(outputFileStream);
            res.status(200).send({
                Message: "Success"
            })
        }
    }
    catch (e) {
        res.status(200).send({
            Message: "Failure",
            Error: e
        })

    }
});

app.listen(3004);
