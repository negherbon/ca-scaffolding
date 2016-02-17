'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const paths = require('./helpers/paths');

const pathQuestion = [{
  type: 'input',
  name: 'caPath',
  message: 'Qual o caminho do seu projeto ContaAzul? ( ex: ~/Code/ContaAzul )'
}];

const controllerQuestions = [{
  type: 'input',
  name: 'name',
  message: 'Nome do seu controller ( ex: saleContract )'
},{
  type: 'input',
  name: 'path',
  message: 'Folder do seu controller ( ex: sale/contract )'
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
    return controller();
  } else {
    inquirer.prompt(pathQuestion, questionsAnswered(data));
  }
});

function controller() {
  inquirer.prompt(controllerQuestions, function(data){

      if( data.name && data.path ){
        createController(data);
        createControllerTest(data);
      } else {
        console.error('ERROR: O nome e o path do controller são obrigatórios');
      }
  });
}

function createController(data){

  var newPath = paths.webapp + data.path;
  var newFile = newPath + '/' + data.name + 'Controller.js';

  fs.readFile('./lib/templates/controller.js', 'utf8', function(err, resp ) {

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
      console.log('Controller: ' + newFile);
    });


  });

}

function createControllerTest(data){

  var newPath = paths.test + data.path;
  var newFile = newPath + '/' + data.name + 'Controller.js';

  fs.readFile('./lib/templates/controllerTest.js', 'utf8', function(err, resp ) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = replaceAll(buffer, "#CONTROLLER_TEST_PATH#", data.path);
    fileData = replaceAll(fileData, "#CONTROLLER_TEST_NAME#", data.name);


    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }

    fs.writeFile(newFile, fileData, function(err) {
      if (err)
        return console.error(err);
      console.log('ControllerTest: ' + newFile);
    });


  });

}

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


/*

function createControllerTest() {

  var filePath = PATH.test + '/' + process.env.npm_config_name + 'ControllerTest.js'

  fs.readFile('./lib/templates/controllerTest.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    fileControllerData = data;
    fileControllerOut = replaceAll(fileControllerData, "#CONTROLLER_TEST_PATH#", process.env.npm_config_path);
    fileControllerOut = replaceAll(fileControllerOut, "#CONTROLLER_TEST_NAME#", process.env.npm_config_name);

    if (!fs.existsSync(PATH.test)) {
      fs.mkdirSync(PATH.test);
    }

    fs.writeFile(filePath, fileControllerOut, function(err) {
      if (err)
        return console.log(err);
      console.log('ControllerTest: ' + filePath);
    });

  });

}

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function init() {
  createController();
  createControllerTest();
}

init();

*/
