/* eslint-disable prettier/prettier */
module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname
        },
        {
            type: 'checkbox',
            name: 'libs',
            message: 'Which libs do you want to add in this project?',
            choices: [
                {
                    name: 'benchmark',
                    value: 'benchmark'
                },
                {
                    name: 'fmt',
                    value: 'fmt'
                },
                {
                    name: 'spdlog',
                    value: 'spdlog'
                },
                {
                    name: 'json',
                    value: 'nlohmann_json'
                },
                {
                    name: 'yaml',
                    value: 'yaml-cpp'
                }
            ]
        }
    ],
    filesToCopy: [
        {
            input: 'gitignore.txt',
            output: '.gitignore'
        },
        {
            input: 'src/',
            output: 'src/'
        },
        {
            input: 'include/',
            output: 'include/'
        },
        {
            input: 'tests/',
            output: 'tests/'
        },
        {
            input: 'cmake/GoogleTest.cmake',
            output: 'cmake/GoogleTest.cmake'
        }
    ]
}
