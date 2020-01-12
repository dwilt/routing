import { all } from "redux-saga/effects";

import userSaga from "./user/sagas";

export default function* appSaga() {
  yield all([userSaga()]);
}
