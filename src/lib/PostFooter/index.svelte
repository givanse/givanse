<script>
  import ShareButtons from '$lib/ShareButtons/index.svelte';
  import DisqusComments from '$lib/DisqusComments/index.svelte';

  export let post;
</script>

<footer class="mt-16">
  <div class="w-full text-right mt-8 px-8">
    <span class="share_on">share on:</span>
    <ShareButtons post={post}></ShareButtons>
  </div>

  <div class="w-full mt-32 p-8">
    <DisqusComments slug={post.filename}></DisqusComments>
  </div>

</footer>