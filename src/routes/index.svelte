<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
  import postsList from "../../static/posts-markdown/list";
</script>

<svelte:head>
  <title>Posts :: Gastón</title>
  <style src="../less/index.less"></style>
</svelte:head>

<div class="p-8 sm:w-full md:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-6/12">
  {#each postsList as post}
    {#if !post.draft}

      <a href="/{post.filename}">
        <div class="article">
          <span class="c-primary-4 bg-secondary-2-1 bandaid-px-4 -bandaid-ml-4">
            {post.title}
          </span>

          <div class="c-primary-3">
            {post.description}
          </div>
        </div>
      </a>
      <hr>

    {/if}
  {/each}
</div>

<style>
  .bandaid-px-4 {
    padding: 0 1rem;
  }
  .-bandaid-ml-4 {
    margin-left: -1rem;
  }
</style>