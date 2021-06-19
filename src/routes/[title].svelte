<script context="module">
  import postsList from "../../static/posts-markdown/list";
  import compilePost from "../lib/compile-post";

  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
    const {title} = page.params;
    const url = '/posts-markdown/' + title + '.md';
		const res = await fetch(url);

    let post = postsList.filter(function(item) {
      return item.url === '/' + title;
    });
    post = post.length ? post [0] : null;

		if (res.ok) {
			const result = {
				props: {
          post,
				}
			};
      return res.text().then(function(text) {
        result.props.post.body = compilePost(text);
        return result;
      });
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${title}`)
		};
	}

</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';

  export let post;

  let article;

  onMount(async () => {
    article.innerHTML += post.body;
  });
</script>

<style src="../less/article.less"></style>

<svelte:head>
  <PostHeadMeta post={post}></PostHeadMeta>
</svelte:head>

<article bind:this={article}>
  <h1>
    {post.title}
  </h1>
</article>