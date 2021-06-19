<script context="module">
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
  import ShareButtons from '$lib/ShareButtons/index.svelte';
  import DisqusComments from '$lib/DisqusComments/index.svelte';

  export let post;
</script>

<style src="../less/post.less"></style>

<svelte:head>
  <PostHeadMeta post={post}></PostHeadMeta>
</svelte:head>

<article>

  <header>
    <div class="row row_max_w">
      <div class="col-xs-12">
        <h1>{post.title}</h1>
      </div>
    </div>
  </header>

  <section class="row row_max_w">
    <div class="col-xs-12">
      <p>
        {post.description}
      </p>

      {@html post.body}
    </div>
  </section>

  <footer>
    <div class="row row_max_w">
      <br>
      <div class="col-xs-12 text-right">
        <span class="share_on">share on:&nbsp;</span><ShareButtons post={post}></ShareButtons>
      </div>
    </div>

    <hr class="row_max_w">

    <div class="row row_max_w">
      <div class="col-xs-12">
        <DisqusComments slug={post.filename}></DisqusComments>
      </div>
      
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src="/givanse.png" alt="Gastón's photo" class="img-responsive avatar">

      <div class="text-center name">
        <a href="https://twitter.com/givanse" class="twitter-follow-button" data-show-count="false">Follow @givanse</a>
        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
      </div>
    </div>
  </footer>

</article>