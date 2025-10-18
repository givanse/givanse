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
  <link rel="canonical" href="https://givan.se/about">
</svelte:head>

<div class="about text-center">

  <h1 class="name">
    Gastón Silva
  </h1>

  <p>
    I am a software engineer with experience in various industries such as digital agencies, enterprise databases and video games. I've spent a meaningful amount of time working on each of the different phases and components of a software project, from code design and system architecture to developer tools and test automation. This background provides me with a strong understanding of the software development life cycle.
  </p>

  <div class="icons">

    <AboutItem item={stackoverflow}>
      Top StackOverflow contributor,
      now turned ChatGPT wordsmith.
    </AboutItem>

    <AboutItem item={twitter}>
      Analyzing the World's Chessboard
      from My Armchair.
    </AboutItem>

    <AboutItem item={github}>
      Where Good Ideas Rest in Peace and
      Ambition Gets a Reality Check.
    </AboutItem>

    <AboutItem item={linkedin}>
      Let's connect, excited to ignore InMails while
      celebrating our achievements together!
    </AboutItem>


  </div>

</div>