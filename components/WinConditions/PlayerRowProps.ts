import { Key } from "react-aria-components";
import { Player } from "../../models/Player";
import { PlayerScore } from "../../models/PlayerScore";

export interface PlayerRowProps {
    player: Player;
    id:number;
    updatePlayer: (index: number, player: PlayerScore) => void;
    checkPlayerScores: () => void;
    gameScoring: Key | null;
}