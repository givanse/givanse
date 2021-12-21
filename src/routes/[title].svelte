<script context="module">
  import 'highlight.js/styles/stackoverflow-dark.css';

  import postsList from "../posts-list";
  import compilePost from "../lib/compile-post";

  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch/*, session, context */}) {
    const {title} = page.params;
    const fileName = title
    const url = '/posts-markdown/' + fileName + '.md';
		const res = await fetch(url);

    const post = postsList.filter(function(item) {
      return item.fileName === fileName;
    })[0];

    if (!post) {
      return {
        status: 500,
        error: new Error(`Could not find post: ${title}`)
      };
    }

		if (res.ok) {
			const result = {
				props: {
          post,
				}
			};
      return res.text().then(function(text) {
        result.props.post.body = compilePost(text);
        return result;
      });
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${title}. \n${res.message}`)
		};
	}

</script>

<script lang="ts">
  import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';
  import PostFooter from '$lib/PostFooter/index.svelte';

  export let post;
</script>

<svelte:head>
  <style src="../less/[title].less"></style>
  <style src="../less/post-footer.less"></style>
  <PostHeadMeta post={post}></PostHeadMeta>
</svelte:head>

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