const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const paths = require('./paths');
const utils = require('./utils');

function create(config , data) {
  base(config , data);
  baseTest(config , data);
}

function base(config , data) {
  var newPath = paths.webapp + data.path;
  var newFile = newPath + '/' + data.name + config.type + '.js';

  fs.readFile(config.template, 'utf8', function(err, resp) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = buffer.replace("#NAME#", data.name);

    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }

    fs.writeFile(newFile, fileData, function(err) {
      if (err)
        return console.error(err);
      console.log(config.type + ' criado em: ' + newPath);
    });

  });

}

function baseTest(config , data) {

  var newPath = paths.test + data.path;
  var newFile = newPath + '/' + data.name + config.type + 'Test.js';

  fs.readFile(config.templateTest, 'utf8', function(err, resp) {

    if (err) {
      return console.error(err);
    }

    var buffer = resp;
    var fileData = utils.replaceAll(buffer, '#PATH#' , path.normalize(data.path) );
    fileData = utils.replaceAll(fileData, '#NAME#' , data.name);

    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }

    fs.writeFile(newFile, fileData, function(err) {
      if (err)
        return console.error(err);
      console.log( config.type + 'Test criado: ' + newPath );
    });

  });

}

module.exports = create;
