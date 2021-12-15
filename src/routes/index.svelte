<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
  import postsList from "../../static/posts-markdown/list";
</script>

<svelte:head>
	<title>Posts :: Gastón</title>
</svelte:head>

<div class="m-auto sm:w-full md:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-6/12">
  {#each postsList as post}
    {#if !post.draft}

      <a href="/{post.filename}">
        <div class="p-2">
          <span>{post.title}</span>
          <br>
          <div class="article_description">
            {post.description}
          </div>
        </div>
      </a>
      <hr>

    {/if}
  {/each}
</div>
