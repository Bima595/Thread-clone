import { useState, useEffect } from "react";
import api from "../utils/api";
import "../styles/Leaderboard.css";
function LeaderboardPage() {
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const leaderboardsData = await api.getLeaderboards();
        setLeaderboards(leaderboardsData);
      } catch (error) {
        console.error("Failed to fetch leaderboards:", error);
      }
    };

    fetchLeaderboards();
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <ul>
        {leaderboards.map((leaderboard) => (
          <li key={leaderboard.id}>
            <img src={leaderboard.avatar} alt={leaderboard.name} />
            <span>{leaderboard.name}</span>
            <span>{leaderboard.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderboardPage;
