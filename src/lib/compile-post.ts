import marked from 'marked';
import highlightJs from 'highlight.js';

// marked options
function highlight(code) {
  return highlightJs.highlightAuto(code).value;
};

const renderer = new marked.Renderer();
renderer.heading = function(text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + ' id="'+escapedText+'">' +
           '<a class="header_link" name="' + escapedText + '" href="#' + escapedText + '">'+
             '<i class="icon-link"></i>' +
             text +
           '</a>' +
         '</h' + level + '>';
};

marked.setOptions({
  highlight,
  renderer,
});

export default function compilePost(input: string) {
  return marked(input.trim());
}