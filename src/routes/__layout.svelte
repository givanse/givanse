<svelte:head>
  <style src="../less/layout.less"></style>
</svelte:head>

<script lang="ts">
  import {onMount} from "svelte";
  import { dev, browser, prerendering } from '$app/env';
	import Header from '$lib/Header/index.svelte';

  onMount(function() {
    if (dev || !browser || prerendering) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PLM6R0K3T7');
  });
</script>

<Header />

<main class="w-full mt-8">
  <slot />
</main>