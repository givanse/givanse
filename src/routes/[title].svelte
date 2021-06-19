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
  import { onMount } from 'svelte';
  import PostHeadMeta from '$lib/PostHeadMeta/index.svelte';
  //import SharedButtons from '$lib/ShareButtons/index.svelte';
  import DisqusComments from '$lib/DisqusComments/index.svelte';

  export let post;

  let articleBody;

  onMount(async () => {
    articleBody.innerHTML += post.body;
  });
</script>

<style src="../less/article.less"></style>

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
    <div class="col-xs-12" bind:this={articleBody}>
      <p>
        {post.description}
      </p>

      <!-- post.body will be inserted here -->
    </div>
  </section>

  <br>

  <footer>
    <div class="row row_max_w">
      <div class="col-xs-8 col-sm-10 text-right">
        <abbr title="Gast&oacute;n Iv&aacute;n Silva Echegaray">Gast&oacute;n I. Silva</abbr><br>
        <a href="https://twitter.com/givanse" class="twitter-follow-button" data-show-count="false">Follow @givanse</a>
        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
      </div>

      <div class="col-xs-4 col-sm-2">
        <img src="/givanse.png" class="img-responsive avatar">
      </div>
    </div>

    <div class="row row_max_w">
      <br>
      <hr>

      <div class="col-xs-12">
        <!--SharedButtons></SharedButtons-->
      </div>

      <hr class="clearfix">

      <div class="col-xs-12">
        <DisqusComments slug={post.filename}></DisqusComments>
      </div>
    </div>
  </footer>

</article>