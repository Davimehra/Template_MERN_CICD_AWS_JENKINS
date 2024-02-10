import Request from 'supertest';

const app = require('../../app');



it('return 200 on Successfull, SIGN-OUT Request', async () => {
    const cookieRes = await globalThis.signUp({ email: "test@test.com", password: 'Test@133' });
    const response = await Request(app).post('/api/user/signout').set('Cookie', cookieRes).expect(200)

    expect((response.get('Set-Cookie'))[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')

})