'use strict';

const inquirer = require('inquirer');
const createFile = require('./helpers/create-file');

var config = {
  answers: [{
    type: 'input',
    name: 'name',
    message: 'Nome do seu serviço  ( ex: saleContract )'
  }, {
    type: 'input',
    name: 'path',
    message: 'Folder do seu serviço ( ex: sale/contract )'
  }],
  type : 'Service',
  template: './lib/templates/service/service.js',
  templateTest: './lib/templates/service/serviceTest.js'
};

function service() {
  inquirer.prompt(config.answers, function(data) {
    if (data.name && data.path) {
      createFile(config , data);
    } else {
      console.error('ERROR: O NOME e o PATH são obrigatórios');
    }
  });
}

module.exports.create = service;
