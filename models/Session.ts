import { Timestamp } from "firebase/firestore";
import { PlayedGame } from "./PlayedGame";
import { Player } from "./Player";

export interface GameSession {
    date: Timestamp;
    gamesPlayed: PlayedGame[];
    players: Player[];
    name: string;
    id: string;
    ended: boolean;
  }