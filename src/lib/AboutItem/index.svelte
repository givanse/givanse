<script lang="ts">
  let { item, children }: { item: AboutItem; children: import('svelte').Snippet } = $props();
</script>

<div class="about-item">
  <a href={item.href}
     class="text-pale-gold"
     rel="me"
     target="_blank"
     title={item.title}>
    <icon class={item.iconCssClassName}></icon>
  </a>

  <div class="text">
    {@render children()}
  </div>
</div>

<style lang="less">
  @import '../../less/about-item.less';
</style>
