/// <reference types="@sveltejs/kit" />

interface Post {
  draft?: boolean;

  external?: boolean;
  externalUrl?: string;

  fileName: string;
  title: string;
  description: string;
  created: string;
  updated: string;
  hashtags: string;
  thumb: string;

  /**
   * dynamically generated
   */

  body?: string;
}

declare module 'marked' {

  class Renderer {
    heading: (text: string, level: number, raw: string, slugger: Slugger) => string;

    // Not part of Marked API
    toc: any;
    appendToToc: (tocItem: TocItem, level: number) => void;
    getTocString: () => string;
  }

  function Renderer(): Renderer;

  interface MarkedOptions {
    highlight: (code: string) => string,
    renderer: Renderer,
    gfm: boolean,
  }

  function setOptions(options: MarkedOptions): void;

};
