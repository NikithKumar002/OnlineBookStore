const request = require('supertest');
const app = require('../../server');
const printAfter = require('./helper/printAfter');
const printBefore = require('./helper/printBefore');
const { readSharedData, writeSharedData } = require('./variables/sharedDataUtil');
const sharedData = readSharedData();

beforeAll(() => {
    printBefore("Category Test Suite");
});

afterAll(() => {
    printAfter("Category Test Suite");
});
describe('Test Category API', () => {

    it('should add a new category', async () => {
        sharedData.categoryName = `TestCategory_${Date.now()}`;
        sharedData.categoryDescription = `TestCategoryDescription_${Date.now()}`;
        const res = await request(app)
        .put('/api/v1/category/create')
        .send({
            categoryName: sharedData.categoryName,
            categoryDescription: sharedData.categoryDescription
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.result)).toBe(true);
        sharedData.categoryId = res.body.result[0]._id;
        writeSharedData(sharedData);
        console.log(readSharedData());
    });

    it('should update the category', async () => {
        console.log(`Category to be updated: ${sharedData.categoryName}`);
        const res = await request(app)
        .post(`/api/v1/category/update/${sharedData.categoryId}`)
        .send({
            categoryName: sharedData.categoryName,
            categoryDescription: `Updated description for ${sharedData.categoryName}`
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.result)).toBe(true);
        // sharedData.categoryName = res.body.result[0].categoryName;
        sharedData.categoryDescription = res.body.result[0].categoryDescription;
        writeSharedData(sharedData);
        console.log(readSharedData());
    });

    it('should fetch all category', async () => {
        const res = await request(app).get('/api/v1/category/list');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
    });

    // it('should delete a category by name', async () => {
    //     const res = await request(app).delete(`/api/v1/category/delete/${categoryName}`);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.success).toBe(true);
    // });
});
