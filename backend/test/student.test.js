const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

// let response;

describe('test login', () => {
    it('should return a 200 on /login/', async () => {
        const response = await supertest
            .post('/login')
            .send({
                "email": "johnson@example.com",
                "password": "password1"
            })
            .then(response => {
                return response
            })
        expect(response.statusCode).to.be.equal(200)
    });
});

describe('test get students', () => {
    it('should return a 200 response on GET /students/', async () => {
        // get the token
        const token =  await supertest
            .post('/login')
            .send({
                "email": "johnson@example.com",
                "password": "password1"
            })
            .then(response => {
                return response
            })
            
        const response = await supertest
            .get('/students/')
            .set('Authorization', "Bearer "+token._body.data)
            .then(response => {
                return response;
            });

        expect(response.statusCode).to.be.equal(200);
    });


});