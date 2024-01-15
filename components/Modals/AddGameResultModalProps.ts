import { Game } from "../../models/Game";
import { Player } from "../../models/Player";
import { PlayerScore } from "../../models/PlayerScore";
import { Team } from "../Enums/Team";

export interface AddGameResultModalProps {
    boardgames: Game[];
  onClose: () => void;
  addNewPlayedGameToSession: ({}:any) => void;
  setNewGameName: (gameName: string) => void;
  players: Player[];
  saveGameResults: (playerScores: PlayerScore[]) => void;

}