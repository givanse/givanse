var Handlebars = require('handlebars');
var marked = require('marked');
var fs = require('fs');
var path = require('path');

// marked options
var highlight = function(code) {
  return require('highlight.js').highlightAuto(code).value;
};

var renderer = new marked.Renderer();
renderer.heading = function(text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + ' id="'+escapedText+'" class="header_padding">' +
           '<a name="' + escapedText + '" class="" href="#' + escapedText + '">'+
             '<i class="icon-link"></i>' +
           '</a>' + text + 
         '</h' + level + '>';
};

marked.setOptions({
  highlight: highlight, 
  renderer: renderer
});

module.exports = function(value) {
  var input;
  if ('string' === typeof value) {
    var filePath = path.join('site/articles-bodies/', value) + '.md';
    input = fs.readFileSync(filePath).toString();
  } else if ('object' === typeof value) {
    input = value.fn(this);
  }

  return new Handlebars.SafeString(marked(input.trim()));
}
