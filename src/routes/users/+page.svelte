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
		Tag
	} from 'carbon-components-svelte';
	import AdminLayout from './../layouts/admin.layout.svelte';
	import { notify } from '../../utils/notification.svelte';
	import { Add, Delete, Edit, Renew, SyncSettings, TrashCan } from 'carbon-icons-svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import type { UserResponseDto, UsersResponse } from '../../services/dummy-json/dtos/users.dto';
	import { getUsers, searchUsers } from '../../services/dummy-json/users.service';
	import { debounce, first } from 'lodash-es';
	import type {
		DataTableHeader,
		DataTableRow
	} from 'carbon-components-svelte/src/DataTable/DataTable.svelte';
	import Popconfirm from '../../components/popconfirm.svelte';

	const sortable = true;
	let pageSize = 10;
	let page = 1;
	let totalItems = 0;
	let open = false;
	let search: string = '';
	let newProject = {
		name: '',
		status: 'Active',
		progress: '0%'
	};

	function handleSubmit() {
		open = false;
		notify.info('User created successfully');
	}

	const handleEdit = async (row: UserResponseDto) => {
		alert(`Edit : ${JSON.stringify(row)}`);
	};

	let selectedUser: UserResponseDto | null = null;

	let showDeleteModal = false;
	const confirmDelete = async () => {
		if (selectedUser) {
			alert(`Delete : ${JSON.stringify(selectedUser)}`);
			notify.info('User deleted successfully');
		}
		showDeleteModal = false;
		selectedUser = null;
	};

	const handleDelete = async (row: UserResponseDto) => {
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

			await $usersQuery.refetch();
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

	let rows: UserResponseDto[] = [];

	// let selectedRowIds = [rows[0].id, rows[1].id, rows[2].id];
	let selectedRowIds: number[] = [];

	const usersQuery = createQuery<UsersResponse, Error>({
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
		},
	});

	const handleRefresh = async () => {
		search = '';
		page = 1;
		await $usersQuery.refetch();
	};

	const handleSearch = debounce(async (value: string) => {
		search = value;
		page = 1;
		await $usersQuery.refetch();
	}, 300);

	const handlePageSize = async (e: CustomEvent) => {
		const {page, pageSize} = e.detail;

		await $usersQuery.refetch();
	}

	// const handlePagination = async () => {
	// 	await $usersQuery.refetch();
	// };

	$: {
		if ($usersQuery.data) {
			rows = $usersQuery.data.users;
			totalItems = $usersQuery.data.total;
		}
	}

	// $effect(() => {
	// 	if (pageSize) {
	// 		console.log(`pageSize: ${pageSize}`);
	// 	}
	// });
</script>

<AdminLayout>
	<Modal
		bind:open
		size="xs"
		modalHeading="Create New Project"
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
		<Row>
			<Column>
				{#if $usersQuery.isLoading}
					<DataTableSkeleton headers={headers.map((item: any) => item.value)} rows={pageSize} />
				{:else}
					<DataTable
						stickyHeader={false}
						title={$usersQuery.isFetching ? 'Loading...' : 'List of Users'}
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
						batchSelection
						bind:selectedRowIds
						{sortable}
						on:click:header={handleSort}
						{headers}
						{rows}
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
										on:click={() => handleEdit(row as UserResponseDto)}
										iconDescription="Edit"
										icon={Edit}
									/>
									<Button
										size="small"
										kind="danger-tertiary"
										on:click={() => handleDelete(row as UserResponseDto)}
										iconDescription="Delete"
										icon={TrashCan}
									/>
									<!-- <Popconfirm
										title="top-left"
										confirm={async () => {
											handleDelete(row as UserResponseDto);
										}}
									>
										{#snippet popConfirmBody()}
											<Button
												size="small"
												kind="danger-tertiary"
												iconDescription="Delete"
												icon={TrashCan}
											/>
										{/snippet}
									</Popconfirm> -->
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
						on:change={handlePageSize}

					/>
				{/if}
			</Column>
		</Row>
	</Grid>
</AdminLayout>
