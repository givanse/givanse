<script lang="ts">
  export let item: AboutItem;
</script>

<style src="../../less/about-item.less"></style>

<tr>
  <td>
    <a href={item.href} class="text-pale-gold" title={item.title}>
      <icon class={item.iconCssClassName}></icon>
    </a>
  </td>
  <td>
    <slot />
  </td>
</tr>
