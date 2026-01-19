const request = require('supertest');
const app = require('../server');

const { setSharedKeyValue, getSharedKeyValue, getAllSharedKeyValues } = require("./scripts/mongoSharedData");
const { newCategoryName, newCategoryDescription } = require('./testHelpers');

const printBefore = require('./helpers/printBefore');
const printAfter = require('./helpers/printAfter');

describe("Category API Tests", () => {
    beforeAll(() => printBefore("Category Test Suite"));
    afterAll(() => printAfter("Category Test Suite")); 

    it('should add a new category', async () => {
        let categoryName = await newCategoryName();
        let categoryDescription = await newCategoryDescription();
        let token = await getSharedKeyValue("token");
        const res = await request(app).put('/api/v1/category/create')
                                    .set("Authorization", `Bearer ${token}`)
                                    .send({
                                        categoryName: categoryName,
                                        categoryDescription: categoryDescription
                                    });
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.result)).toBe(true);

        await setSharedKeyValue("categoryId", res.body.result[0]._id);
        await setSharedKeyValue("categoryName", categoryName);
        console.log("Add New Category: ", await getAllSharedKeyValues());
    });

    it('should update the category', async () => {
        let categoryName = await getSharedKeyValue("categoryName") + "_updated";
        let categoryDescription = `Updated description for ${categoryName} category.`;
        let token = await getSharedKeyValue("token");
        const res = await request(app).post(`/api/v1/category/update/${await getSharedKeyValue("categoryId")}`)
                                    .set("Authorization", `Bearer ${token}`)
                                    .send({
                                        categoryName: categoryName,
                                        categoryDescription: categoryDescription
                                    });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.result)).toBe(true);

        await setSharedKeyValue("categoryName", categoryName);
        console.log("Updated Category Response: ", await getAllSharedKeyValues());
    });

    it("should list all categories", async () => {
        let token = await getSharedKeyValue("token");
        const res = await request(app).get("/api/v1/category/list")
                                    .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
    });

    // it('should delete a category by name', async () => {
    //     const res = await request(app).delete(`/api/v1/category/delete/${categoryName}`)
    //                                 .set("Authorization", `Bearer ${token}`);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.success).toBe(true);
    // });
});
