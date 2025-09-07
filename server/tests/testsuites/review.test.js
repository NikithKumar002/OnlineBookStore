const request = require('supertest');
const app = require('../../server');
const printAfter = require('./helper/printAfter');
const printBefore = require('./helper/printBefore');
const { readSharedData, writeSharedData } = require('./variables/sharedDataUtil');

const sharedData = readSharedData();

beforeAll(() => {
    printBefore("Review Test Suite");
});

afterAll(() => {
    printAfter("Review Test Suite");
});

describe('Test Reviews API', () => {
  it('should add a review', async () => {
    console.log(sharedData);
    const res = await request(app)
      .put(`/api/v1/books/review/${sharedData.bookId}/${sharedData.userId}`)
      .send({
        rating: 5,
        comment: 'Great book!'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should update a review', async () => {
    const res = await request(app)
      .post(`/api/v1/books/review/${sharedData.bookId}/${sharedData.userId}`)
      .send({
        rating: 4,
        comment: 'Great book!, Updated review'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});