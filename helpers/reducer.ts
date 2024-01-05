import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { GameSession } from "../models/Session";
import { TeamScore } from "../models/TeamScore";

export enum ActionTypes {
  isLoading,
  sessions,
  setCurrentSession,
  newPlayerName,
  newSessionName,
  newSessionPlayers,
  setSessionGames,
  openAddNewPlayerModal,
  openAddNewSessionModal,
  openAddNewGameModal,
  setNewGameName,
  openAddNewGameToSessionModal,
  players,
  avalibleBoardgames,
  addCurrentSessionNewGameName,
  addCurrentSessionGameResults,
  setGameWinCondition,
  addNewSession,
  setNewSessionPlayerIds,
  endCurrentSession,
}

export type ActionTypeWithPayload = {
  type: ActionTypes;
  payload: any;
};

export type State = {
  isLoading: boolean;
  sessions: GameSession[];
  currentSession: GameSession | null;
  OpenAddNewPlayerModal: boolean;
  openAddNewGameToSessionModal: boolean;
  newPlayerName: string;
  newSessionName: string;
  newSessionPlayers: string[];
  setSessionGames: string[];
  openAddNewSessionModal: boolean;
  openAddNewGameModal: boolean;
  players: Player[];
  avalibleBoardgames: Game[];
  newGameName: string;
  sessionPicture: string;
  newGameWinCondition: string;
  newSessionPlayerIds: string[];
  newGameResults: any;
  currentSessionNewGameName: string;
  currentSessionGameResults: TeamScore[];

};

export const initialState: State = {
  isLoading: true,
  sessions: [],
  currentSession: null,
  OpenAddNewPlayerModal: false,
  openAddNewGameToSessionModal: false,
  newPlayerName: "",
  newSessionName: "",
  newSessionPlayers: [],
  setSessionGames: [],
  openAddNewSessionModal: false,
  openAddNewGameModal: false,
  players: [],
  avalibleBoardgames: [],
  newGameName: "",
  currentSessionNewGameName: "",
  currentSessionGameResults: [],
  sessionPicture: "",
  newGameWinCondition: "",
  newSessionPlayerIds: [],
  newGameResults: [],
};

export function reducer(state: State, action: ActionTypeWithPayload) {
  // console.log(`dispatching ${action.type} with payload`, action.payload);
  switch (action.type) {
    case ActionTypes.isLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.sessions:
      return {
        ...state,
        sessions: action.payload,
      };
    case ActionTypes.setCurrentSession:
      return {
        ...state,
        currentSession: action.payload,
      };
    case ActionTypes.openAddNewPlayerModal:
      return {
        ...state,
        OpenAddNewPlayerModal: action.payload,
      };
    case ActionTypes.newPlayerName:
      return {
        ...state,
        newPlayerName: action.payload,
      };
    case ActionTypes.newSessionPlayers:
      return {
        ...state,
        newSessionPlayers: action.payload,
      };
    case ActionTypes.openAddNewSessionModal:
      return {
        ...state,
        openAddNewSessionModal: action.payload,
      };
    case ActionTypes.openAddNewGameModal:
      return {
        ...state,
        openAddNewGameModal: action.payload,
      };
    case ActionTypes.avalibleBoardgames:
      return {
        ...state,
        avalibleBoardgames: action.payload,
      };
    case ActionTypes.setNewGameName:
      return {
        ...state,
        newGameName: action.payload,
      };
    case ActionTypes.newSessionName:
      return {
        ...state,
        newSessionName: action.payload,
      };
    case ActionTypes.players:
      return {
        ...state,
        players: action.payload,
      };
    case ActionTypes.addNewSession:
      return {
        ...state,
        currentSession: action.payload,
        newSessionName: "",
        newSessionPlayers: [],
        setSessionGames: [],
        openAddNewSessionModal: false,
        sessionPicture: "",
      };
    case ActionTypes.openAddNewGameToSessionModal:
      return {
        ...state,
        openAddNewGameToSessionModal: action.payload,
      };
    case ActionTypes.setGameWinCondition:
      return {
        ...state,
        newGameWinCondition: action.payload,
      };
    case ActionTypes.setNewSessionPlayerIds:
      return {
        ...state,
        newSessionPlayerIds: action.payload,
      };
    case ActionTypes.addCurrentSessionGameResults:
      return {
        ...state,
        currentSessionGameResults: action.payload,
      };
    case ActionTypes.addCurrentSessionNewGameName:
      return {
        ...state,
        currentSessionNewGameName: action.payload,
      };
    case ActionTypes.endCurrentSession:
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          ended: action.payload,
        }
      };
    
    default:
      return state;
  }
}
