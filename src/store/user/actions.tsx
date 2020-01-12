import { Action, ActionCreator } from "redux";

export const getType = <A extends Action>(
  action: ActionCreator<A>
): Action["type"] => action().type;

export interface LoadUserAction extends Action<"LOAD_USER"> {
  payload: {
    userId: string;
  };
}

export const loadUserAction = ({
  userId
}: LoadUserAction["payload"]): LoadUserAction => ({
  type: "LOAD_USER",
  payload: {
    userId
  }
});

export interface SetUserAction extends Action<"SET_USER"> {
  payload: {
    userId: string;
  };
}

export const setUserAction = ({
  userId
}: SetUserAction["payload"]): SetUserAction => ({
  type: "SET_USER",
  payload: {
    userId
  }
});
