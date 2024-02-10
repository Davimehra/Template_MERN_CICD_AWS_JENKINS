import Request from "supertest";
const app = require('../../app');


it("return 200 on Successfull, Current Request", async () => {
    const cookieRes = await globalThis.signUp({ email: 'test@test.com', password: 'Test@1333' });
    console.log(cookieRes)
    const response = await Request(app).get('/api/user/currentuser').set('Cookie', cookieRes).expect(200);

    expect(response.body.email).toEqual('test@test.com')
})

