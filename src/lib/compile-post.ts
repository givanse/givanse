import marked from 'marked';
import fs from 'fs';
import highlightJs from 'highlight.js';

// marked options
const highlight = function(code) {
  return highlightJs.highlightAuto(code).value;
};

const renderer = new marked.Renderer();
renderer.heading = function(text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + ' id="'+escapedText+'">' +
           '<a class="header_link" name="' + escapedText + '" href="#' + escapedText + '">'+
             '<i class="icon-link"></i>' +
           '</a>' + text + 
         '</h' + level + '>';
};

marked.setOptions({
  highlight: highlight, 
  renderer: renderer
});

export default function compilePost(input: string) {
  //const input = fs.readFileSync(filePath).toString();
  return marked(input.trim());
}