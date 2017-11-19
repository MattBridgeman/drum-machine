import { CHANGE_TRACK_TITLE } from "../constants/meta.constants";

export function changeTrackTitle(title) {
	return {
		type: CHANGE_TRACK_TITLE,
		title
	};
}