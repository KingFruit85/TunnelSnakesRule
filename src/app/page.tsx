"use client";
import { useEffect, useReducer, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Button, Link } from "react-aria-components";
import AddPlayerModal from "../../components/Modals/AddPlayerModal";
import AddSessionModal from "../../components/Modals/AddSessionModal";
import AddGameModal from "../../components/Modals/AddGameModal";
import AddGameResultModal from "../../components/Modals/AddGameResultModal";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../../models/Player";
import { GameSession } from "../../models/Session";
import { Game } from "../../models/Game";

import React from "react";
import { PlayedGame } from "../../models/PlayedGame";
import "../../styles/styles.css";

import { ActionTypes, reducer, initialState } from "../../helpers/reducer";
import { CurrentSession } from "../../components/CurrentSession/CurrentSession";
import { PreviousSessions } from "../../components/PreviousSessions/PreviousSessions";
import { PlayerScore } from "../../models/PlayerScore";
import { ScoringType } from "../../components/Enums/ScoringType";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    sessions,
    currentSession,
    OpenAddNewPlayerModal,
    newSessionPlayers,
    setSessionGames,
    openAddNewSessionModal,
    openAddNewGameToSessionModal,
    openAddNewGameModal,
    players,
    avalibleBoardgames,
    newGameName,
    newGameWinCondition,
    newSessionPlayerIds,
    currentSessionNewGameName,
    currentSessionGameResults,
  } = state;

  const [newPlayerPicture, setNewPlayerPicture] = useState("");
  const [newSessionPicture, setSessionPicture] = useState("");
  const [test, setTest] = useState("");

  useEffect(() => {setTest("")}, [currentSession]); // refreshes the current session when a result is added

  const toggleAddNewPlayerModal = () =>
    dispatch({
      type: ActionTypes.openAddNewPlayerModal,
      payload: !OpenAddNewPlayerModal,
    });

  const toggleAddNewSessionModal = () =>
    dispatch({
      type: ActionTypes.openAddNewSessionModal,
      payload: !openAddNewSessionModal,
    });

  const toggleAddNewGameModal = () =>
    dispatch({
      type: ActionTypes.openAddNewGameModal,
      payload: !openAddNewGameModal,
    });

  const setNewSessionName = (name: string) => {
    dispatch({
      type: ActionTypes.newSessionName,
      payload: name,
    });
  };

  const setBoardgameToAdd = (name: string) => {
    dispatch({
      type: ActionTypes.addCurrentSessionNewGameName,
      payload: name,
    });
  };

  const setNewPlayerName = (name: string) => {
    dispatch({
      type: ActionTypes.newPlayerName,
      payload: name,
    });
  };

  const setNewBoardgameWinCondition = (name: string) => {
    dispatch({
      type: ActionTypes.setGameWinCondition,
      payload: name,
    });
  };

  const setNewSessionPlayerIds = (playerIds: string[]) => {
    dispatch({
      type: ActionTypes.setNewSessionPlayerIds,
      payload: playerIds,
    });
  };

  useEffect(() => {
    console.log("newsessionplayeerids useEffect");
    var playersToAdd: Player[] = [];
    newSessionPlayerIds.forEach((id: string) => {
      players.find((player: Player) => {
        if (player.id === id) {
          playersToAdd.push(player);
        }
      });
    });

    dispatch({
      type: ActionTypes.newSessionPlayers,
      payload: playersToAdd,
    });
  }, [newSessionPlayerIds]);

  const setNewGameName = (name: string) => {
    dispatch({
      type: ActionTypes.setNewGameName,
      payload: name,
    });
  };

  const toggleAddPlayedGameToSessionModal = () => {
    dispatch({
      type: ActionTypes.openAddNewGameToSessionModal,
      payload: !openAddNewGameToSessionModal,
    });
    updateCurrentSession();
  };

  const endSession = async () => {
    dispatch({ type: ActionTypes.endCurrentSession, payload: true });
    dispatch({ type: ActionTypes.setCurrentSession, payload: null });

    const sessionQuery = query(
      collection(db, "Session"),
      where("id", "==", currentSession!.id)
    );

    const querySnapshot = await getDocs(sessionQuery);

    if (querySnapshot.empty) {
      throw new Error("Session not found");
    }

    const sessionDoc = querySnapshot.docs[0];

    await updateDoc(sessionDoc.ref, {
      ended: true,
    });
  };

  const fetchSessions = async () => {
    try {
      const sessionCol = collection(db, "/Session/");
      const snapshot = await getDocs(sessionCol);
      const sessionList = snapshot.docs.map((doc) =>
        doc.data()
      ) as GameSession[];

      dispatch({ type: ActionTypes.sessions, payload: sessionList });
      dispatch({ type: ActionTypes.isLoading, payload: false });

      setTest("test");

    } catch (error) {
      console.log("error fetching sessions: " + error);
    }
  };

  useEffect(() => {
    console.log("fetchsessions useEffect");

    fetchSessions();
  }, []);

  useEffect(() => {
    console.log("getboardgames useEffect");

    getBoardgames();
  }, []);

  const updateCurrentSession = async () => {
    const sessionCollection = collection(db, "/Session/");
    const sessionsSnapshot = await getDocs(sessionCollection);
    const sessionList = sessionsSnapshot.docs.map((session) =>
      session.data()
    ) as GameSession[];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    sessionList.find((session) => {
      const sessionDate = session.date.toDate();
      sessionDate.setHours(0, 0, 0, 0);
      sessionDate.getTime() === today.getTime() && !session.ended
        ? (dispatch({ type: ActionTypes.setCurrentSession, payload: session }))
        : null;
    });
  };

  useEffect(() => {
    console.log("updatecurrent session useEffect");

    updateCurrentSession();
  }, []);

  const getBoardgames = async () => {
    try {
      const gameCollection = collection(db, "/Game/");
      const snapshot = await getDocs(gameCollection);
      const gameList = snapshot.docs.map((doc) => doc.data()) as Game[];
      dispatch({ type: ActionTypes.avalibleBoardgames, payload: gameList });
    } catch (error) {
      alert("failed to load games: " + error);
    }
  };
  const getPlayers = async () => {
    try {
      const playerCollection = collection(db, "/Player/");
      const snapshot = await getDocs(playerCollection);
      const playerList = snapshot.docs.map((player) =>
        player.data()

        ) as Player[];
        
      dispatch({ type: ActionTypes.players, payload: playerList });
      getBoardgames();
    } catch (error) {
      toast.error("Failed to load players");
    }
  };

  useEffect(() => {
    console.log("getplayers useEffect");

    getPlayers();
  }, []);

  const addNewPlayer = async (name: string) => {
    var playerAlreadyExists = false;

    if (name === "") {
      alert("Please enter a player name");
      return;
    }

    const player = {
      name: name as String,
      picture: newPlayerPicture || null,
      id: uuidv4(),
    };

    try {
      const playerCollection = collection(db, "/Player/");

      const q = query(playerCollection, where("name", "==", player.name));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        playerAlreadyExists = true;
        throw new Error("Player already exists");
      }

      await addDoc(playerCollection, player);
      setNewPlayerName("");
      setNewPlayerPicture("");
      dispatch({ type: ActionTypes.openAddNewPlayerModal, payload: false });
      getPlayers();
    } catch (error) {
      playerAlreadyExists
        ? alert("Player already exists")
        : alert("failed to add player" + error);
    }
  };

  const addNewSession = async (sessionName: string) => {
    if (currentSession) {
      alert("Please end the current session before starting a new one");
      return;
    }

    if (!setNewSessionName) {
      alert("Please enter a session name");
      return;
    }

    const session = {
      name: sessionName as String,
      sessionPicture: newSessionPicture || null,
      players: Array.from(newSessionPlayers),
      gamesPlayed: setSessionGames || null,
      date: Timestamp.now(),
      id: uuidv4(),
      ended: false,
      scoringType: ScoringType.LEADERBOARD,
    } as unknown as GameSession;

    try {
      const sessionCollection = collection(db, "/Session/");

      await addDoc(sessionCollection, session);
      dispatch({ type: ActionTypes.addNewSession, payload: session });
    } catch (error) {
      alert("failed to add new session: " + error);
    }
  };

  const addNewGame = async () => {
    const game = {
      name: newGameName,
      picture: "not_implimented",
      winCondition: newGameWinCondition,
      id: uuidv4(),
    } as Game;

    try {
      const gameCollection = collection(db, "/Game/");
      await addDoc(gameCollection, game);
      dispatch({ type: ActionTypes.openAddNewGameModal, payload: false });
      getBoardgames();
    } catch (error) {
      alert("failed to add new game");
    }
  };

  const getGameDetails = async (gameId: string) => {
    try {
      const gameQuery = query(
        collection(db, "Game"),
        where("id", "==", gameId)
      );

      const querySnapshot = await getDocs(gameQuery);

      if (querySnapshot.empty) {
        throw new Error("Game not found");
      }

      const gameDoc = querySnapshot.docs[0];
      const gameData = gameDoc.data();
      return gameData;
    } catch (error) {
      alert(`failed to get game details ${error}`);
    }
  };

  const setNewGameResults = (gameResults: PlayerScore[]) => {
    dispatch({
      type: ActionTypes.addCurrentSessionGameResults,
      payload: gameResults,
    });
  };

  const addNewPlayedGameToSession = async (results : any) => {

    try {
      const sessionQuery = query(
        collection(db, "Session"),
        where("id", "==", currentSession!.id)
      );

      const querySnapshot = await getDocs(sessionQuery);

      if (querySnapshot.empty) {
        throw new Error("Session not found");
      }

      const sessionDoc = querySnapshot.docs[0];

      const playedGame = {
        id: uuidv4(),
        gameName: currentSessionNewGameName,
        playerScores: currentSessionGameResults,
        notes: results.notes,
        scoringDirection: results.scoringDirection,
        gameScoringType: results.gameScoringType,
        winningTeam: results.winningTeam,
        playersWon: results.playersWon,

      } as PlayedGame;

      const sessionData = sessionDoc.data();
      let gamesPlayed = sessionData.gamesPlayed;

      if (!Array.isArray(gamesPlayed)) {
        gamesPlayed = [];
      }

      gamesPlayed.push(playedGame);

      await updateDoc(sessionDoc.ref, {
        gamesPlayed: gamesPlayed,
      });

      await fetchSessions();
    } catch (error) {
      alert(`failed to update session with new boardgame ${error}`);
    }
  };

  const sortedSessions = sessions
    .filter((session: GameSession) => session.ended === true)
    .sort(
      (a: GameSession, b: GameSession) =>
        b.date.toDate().getTime() - a.date.toDate().getTime()
    ) as GameSession[];


  return (
    <div className="page">
      {openAddNewGameToSessionModal ? (
        <div className="modal-overlay">
          <AddGameResultModal
            boardgames={avalibleBoardgames}
            addNewPlayedGameToSession={addNewPlayedGameToSession}
            setNewGameName={setBoardgameToAdd}
            onClose={toggleAddPlayedGameToSessionModal}
            players={currentSession.players}
            saveGameResults={setNewGameResults}
          />
        </div>
      ) : null}
      {openAddNewSessionModal ? (
        <div className="modal-overlay">
          <AddSessionModal
            isOpen={openAddNewSessionModal}
            onClose={toggleAddNewSessionModal}
            addNewSession={addNewSession}
            avaliblePlayers={players}
            setNewSessionPlayers={setNewSessionPlayerIds}
          />
        </div>
      ) : null}
      {OpenAddNewPlayerModal ? (
        <div className="modal-overlay">
          <AddPlayerModal
            isOpen={OpenAddNewPlayerModal}
            onClose={toggleAddNewPlayerModal}
            addNewPlayer={addNewPlayer}
          />
        </div>
      ) : null}
      {openAddNewGameModal ? (
        <AddGameModal
          onClose={toggleAddNewGameModal}
          addNewGame={addNewGame}
          setNewBoardgameName={setNewGameName}
          setNewBoardgameWinCondition={setNewBoardgameWinCondition}
        />
      ) : null}

      <div className="header">
        <Link
          href="https://www.youtube.com/watch?v=S0ximxe4XtU"
          className="header-text"
        >
          🐍 Tunnel Snakes Rule 🐍
        </Link>

        <div className="current-session-buttons">
          <Button
            onPress={toggleAddNewPlayerModal}
            className="green-button"
          >
            Add new player
          </Button>
          <Button
            onPress={toggleAddNewGameModal}
            className="green-button"
          >
            Add new game
          </Button>
        </div>
      </div>

      <div className="main-content ">
        <div>
          {currentSession ? (
            <CurrentSession
              currentSession={currentSession as GameSession}
              toggleAddPlayedGameToSessionModal={
                toggleAddPlayedGameToSessionModal
              }
              endSession={endSession}
            />
          ) : null}
        </div>
        <div>
          {!currentSession ? (
              <Button
                onPress={toggleAddNewSessionModal}
                isDisabled={currentSession ? true : false}
                className="px-5 py-2.5 bg-black rounded-sm border border-lime-500 justify-start flex items-center"
              >
                <img
                  src="./Icons/ButtonPlus.svg"
                  alt="Add new session"
                  className="mr-4 pb-0.5"
                />
                <div>New session</div>
              </Button>
          ) : null}
        </div>
        <PreviousSessions sortedSessions={sortedSessions}></PreviousSessions>
      </div>
    </div>
  );
}
