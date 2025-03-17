<script lang="ts">
  import { QueryClientProvider } from '@tanstack/svelte-query';
	import { queryClient } from '../lib/query.client';
	import Notification from '../components/notification.svelte';

</script>


<QueryClientProvider client={queryClient}>
  <Notification />
  <slot />
</QueryClientProvider>

<style>
  :global(.bx--inline-notification) {
    margin-top: 1rem;
  }
</style>