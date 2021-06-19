<script lang="ts">
	import { page } from '$app/stores';
</script>

<style src="../../less/header.less"></style>

<header class="container">
  <div class="row header_0">
    <nav class="menu">
      <a sveltekit:prefetch href="/"
         class:active={$page.path === '/'}>Posts</a>
      <a sveltekit:prefetch href="/about"
         class:active={$page.path === '/about'}>About</a>
    </nav>
  </div>
  <div class="row header_1"></div>
  <div class="row header_2"></div>

  <!--
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
  -->
</header>