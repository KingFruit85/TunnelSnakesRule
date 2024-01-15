import { Player } from "../../models/Player";
import { TeamScore } from "../../models/TeamScore";


export interface TeamRowProps {
    players: Player[];
    deleteTeam: (id: number) => void;
    id:number;
    updateTeam: (id:number, players: TeamScore) => void;
    checkTeamScore: () => void;
    
}