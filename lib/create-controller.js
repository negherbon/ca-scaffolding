'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const paths = require('./helpers/paths');
const utils = require('./helpers/utils');
const answers = [{
  type: 'input',
  name: 'name',
  message: 'Nome do seu controller ( ex: saleContract )'
}, {
  type: 'input',
  name: 'path',
  message: 'Folder do seu controller ( ex: sale/contract )'
}];

function controller() {
  inquirer.prompt(answers, function(data) {
    if (data.name && data.path) {
      createController(data);
      createControllerTest(data);
    } else {
      console.error('ERROR: O NOME e o PATH DO CONTROLLER são obrigatórios');
    }
  });
}

function createController(data) {

  var newPath = paths.webapp + data.path;
  var newFile = newPath + '/' + data.name + 'Controller.js';

  fs.readFile('./lib/templates/controller/controller.js', 'utf8', function(err, resp) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = buffer.replace("#CONTROLLER_NAME#", data.name);

    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }

    fs.writeFile(newFile, fileData, function(err) {
      if (err)
        return console.error(err);
      console.log('Controller criado: ' + newPath);
    });


  });

}

function createControllerTest(data) {

  var newPath = paths.test + data.path;
  var newFile = newPath + '/' + data.name + 'ControllerTest.js';

  fs.readFile('./lib/templates/controller/controllerTest.js', 'utf8', function(err, resp) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = utils.replaceAll(buffer, "#CONTROLLER_TEST_PATH#", path.normalize(data.path) );

    fileData = utils.replaceAll(fileData, "#CONTROLLER_TEST_NAME#", data.name);

    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }

    fs.writeFile(newFile, fileData, function(err) {
      if (err)
        return console.error(err);
      console.log('Teste criado: ' + newPath );
    });

  });

}

module.exports.create = controller;
