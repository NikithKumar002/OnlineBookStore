const request = require('supertest');
const app = require('../../server');
const printAfter = require('./helper/printAfter');
const printBefore = require('./helper/printBefore');
const { readSharedData, writeSharedData } = require('./variables/sharedDataUtil');

const sharedData = readSharedData();
console.log(sharedData);

beforeAll(() => {
    printBefore("Books Test Suite");
});

afterAll(() => {
    printAfter("Books Test Suite");
});

describe('Test Books API', () => {

  it('should add a new book', async () => {
    sharedData.bookName = `TestBook_${Date.now()}`;
    sharedData.authorName = `TestAuthorName_${Date.now()}`;
    console.log(sharedData);
    const res = await request(app)
      .put('/api/v1/books/create')
      .send({
        title: sharedData.bookName,
        author: sharedData.authorName,
        category: sharedData.categoryName,
        description: `${sharedData.bookName} - A test book description`,
        publishedDate: '2023-10-01',
        stock: 100,
        price: 10
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.result)).toBe(true);
    sharedData.bookName = res.body.result[0].title;
    sharedData.authorName = res.body.result[0].author;
    sharedData.categoryName = res.body.result[0].category;
    sharedData.bookId = res.body.result[0]._id;
    console.log(sharedData);
    writeSharedData(sharedData);
  });

  it('should fetch all books', async () => {
    const res = await request(app)
      .get('/api/v1/books/listAll');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.result)).toBe(true);
  });

  it('should fetch all books by Category', async () => {
    const res = await request(app)
      .get(`/api/v1/books/category/${sharedData.categoryId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.result)).toBe(true);
  });

  it('should fetch all books by Author', async () => {
    const res = await request(app)
      .get(`/api/v1/books/author/${sharedData.authorName}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.result)).toBe(true);
  });

  it('should update the books', async () => {
    console.log(`Print shared data: ${JSON.stringify(sharedData, null, 2)}`);
    const res = await request(app)
      .post(`/api/v1/books/update/${sharedData.bookId}`)
      .send({
        title: `${sharedData.bookName}_updated`,
        author: `${sharedData.authorName}_updated`,
        category: sharedData.categoryName,
        description: `Updated description for ${sharedData.bookName} book.`,
        publishedDate: '2023-10-01',
        stock: 460,
        price: 50
      });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.result)).toBe(true);
    sharedData.bookName = res.body.result[0].title;
    sharedData.authorName = res.body.result[0].author;
    // sharedData.categoryName = res.body.result[0].category;
    writeSharedData(sharedData);
  });

  // it('should delete a book by title', async () => {
  //   const res = await request(app)
  //     .delete(`/api/v1/books/delete/${sharedData.bookId}`);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.success).toBe(true);
  // });
});