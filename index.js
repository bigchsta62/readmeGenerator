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

    },
    // {
    //     name: 'contents',
    //     type: 'confirm',
    //     message: 'Do you need a Table of Contents',
    //     validate: function yes(contents) {
    //         if (contents === "yes"){
    //             console.log('Table of awesome')
    //         }
    //     }
    // },
    {
        type: 'input',
        name: 'install',
        message: 'How is this installed? (leave blank if not necessary)'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'What will this be used for?'
    },
    {
        type: 'checkbox',
        name: 'use',
        message: 'Please select a License (use up or down arrow to highlight, then spacebar',
        choices: [
            { name: 'MIT License' },
            { name: 'Apache License' },
            { name: 'GPL License' },
            { name: 'Other License (This will have to entered manually)' },
            { name: 'NONE' },
        ],
        validate: function (answer) {
            if (answer.length < 1) {
                return 'You must choose at least one option.';
            }
            return true;
        },
    },
    {
        type: 'confirm',
        name: 'contributors',
        message: 'Are there any other contributors?'
    },
    {
        type: 'input',
        name: 'help',
        message: 'Please list each contributor separated by a comma',
        when: function (answers) {
            return answers.contributors;
        },

    },




    
];

function init() {
inquirer
    .prompt(questions)
    .then(answers => {

        console.log(answers.use);
        console.log(answers);
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
function writeToFile(fileName, answers) {
    fs.appendFile(fileName,
        `# ${answers.title}` +
        '\n' +
        '\n' +
        `## ${answers.description}` +
        '\n' +
        '\n' +
        `### ${answers.use}`,
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

}

// function call to initialize program
init();
