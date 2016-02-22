'use strict';

const inquirer = require('inquirer');
const createFile = require('./helpers/create-file');

var config = {
  answers: [{
    type: 'input',
    name: 'name',
    message: 'Nome do seu filtro  ( ex: saleContract )'
  }, {
    type: 'input',
    name: 'path',
    message: 'Folder do seu filtro ( ex: sale/contract )'
  }],
  type : 'Filter',
  template: './lib/templates/filter/filter.js',
  templateTest: './lib/templates/filter/filterTest.js'
};

function filter() {
  inquirer.prompt(config.answers, function(data) {
    if (data.name && data.path) {
      createFile(config , data);
    } else {
      console.error('ERROR: O NOME e o PATH são obrigatórios');
    }
  });
}

module.exports.create = filter;
