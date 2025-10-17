<svelte:head>
  <title>About :: Gastón</title>
</svelte:head>

<style src="../less/about.less"></style>

<script lang="ts">
  import AboutItem from '$lib/AboutItem/index.svelte';

  // Define data as regular variables - no context="module"
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

<div class="about text-center">
  <table>
    <AboutItem item={stackoverflow}>
      Top StackOverflow contributor,
      <br />
      now turned ChatGPT wordsmith.
    </AboutItem>
    <AboutItem item={twitter}>
      Analyzing the World's Chessboard
      <br />
      from My Armchair.
    </AboutItem>
    <AboutItem item={github}>
      Where Good Ideas Rest in Peace and
      <br />
      Ambition Gets a Reality Check.
    </AboutItem>
    <AboutItem item={linkedin}>
      Let's connect, excited to ignore InMails while
      <br />
      celebrating our achievements together!
    </AboutItem>
    <tbody>
      <tr class="text-center">
        <td class="name" colspan="2">
          Gastón Silva
        </td>
      </tr>
    </tbody>
  </table>
</div>