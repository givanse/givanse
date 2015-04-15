var path = require('path');
var fs = require('fs');

var articles = [
  {
    filename: 'ember-i-choose-you',
    title: 'Why I use Ember.js?',
    created: '31/Mar/2015',
    updated: '',
    description: 'Putting asfilenamee technical aspects, what is good about Ember.js?'
  },
  {
    filename: 'mvc-past-present-and-future',
    title: 'MVC past, present and future.',
    created: '07/Aug/2014',
    updated: '',
    description: 'Untangling MVC as popular jargon, a design pattern and a family of designs.'
  },
  {
    filename: 'ember-cli-phonegap',
    title: 'Ember CLI & Phonegap',
    created: '09/Jul/2014',
    updated: '',
    description: 'Place an Ember CLI app insfilenamee Phonegap.'
  },
  {
    filename: 'ember-cli-simple-auth-devise',
    title: 'Ember CLI & ember-simple-auth-devise',
    created: '16/Jun/2014',
    updated: '20/Oct/2014',
    description: 'Authenticate to a Rails/Devise server from an Ember CLI app.'
  }
];

articles.forEach(function(article) {
  var fileName = article.filename + '.md';
  var filePath = 'site/articles-bodies/' + fileName; 
  article.body = fs.readFileSync(filePath).toString();
});

module.exports = articles;
