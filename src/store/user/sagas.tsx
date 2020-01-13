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
