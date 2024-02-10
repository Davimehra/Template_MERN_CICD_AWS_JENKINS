const originAllowed = require('./allowedOrigins');
const cors = require('cors');


const corsConfig = {
    origin: (origin: string, cb: (error: Error | null, allowed: boolean) => void) => {
        if (process.env.NODE_ENV !== "test") {
            console.log("Checking Origin");
            origin ? console.log("Origin = ", origin) : console.log("--- Origin Not Found")
        }
        if (originAllowed.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
        } else {
            cb(new Error("Not allowed by cors via Server"), false);
        }
    },
    optionsSuccessStatus: 200,
}

module.exports = corsConfig;

