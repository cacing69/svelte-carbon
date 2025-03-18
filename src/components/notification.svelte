<script lang="ts">
	import { ToastNotification } from 'carbon-components-svelte';
	import { notification } from '../utils/notification.svelte';
</script>

{#if notification.show}
	<div class="notification-container">
		<ToastNotification
			lowContrast
			kind={notification.kind}
			title={notification.title}
			subtitle={notification.message}
			caption={new Date().toLocaleString()}
		/>
	</div>
{/if}

<style>
	.notification-container {
		position: fixed;
		top: 3rem;
		right: 1rem;
		z-index: 1000;
	}
</style>
