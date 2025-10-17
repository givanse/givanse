import { error } from '@sveltejs/kit';
import postsList from '../../posts-list'; // Your posts data
import compilePost from "$lib/compile-post";

export const prerender = true;

export const entries = () => {
  const validEntries = postsList
    .filter(post => post.fileName && post.fileName.trim() !== '') // ✅ Filter empty slugs
    .map(post => ({
      slug: post.fileName.trim() // ✅ Trim whitespace
    }));

  console.log('Valid entries:', validEntries.length, 'from', postsList.length);
  console.log('Sample slugs:', validEntries.slice(0, 5).map(e => e.slug));
  
  return validEntries;
};

export async function load({ params }) {
  const { slug } = params;
  
  const post = postsList.find(p => p.fileName === slug);
  if (!post) {
    throw error(404, `Post not found: ${slug}`);
  }
  
  // Load and compile post content
  const markdown = await import(`$posts/${slug}.md?raw`);
  const body = compilePost(markdown.default);
  
  debugger;
  return {
    post: { ...post, body }
  };
}