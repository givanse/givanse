/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberApp({
  name: require('./package.json').name,

  // for some large projects, you may want to uncomment this (for now)
  es3Safe: true,

  minifyCSS: {
    enabled: true,
    options: {}
  },
  
  fingerprint: {
    exclude: ['posts_templates'],
  },

  getEnvJSON: require('./config/environment')
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import({
  development: 'vendor/ember-data/ember-data.js',
  production:  'vendor/ember-data/ember-data.prod.js'
}, {
  exports: {
    'ember-data': [
      'default'
    ]
  }
});

app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  exports: {
    'ic-ajax': [
      'default',
      'defineFixture',
      'lookupFixture',
      'raw',
      'request',
    ]
  }
});

app.import({
  development: 'vendor/bootstrap/css/bootstrap-theme.css',
  production: 'vendor/bootstrap/css/bootstrap-theme.min.css'
});

app.import({
  development: 'vendor/bootstrap/css/bootstrap.css',
  production: 'vendor/bootstrap/css/bootstrap.min.css'
});

app.import('vendor/SyntaxHighlighter/pkg/styles/shCoreDefault.css');
app.import('vendor/SyntaxHighlighter/pkg/scripts/shCore.js');
app.import('vendor/SyntaxHighlighter/pkg/scripts/shBrushJScript.js');
app.import('vendor/SyntaxHighlighter/pkg/scripts/shBrushBash.js');
app.import('vendor/SyntaxHighlighter/pkg/scripts/shBrushDiff.js');
app.import('vendor/SyntaxHighlighter/pkg/scripts/shBrushRuby.js');

app.import('vendor/fontello/css/fontello.css');
app.import('vendor/fontello/css/fontello-codes.css');
app.import('vendor/fontello/css/fontello-embedded.css');

var fontAssets = pickFiles('vendor/fontello/font', {
   srcDir: '/',
   files: ['fontello.eot',
           'fontello.svg',
           'fontello.ttf', 
           'fontello.woff'],
   destDir: '/font'
});

module.exports = mergeTrees([app.toTree(), fontAssets]);

/*EOF*/
