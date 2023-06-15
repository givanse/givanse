<svelte:head>
  <style src="../less/layout.less"></style>
</svelte:head>

<script lang="ts">
	import Header from '$lib/Header/index.svelte';
</script>

<Header />

<main class="w-full mt-8">
  <slot />
</main>