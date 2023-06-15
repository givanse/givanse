<script lang="ts">
	import { page } from '$app/stores';
</script>

<footer class="sticky_footer">

  <div class="grid grid-cols-2 w-post c-secondary-2-1">

    <div class="text-left mt-8 pr-8">
      <a sveltekit:prefetch href="/" class="text-pale-gold">Posts</a>
    </div>

    <div class="text-right mt-8 pr-8">
      <a class="text-pale-gold underline"
         sveltekit:prefetch href="/about"
         class:active={$page.path === '/about'}>
        Gastón Silva
      </a>
      &nbsp;
      <div class="text-2xl mt-2  mr-1">
        <a href="https://twitter.com/givanse" class="text-pale-gold" title="twitter">
          <icon class="icon-twitter"></icon>
        </a>
        <a href="https://github.com/givanse" class="text-pale-gold" title="github">
          <icon class="icon-github-circled"></icon>
        </a>
        <a href="https://stackoverflow.com/users/7852/givanse" class="text-pale-gold " title="stackoverflow" style="font-size: 1.4rem;">
          <icon class="icon-stackoverflow"></icon>
        </a>
      </div>
    </div>

  </div>

</footer>