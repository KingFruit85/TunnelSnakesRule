import { ScoringType } from "../Enums/ScoringType";

export interface AddGameModalProps {
    onClose: () => void;
    addNewGame: () => void;
    setNewBoardgameName: (name: string) => void;
    setNewBoardgameWinCondition: (winCondition: ScoringType) => void;
}