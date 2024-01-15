import { ScoringType } from "../components/Enums/ScoringType";

export interface Game {
    id: string;
    name: string;
    winCondition: ScoringType;
    picture: string;
  }