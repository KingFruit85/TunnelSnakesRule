import { Timestamp } from "firebase/firestore";
import { PlayedGame } from "../../models/PlayedGame";

export interface CurrentSessionProps {
    currentSession: {
      date: Timestamp;
      name: string;
      gamesPlayed: PlayedGame[];
    };
    toggleAddPlayedGameToSessionModal: () => void;
    endSession: () => void;
  }