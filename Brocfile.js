var concatenate = require('broccoli-concat');
var mergeTrees  = require('broccoli-merge-trees');
var funnel = require('broccoli-funnel');
var uglifyCss = require('broccoli-more-css');
var htmlMin = require('broccoli-htmlmin');
var cssLint = require('broccoli-csslint');
var uncss = require('broccoli-uncss');
var env = require('broccoli-env').getEnv();
var compileLess = require('broccoli-less-single');
var root = '.';

var metaFiles = funnel(root, {
  files   : ['robots.txt', 'favicon.ico']
});

var fontelloFonts = funnel('assets/fontello/font/', {
  files   : ['fontello.woff2',
             'fontello.woff',
             'fontello.ttf'],
  destDir : '/font'
});

var appCss = compileLess(root, 'site/css/app.less',
                               '/app.css');
appCss = cssLint(appCss);

var vendorCss = concatenate(root, {
                  inputFiles : ['node_modules/bootstrap/dist/css/bootstrap.css',
                                'assets/fontello/css/fontello.css',
                                'node_modules/highlight.js/styles/mono-blue.css'],
                  outputFile : '/vendor.css'
                });

var Site = require('broccoli-taco');
var site = new Site();
var appTree = site.toTree();

/*
var uncssOptions = { html: ['./index.html'],
                     ignore: [// navbar
                              '.navbar-default .navbar-nav > .active > a',
                              // collapse
                              '.collapse.in',
                              '.navbar-collapse.in',
                              '.collapsing']};
vendorCss = uncss(vendorCss, uncssOptions);
appCss = uncss(appCss, uncssOptions);
*/

if ( env === 'production' ) {
  //TODO: http://stackoverflow.com/questions/27640161
  //vendorCss = mergeTrees([vendorCss, appCss]);
  vendorCss = uglifyCss(vendorCss, {radical: false});
  appCss = uglifyCss(appCss, {radical: false});

  //TODO: minify HTML
  //appHtml = htmlMin(appHtml, {
  //    conditionals: true // IE conditionals 
  //});
}

module.exports = mergeTrees([appTree, vendorCss, appCss, fontelloFonts, metaFiles]);
