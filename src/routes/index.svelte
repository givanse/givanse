<svelte:head>
  <title>Posts :: Gastón</title>
  <style src="../less/index.less"></style>
</svelte:head>

<script context="module" lang="ts">
  import postsList from "../posts-list";
  import PostsListItem from "$lib/PostsListItem/index.svelte";
  import { dev } from "$app/env";

  export const prerender = true;

  for (let i = 0; i < postsList.length; i++) {
    const post = postsList[i];

    if (!dev && post.draft) {
      postsList.splice(i--, 1);
    }
  }

</script>

<div class="w-post">
  {#each postsList as post}
    <PostsListItem post={post}></PostsListItem>
    <hr>
  {/each}
</div>