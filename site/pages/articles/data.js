var articlesList = require('../../articles-list.js');

module.exports = function () {
  return {articlesList: articlesList};
  //return articlesList; Do not do this, turns it into a dynamic pages generator 
};
