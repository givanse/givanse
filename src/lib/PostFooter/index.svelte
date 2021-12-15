<script>
  import ShareButtons from '$lib/ShareButtons/index.svelte';
  import DisqusComments from '$lib/DisqusComments/index.svelte';

  export let post;

  const length = 80;
  const descriptionShort = post.description.length > length - 10 ? 
                           post.description.substring(0, 80) + '...' :
                           post.description;
</script>

<style lang="less">
  @import '../../less/colors.less';

  .share {
    border-width: 0.3rem 0;
    border-color: @color-secondary-1-1;
  }
</style>

<footer class="mt-16">
  <div class="share w-full mt-8 py-4 px-8 bg-secondary-2-1 grid grid-cols-2">
    <div></div>

    <div class="">
      <span class="c-secondary-2-2 text-sm lowercase">
        <a href="#title" class="mr-1 c-secondary-2-0">
          {descriptionShort}
        </a>
        <br>
      </span>

      <div class="text-right">
        <ShareButtons post={post}></ShareButtons>
      </div>
    </div>
  </div>

  <div class="w-full mt-32 p-8">
    <DisqusComments slug={post.filename}></DisqusComments>
  </div>

</footer>