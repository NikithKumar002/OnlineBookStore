const mongoose = require("mongoose");

// {
//   _id: ObjectId,
//   name: String,
//   email: String,
//   password: String, // hashed
//   role: String, // 'user' or 'admin'
//   phone: string
//   address: String,
//   cart: [ObjectId], // references Book
//   createdAt: Date
// }
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email ID is required"]
        // validate: {
        //     validator: () => Promise.resolve(false),
        //     message: 'Eamil validation failed'
        // }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    address: {
        type: [String],
        required: [true, "Address is required"]
    },
    cart: [{
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Book',
        default: []
    }], 
    profile: {
        type: String,
        default: 'https://tse2.mm.bing.net/th/id/OIP.pdy0fmGsPad1zT3Lwx8cIQHaHa?r=0&w=512&h=512&rs=1&pid=ImgDetMain&o=7&rm=3'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema, "userDetails");