const request = require('supertest');
const app = require('../../server');
const printAfter = require('./helper/printAfter');
const printBefore = require('./helper/printBefore');
const { readSharedData, writeSharedData } = require('./variables/sharedDataUtil');

const sharedData = readSharedData();

beforeAll(() => {
    printBefore("Authentication Test Suite");
});

afterAll(() => {
    printAfter("Authentication Test Suite");
});

describe('Test Authentication API', () => {
  it('should register a new user', async () => {
    sharedData.testUser = `testuser_${Date.now()}`;
    sharedData.testEmail = `testuser_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: sharedData.testUser,
        email: sharedData.testEmail,
        password: 'Test@1234',
        phone: '1234567890',
        address: '123 Main St'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    sharedData.userId = res.body.user._id;
    writeSharedData(sharedData);
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: sharedData.testEmail,
        password: 'Test@1234'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});