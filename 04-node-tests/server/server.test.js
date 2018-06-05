const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', ()=> {

    describe('GET /', ()=> {

        it('should return hello world response', (done) => {
            request(app)
                .get('/')
                .expect('Hello World')
                .end(done);
        });

    });

    describe('GET /about', ()=> {

        it('should return a 404 error', (done) => {
            request(app)
                .get('/about')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page not found'
                    })
                })
                .end(done);
        });

    });

    describe('GET /users', ()=> {

        it('should return users', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        name: 'Mike',
                        age: 25
                    })
                })
                .end(done);
        });

    });

});