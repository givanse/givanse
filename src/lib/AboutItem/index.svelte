<script lang="ts">
  export let item: AboutItem;
</script>

<style src="../../less/about-item.less"></style>

<div class="about-item">
  <a href={item.href}
     class="text-pale-gold"
     rel="me"
     target="_blank"
     title={item.title}>
    <icon class={item.iconCssClassName}></icon>
  </a>

  <div class="text">
    <slot />
  </div>
</div>