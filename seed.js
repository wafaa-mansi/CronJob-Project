import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";


async function seedUsers() {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log(
            "Connected to MongoDB"
        );


        await User.deleteMany({
            email: {
                $in: [
                    "alice@test.com",
                    "bob@test.com",
                    "carol@test.com",
                    "david@test.com"
                ]
            }
        });


       await User.insertMany([
    {
        name: "Alice",
        email: "alice@test.com",
        status: "active",
        lastLogin: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
        name: "Bob",
        email: "bob@test.com",
        status: "active",
        lastLogin: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
        name: "Carol",
        email: "carol@test.com",
        status: "inactive",
        lastLogin: new Date(Date.now() - 20 * 60 * 1000)
    },
    {
        name: "Baraa",
        email: "baraa@test.com",
        status: "active",
        lastLogin: new Date(Date.now() - 6 * 60 * 1000)
    }
]);


        console.log(
            "Test users created"
        );


        await mongoose.connection.close();

    }
    catch (error) {

        console.log(error);

    }

}


seedUsers();
