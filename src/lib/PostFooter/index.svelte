<script lang="ts">
  import ShareButtons from '$lib/ShareButtons/index.svelte';
  import DisqusComments from '$lib/DisqusComments/index.svelte';

  export let post: Post;

  const length = 80;
  let descriptionShort = post.description;
  if (post.description && post.description.length > length - 10) {
    descriptionShort = post.description.substring(0, length) + '...';
  }
</script>

<style lang="less">
  @import '../../less/colors.less';

  .share {
    border-width: 1px 0;
    border-color: @pale-gold;
  }
</style>

<footer class="mt-24 w-post">
  <div class="share mt-8 py-4 px-8 grid sm:grid-cols-1 md:grid-cols-2">
    <div>
    </div>

    <div class="md:col-span-1">
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

  <div class="mt-20 p-8">
    <DisqusComments slug={post.fileName}></DisqusComments>
  </div>

</footer>