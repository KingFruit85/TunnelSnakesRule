import { useState, useEffect, Key, useRef } from "react";
import {
  Button,
  ListBox,
  ListBoxItem,
  ComboBox,
  Popover,
  Label,
  Input,
  TextField,
  TextArea,
} from "react-aria-components";

import "../../styles/styles.css";
import { AddGameResultModalProps } from "./AddGameResultModalProps";
import { Game } from "../../models/Game";
import { PlayerScore } from "../../models/PlayerScore";
import GenericResults from "../WinConditions/GenericResults";
import { ScoringAim } from "../Enums/ScoringAim";
import { ScoringType } from "../Enums/ScoringType";
import { Team } from "../Enums/Team";

const AddGameResultModal = (props: AddGameResultModalProps) => {
  const {
    onClose,
    players,
    boardgames,
    addNewPlayedGameToSession,
    saveGameResults,
    setNewGameName,
  } = props;

  const [selected, setSelected] = useState<string>("");
  const [gameWinCondition, setGameWinCondition] = useState<ScoringType>();
  const [gameScoringAim, setGameScoringAim] = useState<ScoringAim | null>();
  const [gameResults, setGameResults] = useState<PlayerScore[]>();
  const [theWinningTeam, setTheWinningTeam] = useState<Team | null>(null);
  const [playersWon, setPlayersWon] = useState<boolean | null>(null);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof event)
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImageFile(file); // Set the selected file
    }
  }

  useEffect(() => {
    if (gameResults) {
      saveGameResults(gameResults);
    }
  }, [gameResults]);

  useEffect(() => {
    if (selected) {
      setNewGameName(selected);
    }
  }, [selected]);

  const selectionHandler = async (e: string) => {
    if (e) {
      const game = boardgames.find((game) => game.id === e);

      if (game && game.name) {
        setSelectedGame(game);
        setGameWinCondition(game.winCondition);
        setSelected(game.name);
      }
    }
  };

  const handleSubmit = () => {
    const gameResults = {
      gameName: selected,
      gameScoringType: gameWinCondition,
      scoringDirection: gameScoringAim,
      playerScores: players,
      winningTeam: theWinningTeam,
      notes: notes,
      playersWon: playersWon,
      image: imageFile,
    };

    addNewPlayedGameToSession(gameResults);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="add-result-modal-header-container">
      <div className="add-result-modal">
        <div className="add-result-modal-header">
          <div>
            <Input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              ref={fileInputRef}
              accept="image/"
              />
          </div>
          <Button onPress={() => (fileInputRef.current as unknown as HTMLInputElement)?.click()}>
            <img src="./Icons/Camera.svg" alt="Add image" />
          </Button>
          <div>Add Result</div>
          <Button onPress={() => setShowNotes(!showNotes)}>
            <img src="./Icons/Paper.svg" alt="Add note" />
          </Button>
        </div>

        {imageFile && (
          <div style={{width:"30em", border:"3px solid white"}}>
            <img src={URL.createObjectURL(imageFile)} alt="Uploaded image" />
          </div>
        )
        }

        {showNotes && (
          <TextField 
            onChange={setNotes}
            value={notes}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Label>Comment</Label>
            <TextArea className="notesField" />
          </TextField>
        )}

        <ComboBox
          className="react-aria-ComboBox"
          aria-label="games"
          inputValue={selected}
          defaultItems={boardgames}
          selectedKey={selected}
          onSelectionChange={selectionHandler as (key: Key) => any}
        >
          <Label>Game:</Label>
          <div>
            <Input />
            <Button>▼</Button>
          </div>
          <Popover className="bg-black border">
            <ListBox>
              {(item: Game) => <ListBoxItem>{item.name}</ListBoxItem>}
            </ListBox>
          </Popover>
        </ComboBox>

        <GenericResults
          players={players}
          results={setGameResults}
          setScoringAim={(aim: ScoringAim | null) => setGameScoringAim(aim)}
          setScoringType={setGameWinCondition}
          setWinningTeam={setTheWinningTeam}
          setPlayersWon={setPlayersWon}
          game={selectedGame}
        />

        <div className="current-session-buttons">
          <Button className="green-button" onPress={handleSubmit}>
            <img src="./Icons/ButtonPlus.svg" alt="Add result" />

            <div className="green-button-text">Add result</div>
          </Button>
          <Button className="orange-button" onPress={handleClose}>
            <div className="green-button-text">Cancel</div>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddGameResultModal;
