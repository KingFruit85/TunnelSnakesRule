import { PlayerScore } from "./PlayerScore";
import { TeamScore } from "./TeamScore";

export interface PlayedGame {
    id: string;
    name: string;
    results: TeamScore[];
    notes: string;
};