<svelte:head>
  <style src="../less/index.less"></style>
</svelte:head>

<script lang="ts">
  import Spinner from "$lib/Spinner/index.svelte";

  export let post: Post;

  $: href = post.external ?
            post.externalUrl :
            "/" + post.fileName;

  $: hashtagsList = post.hashtags
    .split(',')
    .map(function(string) {
      if (!string) {
        return;
      }

      return '#' + string;
    })
    .join(' ');

  let isLoading = false;

  function getDomain(url: string): string {
    return url.match(/^https?:\/\/[a-zA-Z0-9-.]*/)[0];
  }
</script>

<a href={href}
   class="post-list-item"
   on:click={() => isLoading = true}>

  <div class="article {isLoading ? 'opacity-10' : ''}" itemprop="post">

    <span class="title" itemprop="title">
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

    <div class="description" itemprop="description">
      {post.description}
    </div>

    <p class="text-right text-sm my-2 c-primary-2">
      {hashtagsList}
    </p>
  </div>

  {#if isLoading}
    <div class="absolute inset-1/2">
      <Spinner></Spinner>
    </div>
  {/if}
</a>