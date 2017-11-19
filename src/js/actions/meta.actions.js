import { CHANGE_TRACK_TITLE, CHANGE_TRACK_CREATED_DATE, CHANGE_TRACK_UPDATED_DATE } from "../constants/meta.constants";

export function changeTrackTitle(title) {
	return {
		type: CHANGE_TRACK_TITLE,
		title
	};
};

export function changeTrackCreatedDate(createdDate) {
	return {
		type: CHANGE_TRACK_CREATED_DATE,
		createdDate
	};
};

export function changeTrackUpdatedDate(updatedDate) {
	return {
		type: CHANGE_TRACK_UPDATED_DATE,
		updatedDate
	};
};