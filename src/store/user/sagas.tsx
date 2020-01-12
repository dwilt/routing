import { takeLatest, call, put } from "redux-saga/effects";
import {
  getType,
  loadUserAction,
  LoadUserAction,
  setUserAction
} from "./actions";

type ThenArg<T> = T extends Promise<infer U> ? U : T;

const fetchUser = async (userId: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userId);
    }, 2000);
  });
};

export default function* userSaga() {
  yield takeLatest("LOAD_USER", function*({
    payload: { userId }
  }: LoadUserAction) {
    console.log("userId :", userId);
    const user = yield call(fetchUser, userId);

    yield put(
      setUserAction({
        userId: user
      })
    );
  });
}
