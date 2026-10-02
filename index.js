import "dotenv/config";
import mongoose from "mongoose";
import startUserStatusCron from "./jobs/Status.js";


async function startApp() {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log(
            "Connected to MongoDB"
        );


        startUserStatusCron();


        console.log(
            "Application is running"
        );

    }
    catch (error) {

        console.log(
            "MongoDB connection failed:",
            error
        );

        process.exit(1);

    }

}


startApp();