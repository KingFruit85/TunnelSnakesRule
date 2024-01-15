import React, { useState, useEffect, ChangeEvent } from "react";

import {
  Button,
  ComboBox,
  Input,
  Key,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { PlayerRowProps } from "./PlayerRowProps";
import { PlayerScore } from "../../models/PlayerScore";
import MyCheckbox from "../Modals/MyCheckbox";
import { ScoringType } from "../Enums/ScoringType";

export const PlayerRow = (props: PlayerRowProps): JSX.Element => {
  const { player, id, updatePlayer, gameScoring } = props;

  const [playerScore, setPlayerScore] = useState<number>(0);
  const [playerTeam, setPlayerTeam] = useState<Key | null>(null);
  const [isPlaying, setIsPlaying] = useState<String>(player.id);

  const notifyChange = () => {
    if (isPlaying.length > 0) {

      const playerDetails = {
        name: player.name,
        score: playerScore,
        team: playerTeam,
      } as PlayerScore;
      updatePlayer(id, playerDetails);
    }
  };

  const handleScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerScore(parseInt(event.target.value));
  };

  useEffect(() => {
    if (isPlaying.length > 0) {
      notifyChange();
    }
  }, [playerScore]);

  return (
    <div className="player-row">
      <MyCheckbox
        text={player.name}
        id={player.id}
        image={player.picture}
        handleCheckboxChange={setIsPlaying}
        isSelected={isPlaying}
      />

      {gameScoring === ScoringType.LEADERBOARD && (
        <Input className={"input"} onChange={handleScoreChange} />
      )}

      {gameScoring === ScoringType.TEAM && (
        <ComboBox
          className="react-aria-ComboBox-small"
          onSelectionChange={setPlayerTeam}
        >
          <div>
            <Input />
            <Button>▼</Button>
          </div>
          <Popover>
            <ListBox>
              <ListBoxItem key={1} id={1}>
                1
              </ListBoxItem>
              <ListBoxItem key={2} id={2}>
                2
              </ListBoxItem>
              <ListBoxItem key={3} id={3}>
                3
              </ListBoxItem>
              <ListBoxItem key={4} id={4}>
                4
              </ListBoxItem>
            </ListBox>
          </Popover>
        </ComboBox>
      )}
    </div>
  );
};
export default PlayerRow;
