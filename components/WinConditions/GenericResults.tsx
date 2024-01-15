import React, { useEffect, useState } from "react";
import PlayerRow from "./PlayerRow";
import { PlayerScore } from "../../models/PlayerScore";
import { GenericResultProps } from "./GenericResultsProps";
import {
  Key,
  Label,
  Radio,
  RadioGroup,
} from "react-aria-components";
import { ScoringAim } from "../Enums/ScoringAim";
import { ScoringType } from "../Enums/ScoringType";
import { Winner } from "../Enums/Winner";
import { Team } from "../Enums/Team";

const GenericResults = (props: GenericResultProps) => {
  const { players, results, setScoringAim, setScoringType, setWinningTeam, setPlayersWon, game } = props;

  const [playerScores, setPlayerScores] = useState<PlayerScore[]>(
    [] as PlayerScore[]
  );

  const [gameScoring, setGameScoring] = useState<Key | null>(null);
  const [scoreAim, setScoreAim] = useState<ScoringAim>(ScoringAim.HIGH);
  const [winningTeam, setSetWinningTeam] = useState<Team | null>(null);
  const [didThePlayersWin, setDidThePlayersWin] = useState<boolean | null>(null);

  useEffect(() => {
    setGameScoring(game?.winCondition as Key);
  }, [game]);

  console.log("gameScoring", gameScoring);

  useEffect(() => {
    setPlayersWon(didThePlayersWin);
  }, [didThePlayersWin]);

  useEffect(() => {
    setWinningTeam(winningTeam);
  }, [winningTeam]);
  
  useEffect(() => {
    setScoringType(game?.winCondition as ScoringType);
  }, [gameScoring]);

  useEffect(() => {
    setScoringAim(scoreAim);
  }, [scoreAim]);

  useEffect(() => {
    const newPlayerScore = players.map(
      (player) =>
        ({
          name: player.name,
          score: 0,
          team: "",
        } as PlayerScore)
    );

    setPlayerScores(newPlayerScore);
  }, []);

  useEffect(() => {
    results(playerScores);
  }, [playerScores]);

  const updatePlayerScores = (index: number, playerDetails: PlayerScore) => {
    setPlayerScores(
      playerScores.map((player, idx) =>
        idx === index ? playerDetails : player
      )
    );
  };

  const checkPlayerScores = () => {
    if (playerScores.length === 0) return;

    // Update the winner property for each player
    const updatedPlayers = playerScores.map((player) => ({
      ...player,
    }));

    setPlayerScores(updatedPlayers);
  };

  const handleWinnerRadioChange = (winner: Winner) => {

    switch (winner) {
      case Winner.GAME: setDidThePlayersWin(false);break;
      case Winner.PLAYERS: setDidThePlayersWin(true);break;
    }
  };

  return (
    <div className="add-results-container">
      <div className="add-results-top-row">

        {gameScoring == ScoringType.TEAM && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Label>Which Team won?</Label>

            <RadioGroup
              onChange={(value: string) => setSetWinningTeam(value as Team)}
              aria-label="winning-team"
              defaultValue={scoreAim}
            >
              <Radio value={Team.TEAM_ONE}>{Team.TEAM_ONE}</Radio>
              <Radio value={Team.TEAM_TWO}>{Team.TEAM_TWO}</Radio>
              <Radio value={Team.TEAM_THREE}>{Team.TEAM_THREE}</Radio>
              <Radio value={Team.TEAM_FOUR}>{Team.TEAM_FOUR}</Radio>
              <Radio value={Team.TIE}>{Team.TIE}</Radio>
            </RadioGroup>
          </div>
        )}

        {gameScoring == ScoringType.LEADERBOARD && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Label>Score aim</Label>

            <RadioGroup
              onChange={(value: string) => setScoreAim(value as ScoringAim)}
              aria-label="score-aim"
              defaultValue={scoreAim}
            >
              <Radio value={ScoringAim.HIGH}>High</Radio>
              <Radio value={ScoringAim.LOW}>Low</Radio>
            </RadioGroup>
          </div>
        )}

        {gameScoring == ScoringType.COOP && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Label>Winner</Label>

            <RadioGroup
              onChange={(value: string) => handleWinnerRadioChange(value as Winner)}
              aria-label="game-winner"
              defaultValue={scoreAim}
            >
              <Radio value={Winner.GAME}>{Winner.GAME}</Radio>
              <Radio value={Winner.PLAYERS}>{Winner.PLAYERS}</Radio>
            </RadioGroup>
          </div>
        )}
      </div>

      {gameScoring && (
        <div className="add-results-bottom-row">
        <div className="add-results-players-player-row-headers">
          {gameScoring && <Label>Player</Label>}
          {gameScoring === ScoringType.LEADERBOARD && <Label>Score</Label>}
          {gameScoring === ScoringType.TEAM && <Label>Team</Label>}
        </div>

        <div className="add-result-divider" />

        {players.map((player, index) => (
          <PlayerRow
            key={player.id || index}
            player={player}
            id={index}
            updatePlayer={updatePlayerScores}
            checkPlayerScores={checkPlayerScores}
            gameScoring={gameScoring}
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default GenericResults;
