const mongoose = require("mongoose");
const { resetSharedValues } = require("./scripts/mongoSharedData");

beforeAll(async () => {
    console.log("Current connection state:", mongoose.connection.readyState);
    if (mongoose.connection.readyState === 0) {
        console.log("Connecting to MongoDB...");
        await mongoose.connect("mongodb://127.0.0.1:27017/onlinebookstore");
    }
    console.log("Connected to MongoDB.");
    console.log("Resetting shared test collection...");
    await resetSharedValues();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("FULL ORDERED TEST RUN", () => {
    require("./auth.test.js");       // Must run first
    require("./category.test.js");   // Depends on user
    require("./books.test.js");      // Depends on category + user
    require("./review.test.js");     // Depends on book + user
});
