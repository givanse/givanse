<script lang="ts">
	import { page } from '$app/stores';
</script>

<style src="../../less/header.less"></style>

<header class="header container">
  <div class="row header_0">
    <nav class="row_max_w menu">
      <a sveltekit:prefetch href="/"
         class:active={$page.path === '/'}>Posts</a>
      <a sveltekit:prefetch href="/about"
         class:active={$page.path === '/about'}>About</a>
    </nav>
  </div>
  <div class="row header_1"></div>
  <div class="row header_2"></div>
</header>