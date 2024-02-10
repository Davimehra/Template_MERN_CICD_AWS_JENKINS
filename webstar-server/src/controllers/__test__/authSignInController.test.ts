import Request from "supertest";
const app = require('../../app');


it("return 200 on Successfull, SIGN-IN Request", async () => {
    await Request(app).post('/api/user/signup').send({ email: 'test@test.com', password: 'Test@1333' }).expect(201);
    await Request(app).post('/api/user/signin').send({ email: 'test@test.com', password: 'Test@1333' }).expect(200);
})

it('return 400 Bad Request, Invalid_email, SIGN-IN Request', async () => {
    await Request(app).post('/api/user/signup').send({ email: 'test@test.com', password: 'Test@1333' }).expect(201);
    await Request(app).post('/api/user/signin').send({ email: 'testtest.com', password: 'Test@1333' }).expect(400);
})

it('return 400 Bad Request, Empty_email, SIGN-IN Request', async () => {
    await Request(app).post('/api/user/signup').send({ email: 'test@test.com', password: 'Test@1333' }).expect(201);
    await Request(app).post('/api/user/signin').send({ email: '', password: 'Test@1333' }).expect(400);
})

it('return 400 Bad Request, Invalid_password, SIGN-IN Request', async () => {
    await Request(app).post('/api/user/signup').send({ email: 'test@test.com', password: 'Test@1333' }).expect(201);
    await Request(app).post('/api/user/signin').send({ email: 'test@test.com', password: 'test1333' }).expect(400);
})
it('return 400 Bad Request, Empty_password, SIGN-IN Request', async () => {
    await Request(app).post('/api/user/signup').send({ email: 'test@test.com', password: 'Test@1333' }).expect(201);
    await Request(app).post('/api/user/signin').send({ email: 'test@test.com', password: '' }).expect(400);
})