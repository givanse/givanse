<svelte:head>
  <style src="../less/layout.less"></style>
</svelte:head>

<script lang="ts">
	import Header from '$lib/Header/index.svelte';
  import { dev, browser, prerendering } from '$app/env';

  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({/* page, fetch, session, context */}) {
    if (dev || !browser || prerendering) {
      return;
    }

    // Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-47511141-1', 'auto');
    ga('send', 'pageview');
  }
</script>

<Header />

<main class="w-full mt-8">
  <slot />
</main>

<footer class="sticky_footer">

  <div class="grid grid-cols-2 w-post c-secondary-2-1">

    <div class="text-left mt-8 pr-8">
      <a sveltekit:prefetch href="/" class="text-pale-gold">Posts</a>
    </div>

    <div class="text-right mt-8 pr-8">
      Gastón Silva
      <div class="text-2xl">
        <a href="https://twitter.com/givanse" class="text-pale-gold" title="twitter">
          <icon class="icon-twitter"></icon>
        </a>
        <a href="https://github.com/givanse" class="text-pale-gold" title="github">
          <icon class="icon-github-circled"></icon>
        </a>
      </div>
    </div>

  </div>

</footer>
