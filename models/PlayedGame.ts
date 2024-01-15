import { ScoringType } from "../components/Enums/ScoringType";
import { Team } from "../components/Enums/Team";
import { PlayerScore } from "./PlayerScore";

export interface PlayedGame {
    id: string;
    gameName: string;
    playerScores: PlayerScore[];
    notes: string;
    scoringDirection: string | null;
    gameScoringType: ScoringType | null;
    winningTeam: Team | null; 
    playersWon: boolean | null;
    image: string | null;
};