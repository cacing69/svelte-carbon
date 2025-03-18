

interface NotificationState {
	show: boolean;
	kind: 'error' | 'success' | 'warning' | 'info';
	title: string;
	message: string;
}

const duration = 3000;

export const  notification = $state<NotificationState>({
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

	notification.show = true;
	notification.kind = kind;
	notification.title = title;
	notification.message = message;


	setTimeout(() => {
		notification.show = false;
		notification.kind = 'info';
		notification.title = '';
		notification.message = '';
	}, duration);
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
