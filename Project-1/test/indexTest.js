var expect = require('chai').expect;
var request = require('request');

describe('returns file data', function () {
    it('File Read Status', function (done) {
        request('http://localhost:3001', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('File Read Content', function (done) {
        request('http://localhost:3001', function (error, response, body) {
            expect(body).to.equal('Ashaforjona Abdul (Securities) <ashaforjona.abdul@wipro.com> Sudhir Gudimetla (Securities) <sudhir.gudimetla@wipro.com> Senthamizh Arasi R (Securities) <senthamizh.r95@wipro.com>\n');
            done();
        });
    });
});