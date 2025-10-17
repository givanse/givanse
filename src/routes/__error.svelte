<script lang="ts">
  // In SvelteKit v2, error pages receive error/status via props directly
  export let status: number;
  export let message: string;
  
  // Or use $page store for dynamic errors
  //import { page } from '$app/stores';
  
  $: errorTitle = `${status}: ${message}`;
</script>

<svelte:head>
  <title>{errorTitle}</title>
</svelte:head>

<div class="w-post text-center pt-48 pb-80 h-96">
  <h1>{errorTitle}</h1>
  <p>
    ¯\_(ツ)_/¯
  </p>
  {#if status === 404}
    <p>Sorry, we couldn't find that page.</p>
  {:else if status >= 500}
    <p>Something went wrong!</p>
  {/if}
</div>