<script lang="ts">
import { dev, browser, prerendering } from "$app/env";

export let slug;

function loadDisqus() {  
  if (dev || !browser || prerendering) {
    return;
  }

  /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
  const disqus_config = function () {
    this.page.url = `https://givan.se/${slug}`; // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = slug; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };
  (function() { // DON'T EDIT BELOW THIS LINE
  var d = document, s = d.createElement('script');
  s.src = 'https://givanse.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
  })();
}

loadDisqus();
</script>

<div id="disqus_thread">
  {#if dev}
    <div class="text-center bg-gray-100 w-full p-32">
      Disqus Comments Placeholder
      <br>
      (dev env)
    </div>
  {/if}
</div>
