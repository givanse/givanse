<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/stackoverflow-dark.min.css">
  <style src="../less/layout.less"></style>
  <style src="../less/[slug].less"></style>
  <PostHeadMeta post={post}></PostHeadMeta>
</svelte:head>

<script lang="ts">
  import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';
  import PostFooter from '$lib/PostFooter/index.svelte';
  import Footer from '$lib/Footer/index.svelte';
  
  // Get data from load function (no longer in props)
  //export let data;
  export let post: Post;
</script>

<article class="mt-8 w-post">
  <header class="">
    <h1>
      <a href="#title">
        {post.title}
      </a>
    </h1>
  </header>
  <section class="w-full">
    <p>
      {post.description}
    </p>
    {@html post.body}
  </section>
</article>
<PostFooter post={post}></PostFooter>
<Footer />