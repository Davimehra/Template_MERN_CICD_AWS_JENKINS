import { MongoMemoryServer } from 'mongodb-memory-server';
import Request from 'supertest';
import mongoose from 'mongoose';
const server = require('../app');

declare global {
    var signUp: ({ email, password }: { email: string, password: string }) => Promise<string[]>
}
let mongod: MongoMemoryServer
// beforeAll
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();

    await mongoose.connect(mongoUri);

    process.env.JWT_ACCESS_TOKEN_SECRET = "GiveSomeRandomStuff"
    process.env.JWT_REFRESH_TOKEN_SECRET = "GiveSomeRandomStuff"
    process.env.NODE_ENV = "test"
    process.env.MONGO_URI = mongoUri;
})
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        // Deleted all documents of all collections
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    mongod.stop();
    await mongoose.connection.close();
})



globalThis.signUp = async ({ email, password }: { email: string, password: string }) => {
    const response = await Request(server).post('/api/user/signup').send({ email, password }).expect(201)
    const cookie = response.get('Set-Cookie');
    return cookie;
}