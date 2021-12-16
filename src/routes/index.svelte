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

<div class="mx-auto w-post">
  {#each postsList as post}
    {#if !post.draft}

      <a href={post.url}>
        <div class="article">
          <span class="c-primary-4 bg-secondary-2-1 pl-4 pr-2 -ml-4">
            {post.title}
          </span>
          {#if post.external}
            <i class="icon-link-ext text-pale-gold text-2xl"></i>
          {/if}

          <div class="c-primary-3">
            {post.description}
          </div>
        </div>
      </a>
      <hr>

    {/if}
  {/each}
</div>