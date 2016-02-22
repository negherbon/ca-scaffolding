'use strict';

const inquirer = require('inquirer');
const createFile = require('./helpers/create-file');

var config = {
  answers: [{
    type: 'input',
    name: 'name',
    message: 'Nome da sua diretiva  ( ex: saleContract )'
  }, {
    type: 'input',
    name: 'path',
    message: 'Folder da sua diretiva ( ex: sale/contract )'
  }],
  type : 'Directive',
  template: './lib/templates/directive/directive.js',
  templateTest: './lib/templates/directive/directiveTest.js'
};

function directive() {
  inquirer.prompt(config.answers, function(data) {
    if (data.name && data.path) {
      createFile(config , data);
    } else {
      console.error('ERROR: O NOME e o PATH são obrigatórios');
    }
  });
}

module.exports.create = directive;
