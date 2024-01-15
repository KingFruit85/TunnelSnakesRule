import { Player } from "../../models/Player";
import { GameSession } from "../../models/Session";

export interface AddSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    addNewSession: (session: string) => void;
    setNewSessionPlayers: (players: string[]) => void;
    avaliblePlayers: Player[];

}