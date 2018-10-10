const assert = require('assert');
const express = require('express');
const request = require('supertest');
const { standingOrder } = require('../../lib/aspsp-resource-server/standing-orders');

const app = express();

const req = {
    path: `/open-banking/v1.1/standing-orders`,
    method: 'get',
    headers: {
        'authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        'x-fapi-financial-id': 'bbbUB4fPIYB0k1m',
    },
};


const res = {}

describe('Standing Order request', () => {
    it('standingMiddleware', () => {
        var result = standingOrder.getResponse(null, 'Authorize')
        //  console.log(result)
        assert.equal('object', typeof result.Data.StandingOrder);
        assert.equal('22290', result.Data.StandingOrder[0].AccountId);
        assert.equal(req.path, result.Links.Self);
    })
    it('standing Order Get', () => {
        request(req.path, req.headers, function (error, response, body) {
            let bodyResult = JSON.parse(body);
            expect(response.status, 200);
            assert.equal('object', typeof result.Data.StandingOrder);
            assert.equal('22290', result.Data.StandingOrder[0].AccountId);
            assert.equal(req.path, result.Links.Self);
        });
    });
})