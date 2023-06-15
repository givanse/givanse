<script lang="ts">
	import { page } from '$app/stores';
</script>

<header class="w-full">
  <div class="header_0">
    <nav class="menu w-post">
      <a sveltekit:prefetch href="/"
         class:active={$page.path === '/'}>Posts</a>

      <a sveltekit:prefetch href="/about"
         class:active={$page.path === '/about'}>About</a>
    </nav>
  </div>
  <div class="w-full header_1"></div>
  <div class="w-full header_2"></div>
</header>