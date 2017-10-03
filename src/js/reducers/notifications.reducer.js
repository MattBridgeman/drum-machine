import { 
    NEW_NOTIFICATION,
    CLEAR_NOTIFICATION
} from "../constants/notifications.constants";
import { unique } from "../library/natives/numbers";

const initialState = [];
let idGenerator = unique();

export default function notifications(state = initialState, action) {
	switch (action.type) {
		case NEW_NOTIFICATION:
			return [{
        id: idGenerator(),
        value: action.value,
        notificationType: action.notificationType || "timeout"
      }, ...state];
		case CLEAR_NOTIFICATION:
			return state.filter(({id}) => id !== action.value);
		default:
			return state;
	}
}