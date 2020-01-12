import { LocationChangeAction } from "connected-react-router";
import { LoadUserAction, SetUserAction } from "./actions";

type Actions = LocationChangeAction | LoadUserAction | SetUserAction;

interface UserState {
  userId: null | string;
  loading: boolean;
}

const initialState: UserState = {
  userId: null,
  loading: false
};

export default function something(state = initialState, action: Actions) {
  switch (action.type) {
    case "SET_USER": {
      const { userId } = action.payload;

      return {
        ...state,
        loading: false,
        userId
      };
    }

    case "LOAD_USER": {
      return {
        ...state,
        userId: null,
        loading: true
      };
    }

    default:
      return state;
  }
}
