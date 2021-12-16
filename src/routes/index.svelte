<svelte:head>
  <title>Posts :: Gastón</title>
  <style src="../less/index.less"></style>
</svelte:head>

<script context="module" lang="ts">
  import rawPostsList from "../../static/posts-markdown/list";
  import PostsListItem from "$lib/PostsListItem/index.svelte";
  import { dev } from "$app/env";

  export const prerender = true;

  let postsList = rawPostsList.map(function(post) {
    if (!dev && post.draft) {
      return;
    }

    if (!post.external) {
      post.url = '/' + post.filename;
    }

    return post;
  });
</script>

<div class="mx-auto w-post">
  {#each postsList as post}
    <PostsListItem post={post}></PostsListItem>
    <hr>
  {/each}
</div>