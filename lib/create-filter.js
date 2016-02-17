'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const paths = require('./helpers/paths');

const pathQuestion = [{
  type: 'input',
  name: 'caPath',
  message: 'Qual o caminho do seu projeto ContaAzul? ( ex: /home/{#YOUR_USER#}/Code/ContaAzul/ )'
}];

const filterQuestions = [{
  type: 'input',
  name: 'name',
  message: 'Nome do seu filtro ( ex: statusLabel )'
},{
  type: 'input',
  name: 'path',
  message: 'Folder do seu filtro ( ex: sale/status )'
}];

const questionsAnswered = data => {
  return answers => {
    data.CA_PATH = path.relative(__dirname, answers.caPath);
    fs.writeFile('./config.json', JSON.stringify(data), err => {
      if (err) throw err;
    });
  };
}

fs.readFile('./config.json', function(err, data) {
  data = (data && JSON.parse(data)) || {};

  if (data.CA_PATH) {
    console.log('CA_PATH');
    return filter();
  } else {
    inquirer.prompt(pathQuestion, questionsAnswered(data));
  }
});

function filter() {
  inquirer.prompt(filterQuestions, function(data){

      if( data.name && data.path ){
        createFilter(data);
        createFilterTest(data);
      } else {
        console.error('ERROR: O nome e o path do filtro são obrigatórios');
      }
  });
}

function createFilter(data){

  var newPath = paths.webapp + data.path;
  var newFile = newPath + '/' + data.name + 'Filter.js';

  fs.readFile('./lib/templates/filter.js', 'utf8', function(err, resp ) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = buffer.replace("#FILTER_NAME#", data.name);


    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }

    fs.writeFile(newFile, fileData, function(err) {
      if (err)
        return console.error(err);
      console.log('Controller: ' + newFile);
    });


  });

}

function createFilterTest(data){

  var newPath = paths.test + data.path;
  var newFile = newPath + '/' + data.name + 'FilterTest.js';

  fs.readFile('./lib/templates/filterTest.js', 'utf8', function(err, resp ) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = replaceAll(buffer, "#FILTER_TEST_PATH#", data.path);
    fileData = replaceAll(fileData, "#FILTER_TEST_NAME#", data.name);


    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }

    fs.writeFile(newFile, fileData, function(err) {
      if (err)
        return console.error(err);
      console.log('FilterTest: ' + newFile);
    });


  });

}

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
