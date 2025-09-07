
console.log("Running test suites in order.");

describe('Ordered Test Suites', () => {
  try {
    require('./testsuites/auth.test.js');
    require('./testsuites/category.test.js');
    require('./testsuites/books.test.js');
    require('./testsuites/review.test.js');
  } catch (error) {
    console.error("Error executing test suites:", error);
  }
});

console.log("All test suites executed in order successfully!");

module.exports = {}; // Export an empty object to satisfy module requirements