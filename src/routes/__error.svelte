<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<div class="w-post text-center pt-48 pb-80 h-96">
  <h1>{title}</h1>
  <p>
    ¯\_(ツ)_/¯
  </p>
</div>
