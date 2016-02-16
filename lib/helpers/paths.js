'use strict';

const fs = require('fs');
const path = require('path');
const caPath = require('../../config.json');

let paths = {
  webapp: path.normalize(`${caPath.CA_PATH}/contaazul-app-boot/src/main/webapp/app/`),
  test: path.normalize(`${caPath.CA_PATH}/contaazul-app-boot/src/test/js/`)
};

module.exports = paths;
