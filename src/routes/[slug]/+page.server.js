import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { error } from '@sveltejs/kit';
import postsList from '../../posts-list';
import compilePost from '$lib/compile-post';

export const prerender = true;

export function entries() {
  return postsList
    .filter((post) => post.fileName && post.fileName.trim() !== '')
    .map((post) => ({ slug: post.fileName.trim() }));
}

export async function load({ params }) {
  const { slug } = params;
  const post = postsList.find((item) => item.fileName === slug);

  if (!post) {
    throw error(404, `Post not found: ${slug}`);
  }

  let markdown;
  try {
    markdown = await readFile(
      join(process.cwd(), 'static/posts-markdown', `${slug}.md`),
      'utf-8'
    );
  } catch {
    throw error(404, `Could not load ${slug}`);
  }

  return {
    post: { ...post, body: compilePost(markdown) }
  };
}
