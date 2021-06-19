<script lang="ts">
	import Header from '$lib/Header/index.svelte';
	import '../less/app.less';
</script>

<Header />

<br>

<main class="layout">
  <div class="container">
	  <slot />
  </div>
  <div class="sticky_footer_push"></div>
</main>

<footer class="sticky_footer"></footer>
