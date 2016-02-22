'use strict';

const inquirer = require('inquirer');
const createFile = require('./helpers/create-file');

var config = {
  answers: [{
    type: 'input',
    name: 'name',
    message: 'Nome do seu controller  ( ex: saleContract )'
  }, {
    type: 'input',
    name: 'path',
    message: 'Folder do seu controller ( ex: sale/contract )'
  }],
  type : 'Controller',
  template: './lib/templates/controller/controller.js',
  templateTest: './lib/templates/controller/controllerTest.js'
};

function controller() {
  inquirer.prompt(config.answers, function(data) {
    if (data.name && data.path) {
      createFile(config , data);
    } else {
      console.error('ERROR: O NOME e o PATH são obrigatórios');
    }
  });
}

module.exports.create = controller;
