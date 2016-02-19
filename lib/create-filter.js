'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const paths = require('./helpers/paths');

const filterQuestions = [{
  type: 'input',
  name: 'name',
  message: 'Nome do seu filtro ( ex: statusLabel )'
}, {
  type: 'input',
  name: 'path',
  message: 'Folder do seu filtro ( ex: sale/status )'
}];

function filter() {
  inquirer.prompt(filterQuestions, function(data) {
    if (data.name && data.path) {
      createFilter(data);
      createFilterTest(data);
    } else {
      console.error('ERROR: O nome e o path do filtro são obrigatórios');
    }
  });
}

function createFilter(data) {

  var newPath = paths.webapp + data.path;
  var newFile = newPath + '/' + data.name + 'Filter.js';

  fs.readFile('./lib/templates/filter/filter.js', 'utf8', function(err, resp) {

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

function createFilterTest(data) {

  var newPath = paths.test + data.path;
  var newFile = newPath + '/' + data.name + 'FilterTest.js';

  fs.readFile('./lib/templates/filter/filterTest.js', 'utf8', function(err, resp) {

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

module.exports.create = filter;
