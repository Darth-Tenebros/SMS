const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

// let response;

describe('login', function(){
    it('should return a 401 on /login/ with wrong creds', async function(){
        const response = await supertest
            .post('/login')
            .send({
                "email": "johnson@example.com",
                "password": "password9"
            })
            .then(response => {
                return response
            })
        expect(response.statusCode).to.be.equal(401);
    });

    it('should return a 200 on /login/', async function(){
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


describe('getAllStudents', function(){
    
    it('should return a 403 response on GET /students/ with no token provided', async function(){
        const response = await supertest
            .get('/students/')
            .then(response => {
                return response;
            });

        expect(response.statusCode).to.be.equal(403);
    });

    it('should return a 401 response on GET /students/ with invalid token', async function(){
        const response = await supertest
            .get('/students/')
            .set('Authorization', "Bearer " + "randomtext")
            .then(response => {
                return response;
            });

        expect(response.statusCode).to.be.equal(401);
    });

    it('should return a 200 response on GET /students/', async function(){
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
