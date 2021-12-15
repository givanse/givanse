<script lang="ts">
  import '../app.css';
	import Header from '$lib/Header/index.svelte';
  //import '../../assets/fontello/css/fontello.css';
  //import 'bootstrap/dist/css/bootstrap.css';
  //import 'highlight.js/styles/mono-blue.css';
</script>


<svelte:head>
  <style src="../less/layout.less"></style>
</svelte:head>

<Header />

<main class="mt-8">
  <slot />
  <div class="sticky_footer_push"></div>
</main>

<footer class="sticky_footer"></footer>
