const inq = require('../index.js')

// syntax of test taken from: 
// https://stackoverflow.com/questions/49862039/how-to-write-unit-tests-for-inquirer-js

// tests the inquirer prompts
describe('test user input', () => {

  const inquirer = {prompt: () => Promise.resolve({
    text: "TST",
    shape: "circle",
    text_color: "white",
    shape_color: "blue"
})};

  it('should equal test', () => {
    inq({inquirer})().then(answers => { 
        expect(answers.text).toEqual("TST")
        expect(answers.shape).toEqual("circle")
        expect(answers.text_color).toEqual("white")
        expect(answers.shape_color).toEqual("blue") 
    })
  })
})