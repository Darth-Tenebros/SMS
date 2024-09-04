const supertest = require('supertest')('localhost:3000');
const expect = require('chai').expect;

// let response;

describe('test login', () => {
    it('should return a 401 on /login/ with wrong creds', async () => {
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
});

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
    it('should return a 403 response on GET /students/ with no token provided', async () => {
            
        const response = await supertest
            .get('/students/')
            .then(response => {
                return response;
            });

        expect(response.statusCode).to.be.equal(403);
    });
});


describe('test get students', () => {
    it('should return a 401 response on GET /students/ with invalid token', async () => {
            
        const response = await supertest
            .get('/students/')
            .set('Authorization', "Bearer "+"randombullshit")
            .then(response => {
                return response;
            });

        expect(response.statusCode).to.be.equal(401);
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