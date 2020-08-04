// function to generate markdown for README
const fs = require('fs');

function generateMarkdown(answers) {
  return `# ${answers.title}`;
  writeToFile(answers);
   
}

module.exports = generateMarkdown;
