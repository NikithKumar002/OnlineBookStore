const request = require("supertest");
const app = require("../server");
const { setSharedKeyValue, getSharedKeyValue, getAllSharedKeyValues } = require("./scripts/mongoSharedData");
const { newBookTitle, newAuthorName } = require("./testHelpers");

const printBefore = require("./helpers/printBefore");
const printAfter = require("./helpers/printAfter");

describe("Books API Tests", () => {
    beforeAll(() => printBefore("Books Test Suite"));
    afterAll(() => printAfter("Books Test Suite"));
    
    it("should create a book", async () => {
        let bookName = newBookTitle();
        let authorName = newAuthorName();
        let categoryName = await getSharedKeyValue("categoryName");
        let token = await getSharedKeyValue("token");
        console.log("Creating book with category: ", categoryName);
        const res = await request(app).put('/api/v1/books/create')
                                    .set("Authorization", `Bearer ${token}`)
                                    .send({
                                        title: bookName,
                                        author: authorName,
                                        category: categoryName,
                                        description: `${bookName} - A test book description`,
                                        publishedDate: '2023-10-01',
                                        stock: 10,
                                        price: 100
                                    });
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.result)).toBe(true);

        setSharedKeyValue("bookName", res.body.result[0].title);
        setSharedKeyValue("authorName", res.body.result[0].author);
        setSharedKeyValue("categoryName", res.body.result[0].category);
        setSharedKeyValue("bookId", res.body.result[0]._id);
        
        console.log("Added new book: ", await getAllSharedKeyValues());
    });

    it("should update a book", async () => {
        let bookName = await getSharedKeyValue("bookName") + "_updated";
        let authorName = await getSharedKeyValue("authorName") + "_updated";
        let categoryName = await getSharedKeyValue("categoryName");
        let token = await getSharedKeyValue("token");

        const res = await request(app).post(`/api/v1/books/update/${await getSharedKeyValue("bookId")}`)
                                    .set("Authorization", `Bearer ${token}`)
                                    .send({
                                        title: bookName,
                                        author: authorName,
                                        category: categoryName,
                                        description: `Updated description for ${bookName} book.`,
                                        publishedDate: '2023-10-01',
                                        stock: 40,
                                        price: 200
                                    });
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);

        setSharedKeyValue("bookName", res.body.result[0].title);
        setSharedKeyValue("authorName", res.body.result[0].author);

        console.log("Updated book response: ", await getAllSharedKeyValues());
    });

    it("should list all books", async () => {
        let token = await getSharedKeyValue("token");

        const res = await request(app).get("/api/v1/books/listAll").set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
    });

    it("should fetch books by category", async () => {
        let token = await getSharedKeyValue("token");

        const res = await request(app).get(`/api/v1/books/category/${await getSharedKeyValue("categoryId")}`).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
    });

    it("should fetch books by author name", async () => {
        let token = await getSharedKeyValue("token");
        
        const res = await request(app).get(`/api/v1/books/author/${await getSharedKeyValue("authorName")}`).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
    });
    
    // it('should delete a book by title', async () => {
    //     const res = await request(app)
    //     .delete(`/api/v1/books/delete/${sharedData.bookId}`).set("Authorization", `Bearer ${token}`);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.success).toBe(true);
    // });
});
