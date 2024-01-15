import { Game } from "../../models/Game";
import { Player } from "../../models/Player";
import { PlayerScore } from "../../models/PlayerScore";
import { ScoringAim } from "../Enums/ScoringAim";
import { ScoringType } from "../Enums/ScoringType";
import { Team } from "../Enums/Team";

export interface GenericResultProps {
    players: Player[];
    results: (result: PlayerScore[]) => void;
    setScoringAim: (aim: ScoringAim | null) => void;
    setScoringType: (type: ScoringType) => void;
    setWinningTeam: (team: Team | null) => void;
    setPlayersWon: (playersWon: boolean | null) => void;
    game: Game | null;
}