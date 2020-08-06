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
        name: 'install',
        type: 'input',
        message: 'How is this installed? (leave blank if not necessary)'
    },
    {
        name: 'usage',
        type: 'input',
        message: 'What will this be used for?'
    },
    {
        name: 'license',
        type: 'checkbox',
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
        name: 'contributors',
        type: 'confirm',
        message: 'Are there any other contributors?'
    },
    {
        name: 'coPilot',
        type: 'input',
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
            console.log(answers.license);
            // console.log(answers);
            generateMarkdown(answers);
            const fileName = `${answers.title}` + '.md'
            // console.log(fileName);
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
        let licenseBDG = []
        if (answers.license[0] === 'MIT License'){
            licenseBDG.push(
                '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)') 
         console.log(licenseBDG);
        }else{
            console.log('nerp!');
        };
        fs.appendFile(fileName,
            `# ${answers.title}` +
            '\n' +
            licenseBDG +
            '\n' +
            `## ${answers.description}` +
            '\n' +
            '\n' +
            `### ${answers.contents}` + 
            '\n' +
            '\n' +
            `### ${answers.install}` +
            '\n' +
            '\n' +
            `### ${answers.usage}` +
            '\n' +
            '\n' +
            `### ${answers.license}` +
            '\n' +
            '\n' +
            `### ${answers.coPilot}` +
            '\n' +
            '\n' ,
            // `### ${answers.tests}`,
            // '\n' +
            // '\n' +
            // `### ${answers.install}`,
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
