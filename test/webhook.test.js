var supertest = require('supertest'),
    api = supertest('http://localhost:8080'),
    expect = require('chai').expect;

describe('Webhook', function() {
    var headers = {
        'Accept': 'application/json'
    };

    it('should store one record', function(done) {
        api.post('/webhooks')
        .set(headers)
        .send({
            foo: 'bar'
        })
        .expect(200)
        .end(done);
    });

    it('should get the last ten records', function(done) {
        api.get('/webhooks?limit=10&skip=0')
        .set(headers)
        .expect(200)
        .expect(function(res) {
            expect(res.body.length).to.be.equal(1);
        })
        .end(done);
    });

    before(function(done) {
        api.del('/webhooks')
        .set(headers)
        .expect(205)
        .end(done);
    });
});
