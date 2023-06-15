<svelte:head>
  <PostHeadMeta post={post}></PostHeadMeta>
  <style src="../less/index.less"></style>
</svelte:head>

<script context="module" lang="ts">
  import postsList from "../posts-list";
  import PostsListItem from "$lib/PostsListItem/index.svelte";
	import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';
	import Footer from '$lib/Footer/index.svelte';
  import { dev } from "$app/env";

  export const prerender = true;

  for (let i = 0; i < postsList.length; i++) {
    const post = postsList[i];

    if (!dev && post.draft) {
      postsList.splice(i--, 1);
    }
  }

  const post: Post = {
    fileName: '',
    title: 'Gastón\'s blog',
    description: "posts about web development and bitcoin",
    thumb: '/img/6th6m5jq_400x400.png'
  };

</script>

<h1 style="display: none;">{post.title}</h1>
<h2 style="display: none;">{post.description}</h2>

<ul class="w-post" itemprop="posts list">
  <li>
    {#each postsList as post}
      <PostsListItem post={post}></PostsListItem>
      <hr>
    {/each}
  </li>
</ul>

<Footer />