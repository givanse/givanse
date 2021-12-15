<script lang="ts">
  import '../app.css';
	import Header from '$lib/Header/index.svelte';
</script>


<svelte:head>
  <style src="../less/layout.less"></style>
</svelte:head>

<Header />

<main class="mt-8">
  <slot />
</main>

<footer class="sticky_footer grid grid-cols-2">

  <div class="text-left mt-8 pr-8">
    <a sveltekit:prefetch href="/">Posts</a>
  </div>

  <div class="text-right mt-8 pr-8">
    Gastón Silva
    <br>
    <a href="https://twitter.com/givanse" class="">@givanse</a>
  </div>

</footer>
