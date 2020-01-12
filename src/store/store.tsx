import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";

import appSagas from "./sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history) // for dispatching history actions
        // ... other middlewares ...
      )
    )
  );

  sagaMiddleware.run(appSagas);

  return store;
}
