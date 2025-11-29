const request = require("supertest");
const app = require("../server");
const { getSharedKeyValue } = require("./scripts/mongoSharedData");

const printBefore = require("./helpers/printBefore");
const printAfter = require("./helpers/printAfter");

describe("Review API Tests", () => {
    beforeAll(() => printBefore("Review Test Suite"));
    afterAll(() => printAfter("Review Test Suite"));
    it("should add a review", async () => {
        const res = await request(app).put(`/api/v1/books/review/${await getSharedKeyValue("bookId")}/${await getSharedKeyValue("userId")}`)
                                    .send({
                                        rating: 5,
                                        comment: "Amazing book!"
                                    });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it("should update a review", async () => {
        const res = await request(app).post(`/api/v1/books/review/${await getSharedKeyValue("bookId")}/${await getSharedKeyValue("userId")}`)
                                    .send({
                                        rating: 4,
                                        comment: "Updated review"
                                    });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
    });
});
