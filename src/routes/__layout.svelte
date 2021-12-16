<script lang="ts">
  import '../app.css';
	import Header from '$lib/Header/index.svelte';
</script>


<svelte:head>
  <style src="../less/layout.less"></style>
</svelte:head>

<Header />

<main class="w-full mt-8">
  <slot />
</main>

<footer class="sticky_footer grid grid-cols-2 px-16 c-secondary-2-1">

  <div class="text-left mt-8 pr-8">
    <a sveltekit:prefetch href="/" class="text-pale-gold">Posts</a>
  </div>

  <div class="text-right mt-8 pr-8">
    Gastón Silva
    <br>
    <a href="https://twitter.com/givanse" class="text-pale-gold">@givanse</a>
  </div>

</footer>
