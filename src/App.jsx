import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/navigation";
import RegisterPage from "./pages/RegisterPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import DetailPage from "./pages/DetailPage";
import LeaderboardPage from "./pages/LeaderboardPage"; 

const selectAuthUser = (state) => state.authUser;
const selectIsPreload = (state) => state.isPreload;

function App() {
  const authUser = useSelector(selectAuthUser);
  const isPreload = useSelector(selectIsPreload);

  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    const timeoutId = setTimeout(handleStart, 0); 
    const timeoutIdComplete = setTimeout(handleComplete, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutIdComplete);
    };
  }, [location]);

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
      {loading && <div className="loading-bar" style={{ width: "100%", height: "4px", backgroundColor: "red", position: "fixed", top: 0, left: 0 }}></div>}
      <div className="app-container">
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
