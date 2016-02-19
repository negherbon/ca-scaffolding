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

const serviceQuestions = [{
  type: 'input',
  name: 'name',
  message: 'Nome do seu service ( ex: saleContract )'
}, {
  type: 'input',
  name: 'path',
  message: 'Folder do seu service ( ex: sale/contract )'
}];

const questionsAnswered = data => {
  return answers => {
    data.CA_PATH = answers.caPath;
    fs.writeFile('./config.json', JSON.stringify(data), err => {
      if (err) throw err;
    });
  };
}

fs.readFile('./config.json', function(err, data) {
  data = (data && JSON.parse(data)) || {};
  if (data.CA_PATH) {
    return service();
  } else {
    inquirer.prompt(pathQuestion, questionsAnswered(data));
  }
});

function service() {
  inquirer.prompt(serviceQuestions, function(data) {

    if (data.name && data.path) {
      createService(data);
      createServiceTest(data);
    } else {
      console.error('ERROR: O nome e o path do service são obrigatórios');
    }
  });
}

function createService(data) {

  var newPath = paths.webapp + data.path;
  var newFile = newPath + '/' + data.name + 'Service.js';

  fs.readFile('./lib/templates/service.js', 'utf8', function(err, resp) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = buffer.replace(/#SERVICE_NAME#/g, data.name);

    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }

    fs.writeFile(newFile, fileData, function(err) {
      if (err)
        return console.error(err);
      console.log('Service: ' + newFile);
    });


  });

}

function createServiceTest(data) {

  var newPath = paths.test + data.path;
  var newFile = newPath + '/' + data.name + 'ServiceTest.js';

  fs.readFile('./lib/templates/serviceTest.js', 'utf8', function(err, resp) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = replaceAll(buffer, "#SERVICE_TEST_PATH#", data.path);
    fileData = replaceAll(fileData, "#SERVICE_TEST_NAME#", data.name);


    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }

    fs.writeFile(newFile, fileData, function(err) {
      if (err)
        return console.error(err);
      console.log('ServiceTest: ' + newFile);
    });


  });

}

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
