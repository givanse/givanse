<script lang="ts">
  import Spinner from "$lib/Spinner/index.svelte";

  export let post: Post;

  $: href = post.external ?
            post.externalUrl :
            "/" + post.fileName;

  let isLoading = false;

  function getDomain(url: string): string {
    return url.match(/^https?:\/\/[a-zA-Z0-9-.]*/)[0];
  }
</script>

<a href={href}
   class="block relative"
   on:click={() => isLoading = true}>

  <div class="article {isLoading ? 'opacity-10' : ''}">

    <span class="c-primary-4 bg-secondary-2-1 pl-4 pr-2 -ml-4">
      {post.title}
    </span>

    {#if post.external}
      <i class="icon-link-ext text-pale-gold text-2xl"
         title={getDomain(post.externalUrl)}></i>
      <br>
      <span class="text-xs">
        {getDomain(post.externalUrl)}
      </span>
    {/if}

    <div class="c-primary-3">
      {post.description}
    </div>

    <p class="text-right text-sm my-2 c-primary-2">
      {post.keywords}
    </p>
  </div>

  {#if isLoading}
    <div class="absolute inset-1/2">
      <Spinner></Spinner>
    </div>
  {/if}
</a>