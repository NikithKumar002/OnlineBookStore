const request = require('supertest');
const app = require('../server');
const { setSharedKeyValue, getSharedKeyValue, getAllSharedKeyValues } = require("./scripts/mongoSharedData");
const { newUsername, newEmail } = require('./testHelpers');

const printBefore = require('./helpers/printBefore');
const printAfter = require('./helpers/printAfter');

describe("Authentication API Tests", () => {
    beforeAll(() => printBefore("Auth Test Suite"));
    afterAll(() => printAfter("Auth Test Suite"));

    it("should register a new user", async () => {
        let testUser = newUsername();
        let testEmail = newEmail();

        const res = await request(app).post("/api/v1/auth/register")
                                    .send({
                                        username: testUser,
                                        email: testEmail,
                                        password: "Test@1234",
                                        phone: "9999999999",
                                        address: "Test Address"
                                    });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        await setSharedKeyValue("userId", res.body.result[0]._id);
        await setSharedKeyValue("email", testEmail);
        console.log(await getAllSharedKeyValues());
    });

    it("should login with correct credentials", async () => {
        const res = await request(app).post("/api/v1/auth/login")
                                    .send({
                                        email:  await getSharedKeyValue("email"),
                                        password: "Test@1234"
                                    });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        console.log("Login Response: ", res.body);
        console.log(await getAllSharedKeyValues());
    });
});
