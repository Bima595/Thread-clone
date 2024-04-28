import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/navigation";
import RegisterPage from "./pages/RegisterPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import DetailPage from "./pages/DetailPage";
import LeaderboardPage from "./pages/LeaderboardPage"; // Import LeaderboardPage

const selectAuthUser = (state) => state.authUser;
const selectIsPreload = (state) => state.isPreload;

function App() {
  const authUser = useSelector(selectAuthUser);
  const isPreload = useSelector(selectIsPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="app-container">
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} /> {/* Tambahkan rute ke LeaderboardPage */}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;