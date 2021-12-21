<script lang="ts">
  import {onMount} from "svelte";
  import { dev, browser, prerendering } from '$app/env';

  export let post;

  let span;

  onMount(function() {
    if (dev || !browser || prerendering) {
      return;
    }

    // linkedin
    /**
     * script src="//platform.linkedin.com/in.js" type="text/javascript"> lang: en_US</script
     * script type="IN/Share" data-url="http://givan.se{post.url}" data-counter="right"></script
     */
    let script = document.createElement("script");
    script.setAttribute("src", "//platform.linkedin.com/in.js");
    script.setAttribute('type', 'text/javascript');
    script.appendChild(document.createTextNode(' lang: en_US'));
    span.parentElement.appendChild(script);

    script = document.createElement("script");
    script.setAttribute('data-url', `http://givan.se${post.url}`);
    script.setAttribute('data-counter', 'right');
    script.setAttribute('type', 'IN/Share');
    span.parentElement.appendChild(script);

    // twitter
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
  });

</script>

<!-- twitter -->
<a href="https://twitter.com/share"
   class="twitter-share-button"
   data-url="http://givan.se{post.url}"
   data-text="{post.title}"
   data-via="givanse"
   data-hashtags="{post.hashtags}">Tweet</a>

<span bind:this={span}></span>

<style>
  :global(iframe#twitter-widget-0),
  :global(.twitter-share-button .twitter-share-button-rendered .twitter-tweet-button) {
    vertical-align: bottom;
    display: inline-block;
  }
</style>