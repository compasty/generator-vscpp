'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the marvelous ${chalk.red('generator-vscpp')} generator!`
      )
    );

    const prompts = [
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
    ];

    this.answers = await this.prompt(prompts);
  }

  writing() {
    const includeLibs = [];
    const libCmakeFiles = [];
    if (this.answers.libs && this.answers.libs.length > 0) {
      for (const lib of this.answers.libs) {
        includeLibs.push(`include(${lib})`);
        libCmakeFiles.push(`cmake/${lib}.cmake`);
      }
    }
    this.fs.copyTpl(
      this.templatePath('CMakeLists.txt'),
      this.destinationPath('CMakeLists.txt'),
      {includeLibs: includeLibs.join('\n')}
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('cmake/GoogleTest.cmake'),
      this.destinationPath('cmake/GoogleTest.cmake')
    );
    this.fs.copy(
      this.templatePath('include/'),
      this.destinationPath('include/')
    );
    this.fs.copy(
      this.templatePath('src/'),
      this.destinationPath('src/')
    );
    this.fs.copy(
      this.templatePath('tests/'),
      this.destinationPath('tests/')
    );
    for (const cmakeFile of libCmakeFiles) {
      this.fs.copy(
        this.templatePath(cmakeFile),
        this.destinationPath(cmakeFile)
      );
    }
  }
};
