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
  keywords: string; // meta keywords
  hashtags: string; // social media hash tags
  thumb: string;

  /**
   * dynamically generated
   */

  body?: string;
}

declare module 'marked' {

  class Renderer {
    heading: (text: string, level: string) => string;
  }

  function Renderer(): Renderer;

  interface MarkedOptions {
    highlight: (code: string) => string,
    renderer: Renderer
  }

  function setOptions(options: MarkedOptions): void;

};
