import express, { Express, Response, Request, NextFunction } from 'express'
import { Knex } from 'knex';
import cookieSession from 'cookie-session';
import { PageNotFoundError } from './statusCode/networkErrors';
import { cookiesConfig } from './config/jwtConfig';

const app: Express = express();
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv");

const credentialControl = require('./middleware/credentialControl')
const { verifyEnv } = require('./middleware/verifyEnv')

const corsConfig = require('./config/corsConfig');
const mariadb: Knex = require('./db/mariadb');

const { authRouter } = require("./routers/allRouters");

dotenv.config();
app.set("trust proxy", true); // UnderStanding CookiesSession at req.session

// process.env.NODE_ENV !== "test";

app.use(
    cookieSession(cookiesConfig)
);


app.use(express.static(path.join(__dirname, "public"))); // it will allow client to have look to public folder
app.use(express.urlencoded({ extended: true }));  // parse queries and parameters inside url
app.use(express.json({ limit: '100mb' }));  //  parse json inside BODY and accept limit 100Mi
app.use(credentialControl); // Allowing Origin Credentials
app.use(cors(corsConfig));
app.use(verifyEnv)

// Routes

// 1. User Authetication Route
app.use("/api/user", authRouter)


// Testing Services
app.get('/api/test/mariadb', (req: Request, res: Response, next: NextFunction) => {
    console.log("/api/test/mariadb")
    mariadb.raw('select VERSION() version')
        .then(([rows, columns]) => rows[0])
        .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
        .catch(next);
})


// 404 Page Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new PageNotFoundError());
});

interface ErorrInt extends Error {
    statusCode: number;
    message: string;
}

// UnExpectected Error Handling
app.use((err: ErorrInt, req: Request, res: Response, next?: NextFunction): void => {
    res.status(err.statusCode || 500);
    res.json({
        message: err.message || "UnKnown Error Occured",
        statusCode: err.statusCode || 500,
    });
});

module.exports = app;

