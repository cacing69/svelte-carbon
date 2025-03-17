import { writable } from 'svelte/store';

interface NotificationState {
	show: boolean;
	kind: 'error' | 'success' | 'warning' | 'info';
	title: string;
	message: string;
}

const notification = writable<NotificationState>({
	show: false,
	kind: 'info',
	title: '',
	message: ''
});

export const showNotification = (
	kind: NotificationState['kind'],
	title: string,
	message: string
) => {
	notification.set({ show: true, kind, title, message });
	setTimeout(() => {
		notification.set({ show: false, kind: 'info', title: '', message: '' });
	}, 3000);
};

export const notify = {
	success: (message: string, title = 'Success') => {
		showNotification('success', title, message);
	},
	error: (message: string, title = 'Error') => {
		showNotification('error', title, message);
	},
	warning: (message: string, title = 'Warning') => {
		showNotification('warning', title, message);
	},
	info: (message: string, title = 'Info') => {
		showNotification('info', title, message);
	}
};

export default notification;
