<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	import AboutItem from '$lib/AboutItem/index.svelte';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;


  const twitter = {
    iconCssClassName: "icon-twitter",
    title: "twitter",
    href: "https://twitter.com/givanse"
  };
  const github = {
    iconCssClassName: "icon-github-circled",
    title: "github",
    href: "https://github.com/givanse"
  };
  const stackoverflow = {
    iconCssClassName: "icon-stackoverflow",
    title: "stackoverflow",
    href: "https://stackoverflow.com/users/7852/givanse"
  };
  const linkedin = {
    iconCssClassName: "icon-linkedin",
    title: "linkedin",
    href: "https://www.linkedin.com/in/givanse"
  };
</script>

<style src="../less/about.less"></style>

<svelte:head>
	<title>
    About :: Gastón
  </title>
</svelte:head>

<div class="w-post">
  <div class="about text-center">

    <table class="mt-8 pr-8 w-3/4">

      <AboutItem item={twitter}>
        Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet
      </AboutItem>

      <AboutItem item={github}>
        Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet
      </AboutItem>

      <AboutItem item={stackoverflow}>
        Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet
      </AboutItem>

      <AboutItem item={linkedin}>
        Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet
      </AboutItem>

      <tr class="text-center">
        <td class="name" colspan="2">
          Gastón Silva
        </td>
      </tr>

    </table>

  </div>
</div>