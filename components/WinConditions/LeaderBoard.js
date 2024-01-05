import React, { useEffect, useState } from "react";
import PlayerRow from "./PlayerRow";

const LeaderBoard = ({ players, results }) => {
  const [playerScores, setPlayerScores] = useState([]);

  useEffect(() => {
    results(playerScores);
  }, [playerScores]);

  useEffect(() => {
    const newPlayerScores = players.map(player => ({
      playerName: player.name,
      score: 0,
      winner: false
    }));
  
    setPlayerScores(newPlayerScores);
  }, []);
  

  console.log(playerScores);

  const updatePlayerScores = (index, playerDetails) => {
    setPlayerScores(
      playerScores.map((player, idx) =>
        idx === index ? playerDetails : player
      )
    );
  };

  const checkPlayerScores = () => {
    if (playerScores.length === 0) return;

    const highestScore = Math.max(
      ...playerScores.map((player) => Number(player.score) || 0)
    );

    // Update the winner property for each player
    const updatedPlayers = playerScores.map((player) => ({
      ...player,
      winner: Number(player.score) === highestScore,
    }));

    setPlayerScores(updatedPlayers);
  }

  return (
    <div>
      <div
        style={{
          width: 482,
          height: 217,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 12,
          display: "inline-flex",
        }}
      >
        <div style={{ width: 482, height: 17, position: "relative" }}>
          <div
            style={{
              left: 0,
              top: 0,
              position: "absolute",
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Players
          </div>
          <div
            style={{
              left: 216,
              top: 0,
              position: "absolute",
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Score
          </div>
          <div
            style={{
              left: 410,
              top: 0,
              position: "absolute",
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Winner
          </div>
        </div>
        <div
          className="border"
          style={{
            width: 481,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 32,
            display: "inline-flex",
          }}
        ></div>
        {players.map((player, index) => (
          <PlayerRow
            player={player}
            id={index}
            updatePlayer={updatePlayerScores}
            checkPlayerScores={checkPlayerScores}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
