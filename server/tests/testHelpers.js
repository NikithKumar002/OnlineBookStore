module.exports = {
  newUsername: () => `testuser_${Date.now()}`,
  newEmail: () => `test_${Date.now()}@example.com`,
  newCategoryName: () => `Category_${Date.now()}`,
  newCategoryDescription: () => `CategoryDescription_${Date.now()}`,
  newBookTitle: () => `Book_${Date.now()}`,
  newAuthorName: () => `Author_${Date.now()}`
};
