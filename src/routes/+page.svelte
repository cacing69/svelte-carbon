<script>
  import AdminLayout from './../layouts/admin.layout.svelte';
  import {
    Grid,
    Row,
    Column,
    Tile,
    DataTable,
    Pagination,
    Button,
    Tag,
    Modal,
    TextInput,
    Select,
    SelectItem
  } from "carbon-components-svelte";
  import { Add } from "carbon-icons-svelte";

  let rows = [
    {
      id: "1",
      name: "Project A",
      status: "Active",
      progress: "75%"
    },
    {
      id: "2",
      name: "Project B",
      status: "Pending",
      progress: "30%"
    }
  ];

  let headers = [
    {
      key: 'name',
      value: 'Project Name',
      sortable: true,
      empty: false
    },
    {
      key: 'status',
      value: 'Status',
      sortable: true,
      empty: false
    },
    {
      key: 'progress',
      value: 'Progress',
      sortable: true,
      empty: false
    }
  ];

  let pageSize = 10;
  let page = 1;
  let open = false;
  let newProject = {
    name: "",
    status: "Active",
    progress: "0%"
  };

  function handleSubmit() {
    rows = [...rows, { id: (rows.length + 1).toString(), ...newProject }];
    open = false;
    newProject = { name: "", status: "Active", progress: "0%" };
  }
</script>

<AdminLayout>
  <Grid fullWidth>
    <Row>
      <Column>
        <div class="page-header">
          <div>
            <h1>Dashboard</h1>
            <p class="subtitle">Overview of your projects and activities</p>
          </div>
          <Button size="small" icon={Add} on:click={() => (open = true)}>New Project</Button>
        </div>
      </Column>
    </Row>

    <Row>
      <Column lg={4} md={4} sm={4}>
        <Tile>
          <h3>Total Projects</h3>
          <div class="stat">
            <span class="stat-value">24</span>
            <Tag type="green">+12%</Tag>
          </div>
        </Tile>
      </Column>
      <Column lg={4} md={4} sm={4}>
        <Tile>
          <h3>Active Projects</h3>
          <div class="stat">
            <span class="stat-value">18</span>
            <Tag type="blue">In Progress</Tag>
          </div>
        </Tile>
      </Column>
      <Column lg={4} md={4} sm={4}>
        <Tile>
          <h3>Completed</h3>
          <div class="stat">
            <span class="stat-value">6</span>
            <Tag type="purple">This Month</Tag>
          </div>
        </Tile>
      </Column>
      <Column lg={4} md={4} sm={4}>
        <Tile>
          <h3>Rejected</h3>
          <div class="stat">
            <span class="stat-value">16</span>
            <Tag type="red">This Year</Tag>
          </div>
        </Tile>
      </Column>

    </Row>

    <Row>
      <Column>
        <DataTable
          title="Recent Projects"
          description="List of your recent projects and their status"
          {headers}
          {rows}
          sortable
          zebra
        />
        <Pagination
          totalItems={rows.length}
          pageSizes={[5, 10, 15]}
          bind:pageSize
          bind:page
        />
      </Column>
    </Row>
  </Grid>

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
      on:change={e => {console.log(e)}}
    >
      <SelectItem value="Active" text="Active" />
      <SelectItem value="Pending" text="Pending" />
      <SelectItem value="Completed" text="Completed" />
    </Select>
  </Modal>
</AdminLayout>