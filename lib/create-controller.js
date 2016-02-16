#! /usr/bin/env node
var fs = require('fs');

var PATH = {
  app: '/home/thiagogodoy/Code/ContaAzul/contaazul-app-boot/src/main/webapp/app/',
  controller: '/home/thiagogodoy/Code/ContaAzul/contaazul-app-boot/src/main/webapp/app/' + process.env.npm_config_path,
  test: '/home/thiagogodoy/Code/ContaAzul/contaazul-app-boot/src/test/js/' + process.env.npm_config_path
};

function createController() {

  var filePath = PATH.controller + '/' + process.env.npm_config_name + 'Controller.js'

  fs.readFile('./lib/templates/controller.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    fileControllerData = data;
    fileControllerOut = fileControllerData.replace("#CONTROLLER_NAME#", process.env.npm_config_name);

    if (!fs.existsSync(PATH.controller)) {
      fs.mkdirSync(PATH.controller);
    }

    fs.writeFile(filePath, fileControllerOut, function(err) {
      if (err)
        return console.log(err);
      console.log('Controller: ' + filePath);
    });

  });

}

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
