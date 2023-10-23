'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const config = require('./config');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the marvelous ${chalk.red('generator-vscpp')} generator!`
      )
    );

    this.answers = await this.prompt(config.prompts)
  }

  writing() {
    const includeLibs = []
    const libCmakeFiles = []
    if (this.answers.libs && this.answers.libs.length > 0) {
      for (const lib of this.answers.libs) {
        includeLibs.push(`include(${lib})`)
        libCmakeFiles.push(`cmake/${lib}.cmake`)
      }
    }
    this.fs.copyTpl(
      this.templatePath('CMakeLists.txt'),
      this.destinationPath('CMakeLists.txt'),
      {
        name: this.answers.name,
        includeLibs: includeLibs.join('\n')
      }
    )
    for (const cmakeFile of libCmakeFiles) {
      this.fs.copy(
        this.templatePath(cmakeFile),
        this.destinationPath(cmakeFile)
      )
    }
    for (const file of config.filesToCopy) {
      this.fs.copy(
        this.templatePath(file.input), 
        this.destinationPath(file.output)
      )
    }
  }
};
