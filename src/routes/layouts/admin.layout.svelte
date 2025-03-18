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
		Theme
	} from 'carbon-components-svelte';
	import {
		Dashboard,
		User,
		Settings,
		Task,
		UserAvatarFilledAlt,
		SettingsAdjust
	} from 'carbon-icons-svelte';
	import 'carbon-components-svelte/css/all.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let isSideNavOpen = true;
	let isSettingOpen = false;
	let isProfileOpen = false;
	let isSwitcherOpen = false;

	$: currentPath = $page.url.pathname;

	onMount(() => {
		if (!localStorage.getItem('accessToken')) {
			goto('/login');
		}
	});
</script>

<Theme>
	<Header company="GIT" platformName="Cacing69" bind:isSideNavOpen>
		<svelte:fragment slot="skip-to-content">
			<SkipToContent />
		</svelte:fragment>

		<HeaderNav>
			<HeaderNavItem
				href="https://github.com/cacing69/svelte-carbon"
				target="_blank"
				text="Repository"
			/>
		</HeaderNav>

		<HeaderUtilities>
			<HeaderAction
				bind:isOpen={isSettingOpen}
				iconDescription="Settings"
				tooltipAlignment="start"
				icon={SettingsAdjust}
				on:open={() => {
					isProfileOpen = false;
					isSwitcherOpen = false;
				}}
			>
				<HeaderPanelLinks>
					<HeaderPanelDivider>Setting</HeaderPanelDivider>
					<HeaderPanelLink>Token</HeaderPanelLink>
				</HeaderPanelLinks>
			</HeaderAction>
			<HeaderAction
				bind:isOpen={isProfileOpen}
				iconDescription="Profile"
				icon={UserAvatarFilledAlt}
				on:open={() => {
					isSettingOpen = false;
					isSwitcherOpen = false;
				}}
			>
				<HeaderPanelLinks>
					<HeaderPanelDivider>Profile</HeaderPanelDivider>
					<HeaderPanelLink>Fullname</HeaderPanelLink>
					<HeaderPanelDivider>Actions</HeaderPanelDivider>
					<HeaderPanelLink
						on:click={() => {
							goto('/login');
						}}>Logout</HeaderPanelLink
					>
				</HeaderPanelLinks>
			</HeaderAction>
			<HeaderAction
				bind:isOpen={isSwitcherOpen}
				on:open={() => {
					isSettingOpen = false;
					isProfileOpen = false;
				}}
			>
				<HeaderPanelLinks>
					<HeaderPanelDivider>Switcher</HeaderPanelDivider>
					<HeaderPanelLink>Context</HeaderPanelLink>
				</HeaderPanelLinks>
			</HeaderAction>
		</HeaderUtilities>
	</Header>

	<SideNav bind:isOpen={isSideNavOpen}>
		<SideNavItems>
			<SideNavLink text="Dashboard" href="/" icon={Dashboard} isSelected={currentPath === '/'} />

			<SideNavMenu text="User Management" icon={User} expanded={currentPath.startsWith('/users')}>
				<SideNavMenuItem href="/users" text="Users" isSelected={currentPath === '/users'} />
				<SideNavMenuItem
					href="/users/roles"
					text="Roles"
					isSelected={currentPath === '/users/roles'}
				/>
				<SideNavMenuItem
					href="/users/permissions"
					text="Permissions"
					isSelected={currentPath === '/users/permissions'}
				/>
			</SideNavMenu>

			<SideNavMenu text="Tasks" icon={Task} expanded={currentPath.startsWith('/tasks')}>
				<SideNavMenuItem href="/tasks" text="All Tasks" isSelected={currentPath === '/tasks'} />
				<SideNavMenuItem
					href="/tasks/active"
					text="Active"
					isSelected={currentPath === '/tasks/active'}
				/>
				<SideNavMenuItem
					href="/tasks/completed"
					text="Completed"
					isSelected={currentPath === '/tasks/completed'}
				/>
			</SideNavMenu>

			<SideNavLink
				text="Settings"
				href="/settings"
				icon={Settings}
				isSelected={currentPath === '/settings'}
			/>
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
