<script lang="ts">
  import AboutItem from '$lib/AboutItem/index.svelte';
  import '../../less/about.less';

  const twitter = {
    iconCssClassName: 'icon-twitter',
    title: 'twitter',
    href: 'https://twitter.com/gaston_this_is'
  };
  const github = {
    iconCssClassName: 'icon-github-circled',
    title: 'github',
    href: 'https://github.com/givanse'
  };
  const stackoverflow = {
    iconCssClassName: 'icon-stackoverflow',
    title: 'stackoverflow',
    href: 'https://stackoverflow.com/users/7852/givanse'
  };
  const linkedin = {
    iconCssClassName: 'icon-linkedin',
    title: 'linkedin',
    href: 'https://www.linkedin.com/in/givanse'
  };
</script>

<svelte:head>
  <title>About :: Gastón</title>
  <link rel="canonical" href="https://givan.se/about">
</svelte:head>

<div class="about text-center">
  <h1 class="name">
    Gastón Silva
  </h1>

  <p>
    Gastón is a software engineer with more than 15 years of experience building systems that balance precision, performance, and design.
  </p>
  <p>
    He began his career developing enterprise platforms that serviced Fortune 500 companies relying on massive databases and complex data infrastructures. Later, he moved into the gaming industry, where he led engineering efforts for global applications used by millions of players.
  </p>
  <p>
    He has spent a meaningful amount of time working on each phase and component of a software project, from code design and system architecture to developer tools and test automation. This background gives him a strong understanding of the software development life cycle and the tradeoffs that shape it.
  </p>
  <p>
    Over the years, he has learned to handle ambiguity and chaos with structure and calm. He knows how to choose the right kind of technical debt at different stages of a project, trading speed for stability or exploration when it matters most.
  </p>
  <p>
    He has contributed to open-source projects, mentored teams across time zones, and built tools that simplify the invisible layers behind large-scale systems. Whether working independently or leading complex integrations, he approaches engineering as both craft and discipline, guided by clarity, scalability, and thoughtful design.
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
      Let's connect, excited to
      celebrate our achievements together!
    </AboutItem>
  </div>
</div>
