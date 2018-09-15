var express = require('express')
var app = express();

var product = [{
    id: "1",
    name: "Apple",
    rate: "$10"
},
{
    id: "2",
    name: "Grapes",
    rate: "$5"
},
{
    id: "3",
    name: "Banana",
    rate: "$4"
}
]

/**
 * Takes to paramter id and name in get reqeust
 * example:  http://localhost:3002/1/Apple
 */
app.get("/product/:id/:name", (req, res) => {
    var _id = req.params.id;
    var _name = req.params.name;
    var result = product.find(x => x.id === _id && x.name === _name);
    if (result !== undefined) {
        res.status(200).send({
            Message: "Success",
            Data: result
        });
    } else {
        res.status(400).send({
            Message: "No Record Found"
        });
    }
})

app.listen(3002);
