<script>
  // import AdminLayout from './../layouts/admin.layout.svelte';
  // import {
  //   Grid,
  //   Row,
  //   Column,
  //   Tile,
  //   DataTable,
  //   Pagination,
  //   Button,
  //   Tag,
  //   Modal,
  //   TextInput,
  //   Select,
  //   SelectItem
  // } from "carbon-components-svelte";
  // import { Add } from "carbon-icons-svelte";
	// import { notify } from '../../utils/notification.util';

  // let rows = [
  //   {
  //     id: "1",
  //     name: "Project A",
  //     status: "Active",
  //     progress: "75%"
  //   },
  //   {
  //     id: "2",
  //     name: "Project B",
  //     status: "Pending",
  //     progress: "30%"
  //   }
  // ];

  // let headers = [
  //   {
  //     key: 'name',
  //     value: 'Project Name',
  //     sortable: true,
  //     empty: false
  //   },
  //   {
  //     key: 'status',
  //     value: 'Status',
  //     sortable: true,
  //     empty: false
  //   },
  //   {
  //     key: 'progress',
  //     value: 'Progress',
  //     sortable: true,
  //     empty: false
  //   }
  // ];

  let pageSize = 10;
  let page = 1;
  let open = false;
  let newProject = {
    name: "",
    status: "Active",
    progress: "0%"
  };

  function handleSubmit() {
    // rows = [...rows, { id: (rows.length + 1).toString(), ...newProject }];
    open = false;
    // newProject = { name: "", status: "Active", progress: "0%" };
    notify.info("Project created successfully");
  }

  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    ToolbarMenu,
    ToolbarMenuItem,
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
  } from "carbon-components-svelte";
  import Save from "carbon-icons-svelte/lib/Save.svelte";
  import AdminLayout from './../layouts/admin.layout.svelte';
	import { notify } from '../../utils/notification.util';

  const headers = [
    { key: "name", value: "Name", sortable: false, empty: false,},
    { key: "port", value: "Port", sortable: false, empty: false,},
    { key: "rule", value: "Rule", sortable: false, empty: false,},
  ];

  const rows = [
    { id: "a", name: "Load Balancer 3", port: 3000, rule: "Round robin" },
    { id: "b", name: "Load Balancer 1", port: 443, rule: "Round robin" },
    { id: "c", name: "Load Balancer 2", port: 80, rule: "DNS delegation" },
    { id: "d", name: "Load Balancer 6", port: 3000, rule: "Round robin" },
    { id: "e", name: "Load Balancer 4", port: 443, rule: "Round robin" },
    { id: "f", name: "Load Balancer 5", port: 80, rule: "DNS delegation" },
    { id: "g", name: "Load Balancer 3", port: 3000, rule: "Round robin" },
    { id: "h", name: "Load Balancer 1", port: 443, rule: "Round robin" },
    { id: "i", name: "Load Balancer 2", port: 80, rule: "DNS delegation" },
    { id: "j", name: "Load Balancer 6", port: 3000, rule: "Round robin" },
    { id: "k", name: "Load Balancer 4", port: 443, rule: "Round robin" },
    { id: "l", name: "Load Balancer 5", port: 80, rule: "DNS delegation" },
     { id: "m", name: "Load Balancer 3", port: 3000, rule: "Round robin" },
    { id: "n", name: "Load Balancer 1", port: 443, rule: "Round robin" },
    { id: "o", name: "Load Balancer 2", port: 80, rule: "DNS delegation" },
    { id: "p", name: "Load Balancer 6", port: 3000, rule: "Round robin" },
    { id: "q", name: "Load Balancer 4", port: 443, rule: "Round robin" },
    { id: "r", name: "Load Balancer 5", port: 80, rule: "DNS delegation" },
    { id: "s", name: "Load Balancer 3", port: 3000, rule: "Round robin" },
    { id: "t", name: "Load Balancer 1", port: 443, rule: "Round robin" },
    { id: "u", name: "Load Balancer 2", port: 80, rule: "DNS delegation" },
    { id: "v", name: "Load Balancer 6", port: 3000, rule: "Round robin" },
    { id: "w", name: "Load Balancer 4", port: 443, rule: "Round robin" },
    { id: "x", name: "Load Balancer 5", port: 80, rule: "DNS delegation" },
  ];

  let selectedRowIds = [rows[0].id, rows[1].id, rows[20].id];

  $: console.log("selectedRowIds", selectedRowIds);
</script>

<AdminLayout>
  <!-- <Grid fullWidth>
    <Row>
      <Column>
        <DataTable
          title="List Users"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
  </Grid> -->



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

  <Grid fullWidth>
    <Row>
      <Column>
        <DataTable
        title="List Users"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        batchSelection bind:selectedRowIds {headers} {rows}>
          <Toolbar>
            <ToolbarBatchActions>
              <Button icon={Save}>Save</Button>
            </ToolbarBatchActions>
            <ToolbarContent>
              <ToolbarSearch />
              <ToolbarMenu>
                <ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
                <ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">
                  API documentation
                </ToolbarMenuItem>
                <ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
              </ToolbarMenu>
              <Button on:click={() => {open=true}}>Create balancer</Button>
            </ToolbarContent>
          </Toolbar>
        </DataTable>
        <Pagination
                  totalItems={rows.length}
                  pageSizes={[5, 10, 15]}
                  bind:pageSize
                  bind:page
                />
      </Column>
    </Row>
  </Grid>



</AdminLayout>