var express = require('express')
var app = express();

/**
 * id will pass as paramete in get request
 * example : http://localhost:3003/mmaad 
 */
app.get("/:id", (req, res) => {
    var _input = req.params.id;
    var result = NonRepeat(_input.toString());
    if (result !== null) {
        res.status(200).send({
            Message: "Success",
            Result: "First non Repeat Character is " + result
        });
    } else {
        res.status(200).send({
            Message: "Failure",
            Result: "All are Repeating Character"
        });
    }
})

/**
 * 
 * @param {String} input 
 * This method returns the first not Repeat character
 */
function NonRepeat(input) {
    try {
        var resultLocal;
        for (var i = 0; i < input.length; i++) {
            resultLocal = false;
            for (var j = 0; j < input.length; j++) {
                if (input[i] == input[j] && i != j) {
                    resultLocal = true;
                    break;
                }
            }
            if (!resultLocal) {
                return input[i];
            }
        }
        return null;
    }
    catch (e) {
        return e;
    }
}

app.listen(3003);
