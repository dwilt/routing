import React, { useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { resetUserAction, loadUserAction } from "../store/user/actions";
import { useSelector, useDispatch } from "react-redux";
import { userIsLoadingSelector, userIdSelector } from "../store/user/selectors";

export default function ModalGalleryExample() {
  return <ModalSwitch />;
}

function ModalSwitch() {
  return (
    <div>
      <Switch>
        <Route exact path={["/", "/user/:userId"]} children={<Home />} />
        <Route
          exact
          path={["/gallery", "/gallery/user/:userId"]}
          children={<Gallery />}
        />
      </Switch>
      <Route
        path={["/gallery/user/:userId", "/user/:userId"]}
        children={<Modal />}
      />
    </div>
  );
}

function Home() {
  return (
    <div>
      <Link to="/gallery">Visit the Gallery</Link>
      <h2>Featured Users</h2>
      <ul>
        <li>
          <Link to={`/user/dan-wilt`}>Dan Wilt</Link>
        </li>
      </ul>
    </div>
  );
}

function Gallery() {
  const { url } = useRouteMatch();

  return (
    <div>
      <h2>Users</h2>
      <Link to="/">Back to home</Link>
      <ul>
        <li>
          <Link to={`${url}/user/dan-wilt`}>Dan Wilt</Link>
        </li>
        <li>
          <Link to={`${url}/user/stu-pitt`}>Stu Pitt</Link>
        </li>
      </ul>
    </div>
  );
}

function Modal() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { url } = useRouteMatch();
  const isLoading = useSelector(userIsLoadingSelector);

  useEffect(
    () => () => {
      // This resets the user reducer when it unmounts
      dispatch(resetUserAction());
    },
    [dispatch]
  );

  useEffect(() => {
    if (userId) {
      // fetches the user on load AND if the userId changes
      dispatch(loadUserAction({ userId }));
    }
  }, [userId, dispatch]);

  const user = useSelector(userIdSelector);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}
    >
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <h1>{isLoading ? "loading!" : user}</h1>
        <Link to={url.split(/\/user/)[0]}>Close</Link>
      </div>
    </div>
  );
}
