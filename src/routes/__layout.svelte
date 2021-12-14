<script lang="ts">
	import Header from '$lib/Header/index.svelte';
	//import '../less/app.less';
  //import '../../assets/fontello/css/fontello.css';
  //import 'bootstrap/dist/css/bootstrap.css';
  //import 'highlight.js/styles/mono-blue.css';
</script>

<svelte:head>
  <style src="../less/layout.less"></style>
</svelte:head>

<Header />

<br>

<main class="layout">
  <div class="container">
	  <slot />
  </div>
  <div class="sticky_footer_push"></div>
</main>

<footer class="sticky_footer"></footer>
