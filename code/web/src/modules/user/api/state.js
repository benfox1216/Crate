// App Imports
import { isEmpty } from "../../../setup/helpers";
import {
	SET_USER,
	ADD_STYLE,
	LOGIN_REQUEST,
	LOGIN_RESPONSE,
	LOGOUT,
} from "./actions";

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null,
};

// State
export default (state = userInitialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.user),
				details: action.user,
			};

		case LOGIN_REQUEST:
			return {
				...state,
				error: null,
				isLoading: action.isLoading,
			};

		case LOGIN_RESPONSE:
			return {
				...state,
				error: action.error,
				isLoading: false,
			};

		case LOGOUT:
			return {
				...state,
				error: null,
				isLoading: false,
				isAuthenticated: false,
				details: null,
			};

		case ADD_STYLE:
			return {
				...state,
				details: { ...state.details, style: action.style },
			};

		default:
			return state;
	}
};
