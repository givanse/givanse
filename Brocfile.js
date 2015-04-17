var concatenate = require('broccoli-concat'),
    mergeTrees  = require('broccoli-merge-trees'),
    pickFiles   = require('broccoli-static-compiler'),
    uglifyCss = require('broccoli-more-css'),
    htmlMin = require('broccoli-htmlmin'),
    cssLint = require('broccoli-csslint'),
    uncss = require('broccoli-uncss'),
    env = require('broccoli-env').getEnv(),
    root = '.';

/*******************************************************************************
 * CSS
 ******************************************************************************/
var vendorCss = concatenate(root, {
                  inputFiles : ['node_modules/bootstrap/dist/css/bootstrap.css',
                                'assets/fontello/css/fontello.css'],
                  outputFile : '/vendor.css'
                });

//TODO: lint app css
//appCss = cssLint(appCss);

//TODO: uncss
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
 * IMAGES 
 ******************************************************************************/
var appImg = pickFiles(root, {
  srcDir  : 'assets/img/',
  files   : ['**/*.png'],
  destDir : '/static/img'
});

/*******************************************************************************
 * FONTS 
 ******************************************************************************/
var fFonts = pickFiles(root, {
  srcDir  : 'assets/fontello/font',
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

    //TODO: minify HTML
    //appHtml = htmlMin(appHtml, {
    //    conditionals: true // IE conditionals 
    //});
}

var Site = require('broccoli-taco');
var site = new Site();

// merge HTML, JavaScript and CSS trees into a single tree and export it
module.exports = mergeTrees([site.toTree(), vendorCss, fFonts, appImg]);
