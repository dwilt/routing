import React, { useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "../store/user/actions";
import { userIdSelector, userIsLoadingSelector } from "../store/user/selectors";

export default function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path={["/users"]}>
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function User() {
  const dispatch = useDispatch();
  let { userId } = useParams();
  const user = useSelector(userIdSelector);
  const isLoading = useSelector(userIsLoadingSelector);

  useEffect(() => {
    if (userId) {
      dispatch(loadUserAction({ userId }));
    }
  }, [userId, dispatch]);

  return <h1>{isLoading ? "loading!" : user}</h1>;
}

function Users() {
  const { url, path } = useRouteMatch();

  return (
    <>
      <h2>Users</h2>
      <ul>
        <li>
          <Link to={`${url}/dan-wilt`}>Dan Wilt</Link>
        </li>
        <li>
          <Link to={`${url}/stu-pitt`}>Stu Pitt</Link>
        </li>
      </ul>
      <Route path={`${path}/:userId`}>
        <User />
      </Route>
    </>
  );
}
