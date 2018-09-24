var expect = require('chai').expect;
var request = require('request');

describe('returns Product', function () {
    it('Product Status', function (done) {
        request('http://localhost:3002/product/1/Apple', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('Product Result', function (done) {
        request('http://localhost:3002/product/1/Apple', function (error, response, body) {
            let bodyResult= JSON.parse(body);
            expect(bodyResult.Message).to.equal('Success');  
            expect(bodyResult.Data.id).to.equal('1');
            expect(bodyResult.Data.name).to.equal('Apple');
            expect(bodyResult.Data.rate).to.equal('$10');
            done();
        });
    });
});