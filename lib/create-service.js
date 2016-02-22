'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const paths = require('./helpers/paths');
const utils = require('./helpers/utils');
const serviceQuestions = [{
  type: 'input',
  name: 'name',
  message: 'Nome do seu service ( ex: saleContract )'
}, {
  type: 'input',
  name: 'path',
  message: 'Folder do seu service ( ex: sale/contract )'
}];

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

  fs.readFile('./lib/templates/service/service.js', 'utf8', function(err, resp) {

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

  fs.readFile('./lib/templates/service/serviceTest.js', 'utf8', function(err, resp) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = utils.replaceAll(buffer, "#SERVICE_TEST_PATH#", data.path);
    fileData = utils.replaceAll(fileData, "#SERVICE_TEST_NAME#", data.name);


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

module.exports.create = service;
