import { Application } from "express";
import { Mongoose } from "mongoose";
import { Knex } from "knex";

const mariaDatabase: Knex = require('./mariadb');
const mongoose: Mongoose = require('mongoose');
const options = require('../config/mongoConnection');


exports.connect = (app: Application) => {
    let timmer: any = null;
    let retries: number = 0;

    // mongoose.Promise = global.Promise; // Required for mongoose <= 4
    const mongoURI: string = process.env.MONGO_URI!;
    // Connecting to MONGODB via mongoose Driver
    const connectingToFirst_DB = async () => {
        if (!mongoURI) {
            throw new Error("Mongo URI not defined")
        }
        await mongoose.connect(process.env.MONGO_URI!, options).then(() => {
            console.log(`Connected to MongoDB `)
            connectingToSecond_DB(); timmer = null; retries = 0;
        }).catch(() => {
            retries++; // retries log increment
            // will try 10 times 
            console.log("Error Occured While Connecting to Mongodb");
            console.log(`\nRETRY LEFT ${10 - retries}X - Mongodb`)
            console.log("User can Gracefully Exit - within 5 sec - else will retry to connect to mongodb !")

            if (retries < 10) {
                if (timmer) clearTimeout(timmer) // clear old timmer
                timmer = setTimeout(() => { connectingToFirst_DB() }, 5000);
            } else {
                console.log("Check MongoDB connection configuration \nmongoose UNABLE to connect to MongoDB Server")
            }
            // after once retried
            // clear timmer

        })
    }

    // Connecting to MariaDB via knex Driver
    const connectingToSecond_DB = async () => {
        await mariaDatabase.raw('select VERSION() version')
            .then(([row, column]) => row[0])
            .then((row): void => {
                console.log(`Connection Successfull with mariadb \nVersion of Row = ${row.version}`);
                app.emit('databaseReady');
            }).catch(() => {
                console.log("Error Occured while Checking MariaDB")
                retries++; // retries log increment
                // will try 10 times 
                console.log("Error Occured While Connecting to Mariadb");
                console.log(`\nRETRY LEFT ${10 - retries}X - Mariadb`)
                console.log("User can Gracefully Exit - within 5 sec - else will retry to connect to mariadb !")

                if (retries < 10) {
                    if (timmer) clearTimeout(timmer) // clear old timmer
                    timmer = setTimeout(() => { connectingToSecond_DB() }, 5000);
                } else {
                    console.log("Check MariaDB connection configuration \nknex UNABLE to connect to MariaDB Server")
                }
                // after once retried
                // clear timmer
            })
    }
    connectingToFirst_DB();
}
