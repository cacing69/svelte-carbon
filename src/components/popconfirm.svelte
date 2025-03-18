<script lang="ts">
	import { Popover, Button, Row, Column } from 'carbon-components-svelte';
	import { TrashCan } from 'carbon-icons-svelte';

	const { confirm, popConfirmBody, title } = $props();

	// export let title = 'Are you sure?';
	// export let onConfirm: () => void;
	// export let onCancel: () => void = () => {};
	let open = $state(false);
	let ref: any = null;
</script>

<div bind:this={ref} style:position="relative">
	<!-- <Button
		size="small"
		kind="danger-tertiary"
		iconDescription="Delete"
		icon={TrashCan}
		on:click={() => {
			open = true;
		}}
	/> -->
	<div
		on:click|stopPropagation={() => {
			open = true;
		}}
	>
		{@render popConfirmBody?.()}
	</div>
	<Popover
		bind:open
    closeOnOutsideClick
		align="left-bottom"
    caret
    style="padding-right: 50px;"
		on:click:outside={({ detail }) => {
			console.log('on:click:outside');
			open = ref.contains(detail.target);
		}}
	>
		<div style="padding: var(--cds-spacing-05)">
			<Row>
				{title}
			</Row>
			<Row>
				<Column>
					<Button
						size="small"
						on:click={() => {
							open = false;
						}}>No</Button
					>
					<Button
						size="small"
						on:click={() => {
							confirm();
							open = false;
						}}>Yes</Button
					></Column
				>
			</Row>
		</div>
	</Popover>
</div>
<!-- <Popover open caret>
  <div class="p-4">
    <p class="mb-4">{title}</p>
    <div class="flex gap-2">
      <Button size="small" kind="secondary" on:click={onCancel}>Cancel</Button>
      <Button size="small" kind="danger" on:click={onConfirm}>Yes</Button>
    </div>
  </div>
</Popover> -->
