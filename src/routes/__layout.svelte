<svelte:head>
  <style src="../less/layout.less"></style>
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import { browser, dev, building } from '$app/environment';
  import Header from '$lib/Header/index.svelte';

  onMount(() => {
    // Only run in browser, NOT during build/prerendering
    if (!browser || building) {
      return; // ✅ Skip during prerendering
    }
    
    if (dev) {
      console.log('Layout mounted in dev');
      return; // Skip analytics in dev if desired
    }
    
    // Google Analytics - client-side only
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { 
      window.dataLayer.push(arguments); 
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-PLM6R0K3T7');
  });
</script>

<Header />
<main class="w-full mt-8">
  <slot />
</main>