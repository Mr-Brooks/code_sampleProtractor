exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['solutionSpec.js'],

    capabilities: {
        browserName: 'chrome'
    },

    jasmineNodeOpts: {
        showColors: true,   // Use colors in the command line report.  
        defaultTimeoutInterval: 150000  // Time to wait in ms before a test fails. Default value = 30000
    }

  }