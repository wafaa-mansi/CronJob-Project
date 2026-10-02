import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    lastLogin: {
        type: Date,
        default: Date.now
    }

});


const User = mongoose.model(
    "User",
    userSchema
);


export default User;