import { Renderer, setOptions, parse } from 'marked';
import highlightJs from 'highlight.js';

// marked options
function highlight(code: string): string {
  return highlightJs.highlightAuto(code).value;
}

interface TocItem {
  text: string;
  slug: string;
}

type TocItemList = Array<TocItem | Array<TocItem>>;

function tocToString(toc: TocItemList): string {
  if (!toc || !toc.length) {
    return '';
  }

  let str = '<ol>';

  for (let i = 0; i < toc.length; i++) {
    const obj = toc[i];

    if (Array.isArray(obj)) {
      str += tocToString(obj);
    } else {
      const {text, slug} = obj;
      str += `<li><a href="#${slug}">${text}</a></li>`;
    }
  }

  return str + '</ol>';
}

function getLastArray(arr: TocItemList): TocItemList {
  let lastItem: TocItem | TocItemList = arr[arr.length - 1];

  if (!arr.length || !Array.isArray(lastItem)) {
    lastItem = [];
    // @ts-ignore
    arr.push(lastItem);
  }

  return lastItem;
}

Renderer.prototype.appendToToc = function(tocItem: TocItem, level: number): void {
  if (level === 1) {
    this.toc.push(tocItem);
    return;
  }

  let lastArray = getLastArray(this.toc);
  for (let i = 0; i < level - 2; i++) {
    lastArray = getLastArray(lastArray);
  }

  lastArray.push(tocItem);
}

Renderer.prototype.getTocString = function(): string {
  return tocToString(this.toc);
}

Renderer.prototype.toc = [];

const renderer = new Renderer();

renderer.heading = function(text: string, level: number, raw: string, slugger: Slugger): string {
  const slug = slugger.slug(text);
  this.appendToToc({text, slug}, level);

  //const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + ' id="'+slug+'">' +
           '<a class="header_link" name="' + slug + '" href="#' + slug + '">'+
             '<i class="icon-link"></i>' +
             text +
           '</a>' +
         '</h' + level + '>';
};

setOptions({
  highlight,
  renderer,
  gfm: true,
});

export default function compilePost(input: string): string {
  // @ts-ignore
  let post = parse(input.trim());

  const toc = renderer.getTocString();
  renderer.toc = [];

  if (!toc) {
    return post;
  }

  post = '<div class="post-toc">' + toc + '</div>' + post;

  return post;
}