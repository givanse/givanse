<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
  import postsList from "../../static/posts-markdown/list";
</script>

<style src="../less/index.less"></style>

<svelte:head>
	<title>Posts :: Gastón</title>
  <style>html > div ~ div:last-of-type { display: none !important }</style>
</svelte:head>

{#each postsList as post} 
  {#if !post.draft}
    <div class="row article">

      <div class="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8">
        <a href="/{post.filename}">
          <span>{post.title}</span>
          <br>
          <summary class="article_description">{post.description}</summary>
        </a>

        <hr>
      </div>

    </div>
  {/if}
{/each}
