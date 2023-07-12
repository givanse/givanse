<svelte:head>
  <PostHeadMeta post={post}></PostHeadMeta>
  <style src="../less/index.less"></style>
</svelte:head>

<script lang="ts">
  import {onMount} from "svelte";
  import { browser, prerendering } from '$app/env';
  import postsList from "../posts-list";
  import PostsListItem from "$lib/PostsListItem/index.svelte";
	import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';
	import Footer from '$lib/Footer/index.svelte';
  import { dev } from "$app/env";

  export const prerender = true; //TODO: needed?

  onMount(function() {
    if (!browser || prerendering) {
      return;
    }

    //TODO: UGH!! find a better way to observe location changes
    //      only needed for the root (/) navigation 
    setInterval(() => {
      updatePostsList();
    }, 100);

    updatePostsList();
  });

  for (let i = 0; i < postsList.length; i++) {
    const post = postsList[i];

    if (!dev && post.draft) {
      postsList.splice(i--, 1);
    }
  }

  let tag = null;
  let filteredPosts = postsList;
  $: if (tag) {
    filteredPosts = postsList.filter(p => {
      return tag.test(p.hashtags.toLocaleLowerCase());
    });
  } else {
    filteredPosts = postsList;
  }

  function handleMessage(ev) {
    console.log(`hangleMessage ` + ev.detail.tag);
    updatePostsList(ev.detail.tag);
  }

  function updatePostsList(str) {
    if (str) {
      str = str.toLocaleLowerCase();
      tag = new RegExp(str);
      return;
    }
    
    const params = new URLSearchParams(window.location.search);
    const h = params.get("h");
    if (h) {
      tag = new RegExp(h.toLocaleLowerCase());
      return;
    }

    tag = null; // no filter
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
    {#each filteredPosts as post}
      <PostsListItem post={post}
                     on:message={handleMessage}></PostsListItem>
      <hr>
    {/each}
  </li>
</ul>

<Footer />