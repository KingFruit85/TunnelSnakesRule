import { Timestamp } from "firebase/firestore";
import { PlayedGame } from "../../models/PlayedGame";
import { Player } from "../../models/Player";

export interface CurrentSessionProps {
    currentSession: {
      date: Timestamp;
      name: string;
      gamesPlayed: PlayedGame[];
      players: Player[];
    };
    toggleAddPlayedGameToSessionModal: () => void;
    endSession: () => void;
  }