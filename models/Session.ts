import { Timestamp } from "firebase/firestore";
import { PlayedGame } from "./PlayedGame";
import { Player } from "./Player";
import { ScoringType } from "../components/Enums/ScoringType";
import { ScoringAim } from "../components/Enums/ScoringAim";

export interface GameSession {
    date: Timestamp;
    gamesPlayed: PlayedGame[];
    players: Player[];
    name: string;
    id: string;
    ended: boolean;
    scoringAim: ScoringAim;
    scoringType: ScoringType;
  }