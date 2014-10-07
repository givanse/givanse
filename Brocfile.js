/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  fingerprint: {
    exclude: ['posts']
  }
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

// Bootstrap
app.import({
  development: 'vendor/bootstrap/css/bootstrap-theme.css',
  production: 'vendor/bootstrap/css/bootstrap-theme.min.css'
});

app.import({
  development: 'vendor/bootstrap/css/bootstrap.css',
  production: 'vendor/bootstrap/css/bootstrap.min.css'
});

// Syntax Highlighter
app.import('bower_components/SyntaxHighlighter/pkg/styles/shCoreDefault.css');
app.import('bower_components/SyntaxHighlighter/pkg/scripts/shCore.js');
app.import('bower_components/SyntaxHighlighter/pkg/scripts/shBrushJScript.js');
app.import('bower_components/SyntaxHighlighter/pkg/scripts/shBrushBash.js');
app.import('bower_components/SyntaxHighlighter/pkg/scripts/shBrushDiff.js');
app.import('bower_components/SyntaxHighlighter/pkg/scripts/shBrushRuby.js');

// Fonts
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
app.import('vendor/fontello/css/fontello.css');
app.import('vendor/fontello/css/fontello-codes.css');
app.import('vendor/fontello/css/fontello-embedded.css');
var fontAssets = pickFiles('vendor/fontello/font', {
   srcDir: '/',
   files: ['fontello.svg',
           'fontello.woff'],
   destDir: '/font'
});

module.exports = mergeTrees([app.toTree(), fontAssets]);

/*EOF*/
