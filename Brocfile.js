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

var appCss = compileLess(root, 'site/css/app.less',
                               '/app.css');
appCss = cssLint(appCss);

/*******************************************************************************
 * CSS
 ******************************************************************************/
var vendorCss = concatenate(root, {
                  inputFiles : ['node_modules/bootstrap/dist/css/bootstrap.css',
                                'assets/fontello/css/fontello.css',
                                'node_modules/highlight.js/styles/mono-blue.css'],
                  outputFile : '/vendor.css'
                });

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

/*******************************************************************************
 * FONTS 
 ******************************************************************************/
var fontelloFonts = funnel('assets/fontello/font/', {
  files   : ['fontello.woff',
             'fontello.ttf'],
  destDir : '/font'
});

/*******************************************************************************
 * PRODUCTION 
 ******************************************************************************/
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

var Site = require('broccoli-taco');
var site = new Site();
var appTree = site.toTree();

module.exports = mergeTrees([appTree, vendorCss, appCss, fontelloFonts]);
