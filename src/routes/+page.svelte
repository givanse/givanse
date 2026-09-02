<script lang="ts">
  import { onMount } from 'svelte';
  import { browser, dev } from '$app/environment';
  import postsList from '../posts-list';
  import PostsListItem from '$lib/PostsListItem/index.svelte';
  import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';
  import '../less/index.less';

  const post: Post = {
    fileName: '',
    title: `Gastón's blog`,
    description: 'posts about web development and bitcoin',
    thumb: '/img/6th6m5jq_400x400.png'
  };

  let tag: RegExp | null = null;

  $: visiblePosts = postsList.filter((item) => dev || !item.draft);
  $: filteredPosts = tag
    ? visiblePosts.filter((item) => tag && tag.test((item.hashtags ?? '').toLowerCase()))
    : visiblePosts;

  function updatePostsList(str?: string) {
    if (str) {
      tag = new RegExp(str.toLowerCase());
      return;
    }

    if (!browser) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const h = params.get('h');
    tag = h ? new RegExp(h.toLowerCase()) : null;
  }

  onMount(() => {
    if (!browser) {
      return;
    }

    updatePostsList();

    const handlePopState = () => updatePostsList();
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  });

  function handleMessage(ev: CustomEvent<{ tag: string }>) {
    updatePostsList(ev.detail.tag);
  }
</script>

<svelte:head>
  <PostHeadMeta {post} />
</svelte:head>

<h1 style="display: none;">{post.title}</h1>
<h2 style="display: none;">{post.description}</h2>
<ul class="w-post" itemprop="posts list">
  <li>
    {#each filteredPosts as postItem}
      <PostsListItem post={postItem} on:message={handleMessage} />
      <hr>
    {/each}
  </li>
</ul>
