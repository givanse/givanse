<svelte:head>
  <PostHeadMeta post={post} />
  <style src="../less/index.less"></style>
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import { browser, dev, building } from '$app/environment';
  import type { Post } from '$lib/types';
  //import postsList from '$lib/data/posts.js'; // ✅ Fixed: Use $lib alias
  import postsList from "../posts-list";
  import PostsListItem from '$lib/PostsListItem/index.svelte';
  import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';
  import Footer from '$lib/Footer/index.svelte';
  
  let tag: RegExp | null = null;
  let filteredPosts: Post[] = postsList;
  
  // Filter drafts in production
  $: filteredPosts = postsList.filter(post => dev || !post.draft);
  
  // Reactive filtering
  $: if (tag) {
    filteredPosts = postsList.filter(p => tag.test(p.hashtags.toLowerCase()));
  }
  
  // Single updatePostsList function
  function updatePostsList(str?: string) {
    if (str) {
      tag = new RegExp(str.toLowerCase());
      return;
    }
    
    if (browser) {
      const params = new URLSearchParams(window.location.search);
      const h = params.get('h');
      tag = h ? new RegExp(h.toLowerCase()) : null;
    }
  }
  
  onMount(() => {
    if (building || !browser) return;
    
    // Initial URL check
    updatePostsList();
    
    // Listen to popstate changes
    const handlePopState = () => updatePostsList();
    window.addEventListener('popstate', handlePopState);
    
    // Cleanup
    return () => window.removeEventListener('popstate', handlePopState);
  });
  
  function handleMessage(ev: CustomEvent) {
    updatePostsList(ev.detail.tag);
  }
  
  const post: Post = {
    fileName: '',
    title: `Gastón's blog`,
    description: 'posts about web development and bitcoin',
    thumb: '/img/6th6m5jq_400x400.png'
  };
</script>

<h1 style="display: none;">{post.title}</h1>
<h2 style="display: none;">{post.description}</h2>
<ul class="w-post" itemprop="posts list">
  <li>
    {#each filteredPosts as postItem} <!-- ✅ Renamed to avoid shadowing -->
      <PostsListItem
        post={postItem}
        on:message={handleMessage}
      />
      <hr>
    {/each}
  </li>
</ul>
<Footer />