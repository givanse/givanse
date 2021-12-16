<script lang="ts">
	import { page } from '$app/stores';
</script>

<header class="w-full">
  <div class="header_0">
    <nav class="menu sm:mx-1.5 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-80">
      <a sveltekit:prefetch href="/"
         class:active={$page.path === '/'}>Posts</a>
    </nav>
  </div>
  <div class="w-full header_1"></div>
  <div class="w-full header_2"></div>
</header>