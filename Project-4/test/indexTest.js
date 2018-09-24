var expect = require('chai').expect;
var request = require('request');

describe('returns data written in disk', function () {
    it('file content status', function (done) {
        request('http://localhost:3004/file', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('file content result', function (done) {
        request('http://localhost:3004/file', function (error, response, body) {
            let bodyResult= JSON.parse(body);
            expect(bodyResult.Message).to.equal('Success');  
            done();
        });
    });
});