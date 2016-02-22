var utils = {
  escapeRegExp: function(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  },
  replaceAll: function(str, find, replace) {
    return str.replace(new RegExp(utils.escapeRegExp(find), 'g'), replace);
  }
};

module.exports = utils;
