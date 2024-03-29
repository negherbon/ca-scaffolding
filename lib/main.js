'use strict';

const create = process.argv[2];
const configFile = './config.json';
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

function init() {
  fs.exists(configFile, (exists) => {
    if (exists)
      checkConfig();
    else
      fs.writeFile(configFile, JSON.stringify({}), 'utf8', init);
  });
}

function checkConfig() {

  const pathQuestion = [{
    type: 'input',
    name: 'caPath',
    message: 'Qual o caminho do seu projeto ContaAzul? ( ex: /home/{#YOUR_USER#}/Code/ContaAzul/ )'
  }];

  const questionsAnswered = data => {
    return answers => {
      data.CA_PATH = path.normalize(answers.caPath);
      fs.writeFile(configFile, JSON.stringify(data), 'utf8', checkConfig);
    };
  }

  fs.readFile(configFile, function(err, data) {
    data = (data && JSON.parse(data)) || {};
    if (data.CA_PATH) {
      switch (create) {
        case 'controller':
          const controller = require('./create-controller');
          controller.create();
          break;
        case 'filter':
          const filter = require('./create-filter');
          filter.create();
          break;
        case 'service':
          const service = require('./create-service');
          service.create();
          break;
        case 'directive':
          const directive = require('./create-directive');
          directive.create();
          break;
      }
    } else {
      inquirer.prompt(pathQuestion, questionsAnswered(data));
    }
  });
}

init();
