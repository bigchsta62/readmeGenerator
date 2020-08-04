const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');



// array of questions for user
const questions = [
    {
        name: 'title',
        type: 'input',
        message: 'What is the Title of your Project?',
        validate: function (input) {
            if (/^([A-Za-z\-\d])+$/.test(input)) return true;
            else
                return 'Title may only include letters, number, underscores and hashes.'
        }
    },
    {
        name: 'description',
        type: 'input',
        message: 'PLease provide a brief description.'
        
    }
    // {
    //     name: 'title',
    //     type: 'input',
    //     message: 'What is the Title of your Project?',
    //     validate: function (input) {
    //         if (/^([A-Za-z\-\d])+$/.test(input)) return true;
    //         else
    //             return 'Title may only include letters, number, underscores and hashes.'
    //     }
    // }
];

inquirer
.prompt(questions)
.then(answers => {
    console.log(answers.title);
    generateMarkdown(answers);
    const fileName = `${answers.title}` + '.md'
    console.log(fileName);
    writeToFile(fileName, answers);
    })
    .catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
    });
// function to write README file
function writeToFile(fileName,answers) {
    fs.appendFile(fileName, 
    `# ${answers.title}` + '\n' +    
    `### ${answers.description}`, 
    function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Commit logged!");
        }
    });
}

// function to initialize program
function init() {

}

// function call to initialize program
init();

