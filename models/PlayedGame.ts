import { PlayerScore } from "./PlayerScore";

export interface PlayedGame {
    id: string;
    name: string;
    playersAndScores: PlayerScore[];
    notes: string;
};