const database = require('./db/databaseConnect');
import { Application } from "express";
// import * as http from 'http';
const app: Application = require('./app')
// const httpServer = http.createServer(app);

//Connection to Databases (MongoDB and MariaDB)

database.connect(app);  // Connecting to mongodb
let serverListening: any;
app.on('databaseReady', () => {  // 'ready' signal is emitted by mongodb
  serverListening = app.listen(5000, () => {
    console.log("Node env Value = ", process.env.NODE_ENV)
    console.log("Listening at port 5000");
  })
})

// need this in docker container to properly exit since node doesn't handle SIGINT/SIGTERM this also won't work on using 'npm start' since:
// it is usefull in case user run some process in background like nodemon , it will shutdown
// if you want to use npm then start with `docker run --init` to help, but I still don't think it's a graceful shutdown of node process

// shut down serverListening
function shutdown() {
  serverListening.close(function onServerClosed(err: Error) {
    if (err) {
      console.error(err);
      process.exit(1); // exit with error 
    }
    process.exit(0); // exit without error
  });
}

// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
  console.info(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
  console.info(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});




