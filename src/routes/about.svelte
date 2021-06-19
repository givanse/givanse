<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<style src="../less/about.less"></style>

<svelte:head>
	<title>
    About :: Gastón
  </title>
</svelte:head>

<br>

<div class="content">

  <div class="row">
    <div class="col-xs-12 col-sm-offset-2 col-sm-8">
      <p>
        My name is Gast&oacute;n I. Silva.
        I am a software engineer that started off as an open source enthusiast and
        a full stack intern. Later I took a deep dive into SQL optimizations, solving
        bugs and backporting fixes for the Oracle RDBMS.
        After a couple of years I went back to web development; discovered
        that JavaScript had taken over the world and loved how much more sophisticated "web sites" are now. 
      </p>
    </div>
  </div>

  <div class="row text-center">
    <div class="mw320 text-left inline-block">
      <a href="https://twitter.com/givanse" target="_blank" class="findme_at">
        <i class="icon-twitter"></i></a>
      @givanse
    </div>

    <div class="mw320 text-left inline-block">
      <a href="mailto:givanse@pm.me" class="findme_at">
        <i class="icon-email"></i></a>
      givanse@pm.me
    </div>
  </div>

  <br>
  <br>

  <div class="row">
    <div class="col-xs-offset-3 col-xs-6 col-sm-offset-5 col-sm-2">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src="/givanse.png" alt="Gastón's photo" class="img-responsive" />
    </div>
  </div>

</div>
