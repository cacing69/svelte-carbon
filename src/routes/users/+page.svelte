<script lang="ts">
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		// ToolbarMenu,
		// ToolbarMenuItem,
		ToolbarBatchActions,
		Pagination,
		Button,
		Modal,
		TextInput,
		Select,
		SelectItem,
		Grid,
		Row,
		Column,
		DataTableSkeleton,
		Tag,
		InlineLoading,
		Tile
	} from 'carbon-components-svelte';
	import AdminLayout from './../layouts/admin.layout.svelte';
	import { notify } from '../../utils/notification.svelte';
	import { Add, ArrowDown, ArrowUp, Delete, Edit, Renew, TrashCan } from 'carbon-icons-svelte';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import type { UserResponse, UsersResponse } from '../../services/dummy-json/dtos/users.dto';
	import { deleteUser, getUsers, searchUsers } from '../../services/dummy-json/users.service';
	import { debounce } from 'lodash-es';
	import type { DataTableHeader } from 'carbon-components-svelte/src/DataTable/DataTable.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const sortable = true;
	let pageSize = 10;
	let page = 1;
	let totalItems = 0;
	let open = false;
	let search: string = '';
	let isMobile = false;
	let newProject = {
		name: '',
		status: 'Active',
		progress: '0%'
	};

	function handleSubmit() {
		open = false;
		notify.info('User created successfully');
	}

	const handleEdit = async (row: UserResponse) => {
		alert(`Edit : ${JSON.stringify(row)}`);
	};

	let selectedUser: UserResponse | null = null;

	const deleteMutate = createMutation<UserResponse, Error>({
		mutationKey: ['delete-user'],
		mutationFn: async () => {
			return await deleteUser(selectedUser?.id!);
		},
		onSuccess: (data) => {
			notify.info('User deleted successfully');
			showDeleteModal = false;
			selectedUser = null;
			$tableQuery.refetch();
		},
		onError: (error: Error) => {
			console.error('Login failed:', error);
		}
	});

	let showDeleteModal = false;

	const confirmDelete = async () => {
		if (selectedUser) {
			$deleteMutate.mutate();
		}
	};

	const handleDelete = async (row: UserResponse) => {
		showDeleteModal = true;
		selectedUser = row;
	};

	let sortDirection: string | null = 'asc';
	let sortField: string | null = 'firstName';

	// Tambahkan handler untuk sorting
	const handleSort = async (e: CustomEvent) => {
		const { header, sortDirection: targetDirection } = e.detail;
		const { key } = header;

		if (sortable && !('sort' in header)) {
			if (targetDirection !== 'none') {
				sortDirection = targetDirection === 'ascending' ? 'asc' : 'desc';
				sortField = key;
			} else {
				sortDirection = null;
				sortField = null;
			}

			await $tableQuery.refetch();
		}

		return;
	};

	const headers: DataTableHeader[] = [
		{ key: 'firstName', value: 'First Name', empty: false },
		{ key: 'lastName', value: 'Last Name', sort: false, empty: false },
		{
			key: 'lengthFirstName',
			value: 'Status',
			sort: false,
			empty: false
		},
		{
			key: 'age',
			value: 'Age',
			empty: false
		},
		{ key: 'gender', value: 'Gender', sort: false, empty: false },
		{ key: 'actionColumn', value: 'Action', sort: false, empty: false }
	];

	let rows: UserResponse[] = [];

	// let selectedRowIds = [rows[0].id, rows[1].id, rows[2].id];
	let selectedRowIds: number[] = [];

	const tableQuery = createQuery<UsersResponse, Error>({
		queryKey: ['users', { page, pageSize, sortField, sortDirection }],
		queryFn: () => {
			let params = {
				limit: pageSize,
				skip: (page - 1) * pageSize,
				sortBy: sortField,
				order: sortDirection,
				q: search
			};

			if (search.length > 0) {
				return searchUsers(params);
			} else {
				return getUsers(params);
			}
		}
	});

	const handleRefresh = async () => {
		search = '';
		page = 1;
		await $tableQuery.refetch();
	};

	const handleSearch = debounce(async (value: string) => {
		search = value;
		page = 1;
		await $tableQuery.refetch();
	}, 300);

	const handlePagination = async (e: CustomEvent) => {
		if ($tableQuery.isFetching) return;

		await $tableQuery.refetch();
	};

	$: {
		if ($tableQuery.data) {
			rows = $tableQuery.data.users;
			totalItems = $tableQuery.data.total;
		}
	}

	// Add resize handler after other declarations
	const handleResize = () => {
		if (browser) {
			isMobile = window.innerWidth < 768;
		}
	};

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<AdminLayout>
	<Modal
		bind:open
		size="xs"
		modalHeading="User Entry"
		primaryButtonText="Create"
		secondaryButtonText="Cancel"
		on:click:button--primary={handleSubmit}
	>
		<TextInput
			labelText="Project Name"
			placeholder="Enter project name"
			bind:value={newProject.name}
		/>
		<Select
			labelText="Status"
			id="status-select"
			hideLabel={false}
			selected={newProject.status}
			on:change={(e) => {
				console.log(e);
			}}
		>
			<SelectItem value="Active" text="Active" />
			<SelectItem value="Pending" text="Pending" />
			<SelectItem value="Completed" text="Completed" />
		</Select>
	</Modal>

	<Modal
		bind:open={showDeleteModal}
		size="xs"
		modalHeading="Delete Confirmation"
		primaryButtonText="Delete"
		secondaryButtonText="Cancel"
		danger
		on:click:button--primary={confirmDelete}
		on:click:button--secondary={() => (showDeleteModal = false)}
	>
		<p>Are you sure you want to delete this user?</p>
	</Modal>

	<Grid fullWidth>
		{#if isMobile}
			<div>
				<div>
					<div style="width: 100%;">
						<ToolbarSearch
							on:clear={handleRefresh}
							on:keyup={(e: Event) => handleSearch((e.target as HTMLInputElement).value)}
						/>
					</div>
					<div style="display: flex; justify-content: flex-end; gap: 0.25rem;">
						<Button
							kind="secondary"
							iconDescription="Sort"
							icon={sortDirection === 'asc' ? ArrowUp : ArrowDown}
							on:click={() => {
								// Toggle sort direction
								sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
								sortField = 'firstName'; // Default sort by firstName
								$tableQuery.refetch();
							}}
						/>
						<Button
							kind="secondary"
							iconDescription="Refresh"
							icon={Renew}
							on:click={handleRefresh}
						/>
						<Button
							icon={Add}
							on:click={() => {
								open = true;
							}}>Add User</Button
						>
					</div>
				</div>
				{#each rows as row}
					<Tile style="margin-bottom: 1rem;">
						<h4>{row.firstName} {row.lastName}</h4>
						<div class="tile-content">
							<p>Age: {row.age}</p>
							<p>Status: {row.firstName?.length == 5 ? 'Passed' : 'Not passed'}</p>
							<p>
								Gender:
								{#if row.gender === 'male'}
									<Tag type="blue">Male</Tag>
								{:else if row.gender === 'female'}
									<Tag type="green">Female</Tag>
								{:else}
									<Tag type="gray">Other</Tag>
								{/if}
							</p>
						</div>
						<div style="display: flex; justify-content: flex-end;gap: 0.25rem;">
							<Button size="small" kind="tertiary" icon={Edit} on:click={() => handleEdit(row)} />
							<Button
								size="small"
								kind="danger-tertiary"
								icon={TrashCan}
								on:click={() => handleDelete(row)}
							/>
						</div>
					</Tile>
				{/each}
				<div>
					<Pagination
						{totalItems}
						pageSizes={[5, 10, 25]}
						bind:pageSize
						bind:page
						on:change={handlePagination}
						disabled={$tableQuery.isFetching}
					/>
				</div>
			</div>
		{:else}
			<Row>
				<Column>
					{#if $tableQuery.isLoading}
						<DataTableSkeleton headers={headers.map((item: any) => item.value)} rows={pageSize} />
					{:else}
						<DataTable
							stickyHeader={false}
							title="List of Users"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
							batchSelection={true}
							bind:selectedRowIds
							{sortable}
							on:click:header={handleSort}
							{headers}
							{rows}
							zebra={true}
						>
							<Toolbar>
								<ToolbarBatchActions>
									<Button icon={Delete}>Delete</Button>
								</ToolbarBatchActions>
								<ToolbarContent>
									<ToolbarSearch
										on:clear={handleRefresh}
										on:keyup={(e: Event) => handleSearch((e.target as HTMLInputElement).value)}
									/>
									<!-- <ToolbarMenu>
								<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
								<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">
									API documentation
								</ToolbarMenuItem>
								<ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
							</ToolbarMenu> -->
									<Button
										kind="secondary"
										iconDescription="Refresh"
										icon={Renew}
										on:click={handleRefresh}
									></Button>
									<Button
										icon={Add}
										on:click={() => {
											open = true;
										}}>Add User</Button
									>
								</ToolbarContent>
							</Toolbar>
							<svelte:fragment slot="cell" let:row let:cell>
								{#if cell.key === 'actionColumn'}
									<Row>
										<Button
											style="margin-right: 5px;"
											size="small"
											kind="tertiary"
											on:click={() => handleEdit(row as UserResponse)}
											iconDescription="Edit"
											icon={Edit}
										/>
										<Button
											size="small"
											kind="danger-tertiary"
											on:click={() => handleDelete(row as UserResponse)}
											iconDescription="Delete"
											icon={TrashCan}
										/>
									</Row>
								{:else if cell.key === 'lengthFirstName'}
									{row?.firstName?.length == 5 ? 'Passed' : 'Not passed'}
								{:else if cell.key === 'gender'}
									{#if row?.gender === 'male'}
										<Tag type="blue">Male</Tag>
									{:else if row?.gender === 'female'}
										<Tag type="green">Female</Tag>
									{:else}
										<Tag type="gray">Other</Tag>
									{/if}
								{:else if cell.display}
									{cell.display(cell.value, row)}
								{:else}
									{cell.value}
								{/if}
							</svelte:fragment>
						</DataTable>
						<Pagination
							{totalItems}
							pageSizes={[5, 10, 25, 50, 100]}
							bind:pageSize
							bind:page
							on:change={handlePagination}
							disabled={$tableQuery.isFetching}
						/>
					{/if}
					{#if $tableQuery.isFetching}
						<div style="display: flex; justify-content: center; padding: 1rem;">
							<InlineLoading description="Loading data..." />
						</div>
					{/if}
				</Column>
			</Row>
		{/if}
	</Grid>
</AdminLayout>

<style>
</style>
