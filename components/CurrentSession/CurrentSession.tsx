import { Button, Input } from "react-aria-components";
import { PlayedGame } from "../../models/PlayedGame";
import { CurrentSessionProps } from "./CurrentSessionProps";

import "../../styles/styles.css";
import { ScoringType } from "../Enums/ScoringType";
import { useRef, useState } from "react";

export const CurrentSession = (props: CurrentSessionProps) => {
  const { currentSession, toggleAddPlayedGameToSessionModal, endSession } =
    props;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof event);
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImageFile(file); // Set the selected file
    }
  };

  const playerNames = currentSession.players
    .map((player) => player.name)
    .join(", ");

  const calculateWinner = (game: PlayedGame) => {
    let score = 0 as number;
    let player = "";

    if (game.gameScoringType === ScoringType.COOP) {
      if (game.playersWon) {
        return <span key={game.id}>The players won!</span>;
      } else {
        return <span key={game.id}>The game won</span>;
      }
    }

    if (game.gameScoringType === ScoringType.TEAM) {
      const pre =
        game.winningTeam === "Tie"
          ? "The teams tied! "
          : `Team ${game.winningTeam} won! `;

      return <span key={game.id}>{pre}</span>;
    }

    if (game.gameScoringType === ScoringType.LEADERBOARD) {
      if (game.scoringDirection === "High") {
        score = game.playerScores.sort((a, b) => b.score - a.score)[0]
          .score as number;
        player = game.playerScores.sort((a, b) => b.score - a.score)[0]
          .name as string;

        return (
          <span key={game.id}>
            {player} won with {score} points
          </span>
        );
      }

      if (game.scoringDirection === "Low") {
        score = game.playerScores.sort((a, b) => a.score - b.score)[0]
          .score as number;
        player = game.playerScores.sort((a, b) => a.score - b.score)[0]
          .name as string;

        return (
          <span key={game.id}>
            {player} won with {score} points
          </span>
        );
      }
    }
  };

  return (
    <div className="current-session-container ">
      <div className="header-text">Current Session</div>
      <div className="current-session ">
        <div className="current-session-info ">
          <div className="current-session-info-group">
            <Input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              ref={fileInputRef}
              accept="image/"
            />
            <Button
              onPress={() =>
                (fileInputRef.current as unknown as HTMLInputElement)?.click()
              }
            >
              <img src="./Icons/Camera.svg" alt="Add image" />
            </Button>
            <div className="current-session-info-date">
              {currentSession.date
                ? currentSession.date.toDate().toLocaleDateString()
                : "No session date"}
            </div>

            <div className="current-session-info-name">
              {currentSession.name}
            </div>
          </div>

          <div className="current-session-info-boardgame-number">
            <img src="./Icons/Dice.svg" alt="Add new session" />
            {currentSession.gamesPlayed.length}
          </div>
        </div>
        <p className="current-session-playernames ">{playerNames}</p>
        <div style={{width:"30em", border:"3px solid white"}}>
        {imageFile && (
          <img src={URL.createObjectURL(imageFile)} alt="Game result" />
        )}
        </div>
        <div className="current-session-games-list ">
          <ul>
            {currentSession.gamesPlayed.map((game: PlayedGame) => (
              <li key={game.id} className="current-session-games-list-item">
                <div className="current-session-games-list-item-player-number-icon">
                  <img src="./Icons/Players.svg" alt="number of players" />
                  <div className="current-session-games-list-item-player-number">
                    {game.playerScores.length}
                  </div>
                </div>
                <div className="current-session-games-list-item-result-text">
                  -
                </div>
                <div className="current-session-games-list-item-result-text">
                  {game.gameName}
                </div>
                <div className="current-session-games-list-item-result-text">
                  -
                </div>
                <div className="current-session-games-list-item-result-text">
                  <span key={game.id}>{calculateWinner(game)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="current-session-buttons">
          <Button
            onPress={toggleAddPlayedGameToSessionModal}
            className="green-button"
          >
            <img src="./Icons/Trophy.svg" alt="Add new session" />
            <div className="current-session-button-text">Add result</div>
          </Button>
          <div>
            <Button onPress={endSession} className="red-button">
              {/* <img src="./Icons/Time.svg" alt="Add new session" /> */}
              End session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
