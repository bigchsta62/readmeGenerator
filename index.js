const inquirer = require('inquirer');

const fs = require('fs');
const table = [
    '* [Installation](#installation)' + '\n' +
    '* [Usage](#usage)' + '\n' +
    '* [Tests](#tests)' + '\n' +
    '* [Contributing](#contributing)' + '\n' +
    '* [Questions](#questions)' + '\n'
];

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
    {
        name: 'install',
        type: 'editor',
        message: 'How is this installed?',
        validate: function (text) {
            if (text.split('\n').length < 1) {
                return 'Must be at least 1 lines.';
            }
            return true;
        },
    },
    {
        name: 'usage',
        type: 'input',
        message: 'What will this be used for?'
    },
    {
        name: 'license',
        type: 'checkbox',
        message: 'Please select a License',
        choices: [
            { name: 'MIT License' },
            { name: 'Apache License' },
            { name: 'GPL License' },
            { name: 'Other License' },
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
        message: 'Are you accepting contributions to this repo?'
    },
    {
        name: 'coPilot',
        type: 'editor',
        message: 'Please explain rules for contributing on at least 3 lines',
        when: function (answers) {
            return answers.contributors;
        },
        validate: function (text) {
            if (text.split('\n').length < 3) {
                return 'Must be at least 3 lines.';
            }
            return true;
        },
    },
    {
        name: 'tests',
        type: 'editor',
        message: 'What testing has been done',
        validate: function (text) {
            if (text.split('\n').length < 1) {
                return 'Must be at least 1 lines.';
            }
            return true;
        },
    },
    {
        name: 'gitHub',
        type: 'input',
        message: 'Please provide your Github username'
    },
    {
        name: 'email',
        type: 'input',
        message: 'Please provide your email address',
        validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            if (valid) {
                console.log("Thank you");
                return true;
            } else {
                console.log(".  Please enter a valid email")
                return false;
            }
        },
    },
    {
        type: 'confirm',
        name: 'enjoy',
        message: 'I hope you found this useful (just hit enter for YES)?',
        default: true,
    },
];
//Initializes Command Line Interface(CLI)
function init() {
    inquirer
        .prompt(questions)
        .then(answers => {
            // console.log(answers.license);
            // console.log(answers);
            
            
            // console.log(fileName);
            writeToFile(answers);
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    // function to write README file
    function writeToFile(answers) {
        const lic = answers.license;
        let licenseBDG = []
        if (lic.includes('MIT License')) {
            licenseBDG.push('[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)')
        };
        if (lic.includes('Apache License')) {
            licenseBDG.push('[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)')
        };
        if (lic.includes('GPL License')) {
            licenseBDG.push('[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)')
        };
        if (lic.includes('NONE')) {
            licenseBDG.push('None')
        };
        const licJoin = lic.join(', ');

        //This writes all the answers and formatting to a .md file
        //and will create one if it doesn't exist
        fs.appendFile('README.md',
            `# ${answers.title}` + '\n' +
            licenseBDG + '\n' + '\n' +
            `## ${answers.description}` + '\n' + '\n' +
            `${table}` + '\n' + '\n' +
            '## Installation' + '\n' +
            ` ${answers.install}` + '\n' + '\n' +
            '## Usage' + '\n' +
            ` ${answers.usage}` + '\n' + '\n' +
            '## License' + '\n' +
            'This application is covered under the following license(s)' + '\n' +
            `${licJoin}` + '\n' + '\n' +
            '## Contributing' + '\n' +
            ` ${answers.coPilot}` + '\n' + '\n' +
            '## Tests' + '\n' +
            ` ${answers.tests}` + '\n' + '\n' +
            '## Questions' + '\n' +
            `Link to this repo:  https://github.com/${answers.gitHub}/${answers.title}` + '\n' + '\n' +
            `Contact me:  ${answers.email}`,
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
