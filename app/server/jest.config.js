module.exports = {
  reporters: [
    'default',
    ['jest-stare', {
      resultDir: 'jest-stare',
      reportTitle: 'Jest Test Report',
      additionalResultsProcessors: [],
      coverageLink: './index.html'
    }]
  ]
};
