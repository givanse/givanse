<svelte:head>
  <title>Posts :: Gastón</title>
  <style src="../less/index.less"></style>
</svelte:head>

<script context="module" lang="ts">
  import postsList from "../../static/posts-markdown/list";
  import PostsListItem from "$lib/PostsListItem/index.svelte";

  export const prerender = true;
</script>

<div class="mx-auto w-post">
  {#each postsList as post}
    {#if !post?.draft}
      <PostsListItem post={post}></PostsListItem>
      <hr>
    {/if}
  {/each}
</div>