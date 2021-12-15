<script>
  import ShareButtons from '$lib/ShareButtons/index.svelte';
  import DisqusComments from '$lib/DisqusComments/index.svelte';

  export let post;
</script>

<footer>
  <div class="w-full text-right mt-8 pr-8">
    <span class="share_on">share on:</span>
    <ShareButtons post={post}></ShareButtons>
  </div>

  <hr>

  <div class="w-full p-8">
    <DisqusComments slug={post.filename}></DisqusComments>
  </div>

</footer>