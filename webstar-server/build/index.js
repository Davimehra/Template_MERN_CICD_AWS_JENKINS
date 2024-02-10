"use strict";
const http = require('http');
const mongoose = require('mongoose');
const application = require('./app');
const httpServer = http.createServer(application);
// class ExitHandler {
//   async handleExit() {
//   }
// }
mongoose.connect(`mongodb://${process.env.MONGODB_SERVICE_NAME}:27017/${process.env.MONGODB_DATABASE_NAME}`).then(() => {
    console.log(`Connected to MongoDB  - using DB : ${process.env.MONGODB_DATABASE_NAME} `);
    httpServer.listen(5000, () => {
        console.log("Node env Value = ", process.env.NODE_ENV);
        console.log("Listening at port 5000");
    });
}).catch(() => {
    console.log("Error Occured While Connecting to Mongodb");
});
