<script lang="ts">
  import '../app.css';
	import Header from '$lib/Header/index.svelte';
  //import '../../assets/fontello/css/fontello.css';
</script>


<svelte:head>
  <style src="../less/layout.less"></style>
  <style src="../less/header.less"></style>
  <style src="../less/footer.less"></style>
</svelte:head>

<Header />

<main class="mt-8">
  <slot />
  <div class="sticky_footer_push"></div>
</main>

<footer class="sticky_footer"></footer>
