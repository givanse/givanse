<svelte:head>
  <title>Posts :: Gastón</title>
  <style src="../less/index.less"></style>
</svelte:head>

<script context="module" lang="ts">
  import postsList from "../../static/posts-markdown/list";

  export const prerender = true;

  function getDomain(url: string): string {
    return url.match(/^https?:\/\/[a-zA-Z0-9-.]*/)[0];
  }
</script>

<div class="mx-auto w-post">
  {#each postsList as post}
    {#if !post.draft}

      <a href={post.url}>
        <div class="article">
          <span class="c-primary-4 bg-secondary-2-1 pl-4 pr-2 -ml-4">
            {post.title}
          </span>
          {#if post.external}
            <i class="icon-link-ext text-pale-gold text-2xl"
               title={getDomain(post.url)}></i>
          {/if}

          <div class="c-primary-3">
            {post.description}
          </div>
          <p class="text-right text-sm my-2 c-primary-2">
            {post.keywords}
          </p>
        </div>
      </a>
      <hr>

    {/if}
  {/each}
</div>