var expect = require('chai').expect;
var request = require('request');

describe('returns first non-repeat character', function () {
    it('first non-repeating status', function (done) {
        request('http://localhost:3003/mmaad', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('first non-repeating result', function (done) {
        request('http://localhost:3003/mmaad', function (error, response, body) {
            let bodyResult= JSON.parse(body);
            expect(bodyResult.Message).to.equal('Success');  
            expect(bodyResult.Result).to.equal('First non Repeat Character is d');
            done();
        });
    });
});