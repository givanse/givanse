<script lang="ts">
  export let post: Post;
  $: dataUrl = `https://givan.se/${post.fileName}`;
</script>

<title>
  {post.title}
</title>

<meta name="author" content="Gastón I. Silva">
<meta name="title" content="{post.title}"/>
<meta name="description" content="{post.description}"/>
<meta name="keywords" content="{post.keywords}"/>

<meta property="og:type" content="article">
<meta property="og:url" content="{dataUrl}">
<meta property="og:title" content="{post.title}">
<meta property="og:site_name" content="givanse">
<meta property="og:description" content="{post.description}">
<meta property="og:image" content="https://givan.se{post.thumb}">

<meta name="twitter:card" content="summary"/>
<meta name="twitter:creator" content="@givanse"/>
<meta name="twitter:title" content="{post.title}"/>
<meta name="twitter:description" content="{post.description}"/>
<meta name="twitter:url" content="{dataUrl}"/>
<meta name="twitter:image" content="https://givan.se{post.thumb}"/>