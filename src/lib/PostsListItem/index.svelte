<script lang="ts">
  import Spinner from "$lib/Spinner/index.svelte";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let post: Post;

  $: href = post.external ?
            post.externalUrl :
            "/" + post.fileName;

  $: hashtagsList = post.hashtags.split(',');

  let isLoading = false;

  function getDomain(url: string): string {
    return url.match(/^https?:\/\/[a-zA-Z0-9-.]*/)[0];
  }

  function updateFilterTag(tag) {
    dispatch('message', {
			tag: tag,
		});
  }
</script>

<div class="post-list-item" itemprop="post">

  <a href={href}
     class="link {isLoading ? 'opacity-10' : ''}"
     on:click={() => isLoading = true}>

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
  </a>

  <p class="text-right text-sm my-2 c-primary-2">
    {#each hashtagsList as hashtag}
      #<a href='/?h={hashtag.trim()}'
          on:click={() => updateFilterTag(hashtag)}
          class="underline inline">
        {hashtag}
      </a>
      &nbsp;
    {/each}
  </p>

  {#if isLoading}
    <div class="absolute inset-1/2">
      <Spinner></Spinner>
    </div>
  {/if}

</div>