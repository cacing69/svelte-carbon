<script>
  import {
    Content,
    Header,
    HeaderNav,
    HeaderNavItem,
    HeaderUtilities,
    HeaderAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    SkipToContent,
    Theme,
  } from "carbon-components-svelte";
  import {
    Dashboard,
    User,
    Settings,
    ChartLine,
    Task,

	UserAvatarFilledAlt,

	SettingsAdjust


  } from "carbon-icons-svelte";
  import "carbon-components-svelte/css/all.css";
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let isSideNavOpen = true;
  let isOpen1 = false;
  let isOpen2 = false;
  let isOpen3 = false;

  $: currentPath = $page.url.pathname;
</script>

  <Theme>
  <Header company="GIT" platformName="Cacing69" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>

    <HeaderNav>
      <HeaderNavItem href="/" text="Overview" />
      <HeaderNavItem href="/analytics" text="Analytics" />
      <HeaderNavItem href="/reports" text="Reports" />
    </HeaderNav>

    <HeaderUtilities>
    <HeaderAction
      bind:isOpen={isOpen1}
      iconDescription="Settings"
      tooltipAlignment="start"
      icon={SettingsAdjust}
      on:open={() => {
        isOpen2 = false;
        isOpen3 = false;
      }}
    >
      <HeaderPanelLinks>
        <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
    <HeaderAction
      bind:isOpen={isOpen2}
      iconDescription="Profile"
      icon={UserAvatarFilledAlt}
      on:open={() => {
        isOpen1 = false;
        isOpen3 = false;
      }}
    >
      <HeaderPanelLinks>
        <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
        <HeaderPanelLink on:click={() => {goto("/login")}}>Logout</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
    <HeaderAction
      bind:isOpen={isOpen3}
      on:open={() => {
        isOpen1 = false;
        isOpen2 = false;
      }}
    >
      <HeaderPanelLinks>
        <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
  </Header>

  <SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
      <SideNavLink 
        text="Dashboard" 
        href="/" 
        icon={Dashboard}
        isSelected={currentPath === '/'} 
      />

      <SideNavMenu 
        text="Analytics" 
        icon={ChartLine}
        expanded={currentPath.startsWith('/analytics')}
      >
        <SideNavMenuItem 
          href="/analytics/overview" 
          text="Overview"
          isSelected={currentPath === '/analytics/overview'}
        />
        <SideNavMenuItem href="/analytics/reports" text="Reports" />
        <SideNavMenuItem href="/analytics/metrics" text="Metrics" />
      </SideNavMenu>

      <SideNavMenu text="User Management" icon={User}>
        <SideNavMenuItem href="/users" text="Users" />
        <SideNavMenuItem href="/users/roles" text="Roles" />
        <SideNavMenuItem href="/users/permissions" text="Permissions" />
      </SideNavMenu>

      <SideNavMenu text="Tasks" icon={Task}>
        <SideNavMenuItem href="/tasks" text="All Tasks" />
        <SideNavMenuItem href="/tasks/active" text="Active" />
        <SideNavMenuItem href="/tasks/completed" text="Completed" />
      </SideNavMenu>

      <SideNavLink text="Settings" href="/settings" icon={Settings} />
    </SideNavItems>
  </SideNav>

  <Content>
    <slot />
  </Content>
</Theme>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  :global(.bx--content) {
    margin-top: 48px;
    background: var(--cds-background);
    padding: 1rem;
    min-height: calc(100vh - 48px);
  }

  :global(.bx--header) {
    position: fixed;
    width: 100%;
    z-index: 9000;
  }

  :global(.bx--side-nav) {
    position: fixed;
    top: 48px;
    height: calc(100vh - 48px);
  }
</style>
