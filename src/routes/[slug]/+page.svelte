<script lang="ts">
  import 'highlight.js/styles/stackoverflow-dark.css';
  import '../../less/[slug].less';
  import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';
  import PostFooter from '$lib/PostFooter/index.svelte';

  let { data } = $props();
  const post = $derived(data.post);
</script>

<svelte:head>
  <PostHeadMeta {post} />
</svelte:head>

<article class="mt-8 w-post">
  <header>
    <h1 id="title">
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
<PostFooter {post} />
