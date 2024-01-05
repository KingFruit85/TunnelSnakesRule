import React, { useState, useEffect } from "react";

import { Input } from "react-aria-components";

const PlayerRow = ({ player, id, updatePlayer, checkPlayerScores }) => {
  const [playerScore, setPlayerScore] = useState(0);

  const notifyChange = () => {
    const playerDetails = {
      playerName: player.name,
      score: playerScore,
      winner: false,
    };
    updatePlayer(id, playerDetails);
  };

  const handleScoreChange = (event) => {
    setPlayerScore(event.target.value);
    checkPlayerScores();
  };

  useEffect(() => {
    notifyChange();
  }, [playerScore]);

  return (
    <div style={{ width: 479, height: 32, position: "relative" }}>
      <div
        style={{
          left: 0,
          top: 4,
          position: "absolute",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 12,
          display: "inline-flex",
        }}
      >
        <img
          src="./PlayerImagesHolly.svg"
          alt="player icon"
          style={{
            width: 35,
            height: 35,
            borderRadius: 9999,
            position: "relative",
          }}
        />
        <div
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "Montserrat",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {player.name}
        </div>
      </div>
      <div
        style={{
          width: 115,
          left: 216.5,
          top: 0,
          position: "absolute",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 20,
          display: "inline-flex",
        }}
      >
        <Input
          onChange={handleScoreChange}
          style={{
            flex: "1 1 0",
            color: "white",
            fontSize: 16,
            fontFamily: "Montserrat",
            fontWeight: "400",
            wordWrap: "break-word",
            backgroundColor: "black",
            alignSelf: "stretch",
            flex: "1 1 0",
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 6,
            paddingBottom: 6,
            background: "#141813",
            borderRadius: 2,
            border: "1px white solid",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
            display: "inline-flex",
          }}
        />
      </div>
      <Input
        type="radio"
        style={{
          width: 24,
          height: 24,
          left: 410,
          top: 5,
          position: "absolute",
          background: "#141813",
          borderRadius: 29,
          border: "1px white solid",
        }}
      />
    </div>
  );
};

export default PlayerRow;
