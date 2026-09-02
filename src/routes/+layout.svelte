<script lang="ts">
  import '../app.css';
  import '../less/layout.less';
  import Header from '$lib/Header/index.svelte';
  import Footer from '$lib/Footer/index.svelte';

  let { children } = $props();
</script>

<Header />
<main class="w-full">
  {@render children()}
</main>
<Footer />
