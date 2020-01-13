import { takeLatest, call, put } from "redux-saga/effects";
import { ResetUserAction, LoadUserAction, setUserAction } from "./actions";

type ThenArg<T> = T extends Promise<infer U> ? U : T;

const fetchUser = async (userId: string): Promise<string> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(userId);
    }, 2000);
  });

export default function* userSaga() {
  yield takeLatest(["LOAD_USER", "RESET_USER"], function*(
    action: LoadUserAction | ResetUserAction
  ) {
    // this is a key. both the "LOAD_USER" and "RESET_USER" events fire this saga with a takeLatest
    // Meaning, if multiple "LOAD_USER"/"RESET_USER" requests come in, only the latest pervails
    // this allows us to capture if the user leaves the modal, which fires the resetUserAction,
    // and prevents an in-flight call to the server to complete and update the redux state with stale info
    if (action.type === "RESET_USER") {
      return;
    }

    const {
      payload: { userId }
    } = action;

    const user: ThenArg<ReturnType<typeof fetchUser>> = yield call(
      fetchUser,
      userId
    );

    yield put(
      setUserAction({
        userId: user
      })
    );
  });
}
