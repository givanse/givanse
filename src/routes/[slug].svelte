<svelte:head>
  <style src="../less/layout.less"></style>
  <style src="../less/[slug].less"></style>
  <PostHeadMeta post={post}></PostHeadMeta>
</svelte:head>

<script context="module">
  import 'highlight.js/styles/stackoverflow-dark.css';

  import postsList from "../posts-list";
  import compilePost from "../lib/compile-post";
	import Footer from '$lib/Footer/index.svelte';

  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch/*, session, context */}) {
    const {slug} = page.params;
    const fileName = slug; 
    const url = '/posts-markdown/' + fileName + '.md';

    const post = postsList.filter(function(item) {
      return item.fileName === fileName;
    })[0];

    if (!post) {
      return {
        status: 500,
        error: new Error(`Could not find post: ${fileName}`)
      };
    }

		const res = await fetch(url);

		if (res.ok) {
			const result = {
				props: {
          post,
				}
			};

      result.props.post.body = await res.text().then(compilePost);

      return result;
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${fileName}. \n${res.message}`)
		};
	}

</script>

<script lang="ts">
  import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';
  import PostFooter from '$lib/PostFooter/index.svelte';

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
