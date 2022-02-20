import marked from 'marked';
import highlightJs from 'highlight.js';

// marked options
function highlight(code: string): string {
  return highlightJs.highlightAuto(code).value;
};

const renderer = new marked.Renderer();
renderer.heading = function(text: string, level: string): string {
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

export default function compilePost(input: string): string {
  // @ts-ignore
  return marked(input.trim());
}