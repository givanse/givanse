<script context="module">
  import 'highlight.js/styles/stackoverflow-dark.css';
  import '../../assets/fontello/css/fontello.css';

  import postsList from "../../static/posts-markdown/list";
  import compilePost from "../lib/compile-post";

  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
    const {title} = page.params;
    const url = '/posts-markdown/' + title + '.md';
		const res = await fetch(url);

    let post = postsList.filter(function(item) {
      return item.url === '/' + title;
    });
    post = post.length ? post [0] : null;

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
			error: new Error(`Could not load ${title}`)
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