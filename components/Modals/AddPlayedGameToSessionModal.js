import { useState, useEffect } from "react";
import {
  Button,
  DialogTrigger,
  Modal,
  Dialog,
  Heading,
  ListBox,
  ListBoxItem,
  Select,
  SelectValue,
  ComboBox,
  Popover,
  Label,
  Input,
} from "react-aria-components";

import LeaderBoard from "../WinConditions/LeaderBoard";
import CoOperative from "../WinConditions/CoOperative";
import TeamBased from "../WinConditions/TeamBased";
import "../../styles/styles.css";

const AddPlayedGameToSessionModal = ({
  isOpen,
  boardgames,
  onClose,
  addNewPlayedGameToSession,
  setNewGameName,
  getGameDetails,
  players,
  saveGameResults,
}) => {
  let [selected, setSelected] = useState();
  let [selectedGame, setSelectedGame] = useState();
  const [gameWinCondition, setGameWinCondition] = useState();
  const [gameResults, setGameResults] = useState([]);


  useEffect(() => {
    saveGameResults(gameResults);
  },[gameResults])

  useEffect(() => {

    setNewGameName(selected);
  }, [selected]);

  const selectionHandler = async (e) => {
    if (e) {
      const game = boardgames.find((game) => game.id === e);
      if (game && game.name) {
        setGameWinCondition(game.winCondition);
        setSelected(game.name);
        setSelectedGame(game);
      }
    }
  };

  const handleSubmit = () => {
    addNewPlayedGameToSession(selected);
    setSelected(selected);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal-container p-12 bg-black border border-white flex-col justify-start items-start gap-8 inline-flex">
      <div className="flex-col justify-start items-start gap-5 flex items-center">
        <div className=" flex gap-3 text-white text-[32px] font-semibold font-['Montserrat']">
        <Button>
            <img src="./Icons/Camera.svg" alt="Add result" />
          </Button>
          <div>Add Result</div>
          <Button>
            <img src="./Icons/Paper.svg" alt="Add result" />
          </Button>
        </div>
        <ComboBox
          aria-label="games"
          inputValue={selected}
          defaultItems={boardgames}
          selectedKey={selected}
          onSelectionChange={selectionHandler}
        >
          <Label>Game:</Label>
          <div>
            <Input />
            <Button>▼</Button>
          </div>
          <Popover className="bg-black border">
            <ListBox>
              {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
            </ListBox>
          </Popover>
        </ComboBox>
        {/* <div className="text-lime-500 text-2xl font-semibold font-['Montserrat']">
          Azul
        </div> */}
      </div>

      {gameWinCondition === "Leaderboard" ? (
        <LeaderBoard players={players} results={setGameResults} />
      ) : (
        <div></div>
      )}
      {gameWinCondition === "Co-operative" ? (
        <CoOperative players={players} />
      ) : (
        <div></div>
      )}
      {gameWinCondition === "Team based" ? (
        <TeamBased players={players} results={setGameResults} />
      ) : (
        <div></div>
      )}

      <div className=" flex-col justify-start items-start gap-5 flex ">
        <Button
          onPress={handleSubmit}
          className="self-stretch px-5 py-2.5 bg-black rounded-sm border border-lime-500 justify-center items-center gap-3 inline-flex"
        >
          <img src="./Icons/ButtonPlus.svg" alt="Add result" />

          <div className="text-lime-500 text-base font-medium font-['Montserrat']">
            Add result
          </div>
        </Button>
        <Button
          onPress={handleClose}
          className="self-stretch px-5 py-2.5 bg-black rounded-sm border border-orange-500 justify-center items-center gap-3 inline-flex"
        >
          <div className="text-orange-500 text-base font-medium font-['Montserrat']">
            Cancel
          </div>
        </Button>
      </div>
    </div>
  );
};
export default AddPlayedGameToSessionModal;
