import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FootballScoreWidget = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");

  //  la clé API Football-Data.org

   const apiKey = 'TON_API_KEY'; 

  useEffect(() => {
    fetchFootballScores();
  }, []);

  const fetchFootballScores = async () => {
    try {
      const response = await axios.get('https://www.thesportsdb.com//api/v1/json/3/searchteams.php?t=Chelsea', {
        headers: { 'X-Auth-Token': apiKey }
      });
      setMatches(response.data.matches);
      setError("");
    } catch (error) {
      setError("Erreur lors de la récupération des scores");
    }
  };

  return (
    <div className="football-score-widget: mt-10 ml-5 border border-5 w-96 shadow-md">
      <h2>Scores des matchs de football</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {matches.length > 0 ? (
          matches.map((match) => (
            <li key={match.id} className="match-item">
              <p>{match.homeTeam.name} vs {match.awayTeam.name}</p>
              <p>Score : {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}</p>
              <p>Date : {new Date(match.utcDate).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>Chargement des scores...</p>
        )}
      </ul>
    </div>
  );
};

export default FootballScoreWidget;
