import { NEW_NOTIFICATION, CLEAR_NOTIFICATION } from "../constants/notifications.constants";

export function newNotification(text, type) {
	return {
		type: NEW_NOTIFICATION,
    value: text,
    notificationType: type
	};
}

export function clearNotification(id) {
	return {
		type: CLEAR_NOTIFICATION,
    value: id
	};
}
