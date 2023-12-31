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
import AddPlayerModal from "../../components/AddPlayerModal";
import AddSessionModal from "../../components/AddSessionModal";
import AddGameModal from "../../components/AddGameModal";
import AddPlayedGameToSessionModal from "../../components/AddPlayedGameToSessionModal";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../../models/Player";
import { Session } from "../../models/Session";
import { Game } from "../../models/Game";

import React from "react";
import { PlayedGame } from "../../models/PlayedGame";
import "../../styles/styles.css";

import { ActionTypes, reducer, initialState } from "../../helpers/reducer";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    sessions,
    isLoading,
    currentSession,
    OpenAddNewPlayerModal,
    newPlayerName,
    newSessionName,
    newSessionPlayers,
    setSessionGames,
    openAddNewSessionModal,
    openAddNewGameToSessionModal,
    openAddNewGameModal,
    players,
    avalibleBoardgames,
    newGameName,
    newGameWinCondition,
    newSessionPlayerIds
  } = state;

  const [newPlayerPicture, setNewPlayerPicture] = useState("");
  const [newSessionPicture, setSessionPicture] = useState("");

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
    console.log("newsessionplayeerids useEffect")
    var playersToAdd: Player[] = [];
    newSessionPlayerIds.forEach((id:string) => {
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
  },[newSessionPlayerIds])


  const setNewGameName = (name: string) => {
    dispatch({
      type: ActionTypes.setNewGameName,
      payload: name,
    });
  };

  const toggleAddPlayedGameToSessionModal = () =>
    dispatch({
      type: ActionTypes.openAddNewGameToSessionModal,
      payload: !openAddNewGameToSessionModal,
    });

  const endSession = async () => {
    dispatch({ type: ActionTypes.currentSession, payload: null });
  };

  const fetchSessions = async () => {
    try {
      const sessionCol = collection(db, "/Session/");
      const snapshot = await getDocs(sessionCol);
      const sessionList = snapshot.docs.map((doc) => doc.data()) as Session[];

      dispatch({ type: ActionTypes.sessions, payload: sessionList });
      dispatch({ type: ActionTypes.isLoading, payload: false });
    } catch (error) {
      console.log("error fetching sessions: " + error);
    }
  };

  useEffect(() => {
    console.log("fetchsessions useEffect")

    fetchSessions();
  }, []);

  useEffect(() => {
    console.log("getboardgames useEffect")

    getBoardgames();
  }, []);

  const updateCurrentSession = async () => {
    const sessionCollection = collection(db, "/Session/");
    const sessionsSnapshot = await getDocs(sessionCollection);
    const sessionList = sessionsSnapshot.docs.map((session) =>
      session.data()
    ) as Session[];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    sessionList.find((session) => {
      const sessionDate = session.date.toDate();
      sessionDate.setHours(0, 0, 0, 0);
      sessionDate.getTime() === today.getTime()
        ? dispatch({ type: ActionTypes.currentSession, payload: session })
        : null;
    });
  };

  useEffect(() => {
    console.log("updatecurrent session useEffect")

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
    console.log("getplayers useEffect")

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
    } as unknown as Session;

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

  const addNewPlayedGameToSession = async () => {
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
        name: newGameName,
        playersAndScores: [],
        notes: "",
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

  const previousSessions = sessions.filter(
    (session: Session) => session.id !== currentSession?.id
  );

  const sortedSessions = [...previousSessions]
    .sort((a, b) => {
      return a.date - b.date;
    })
    .reverse();

  return (
    <div className="flex flex-col grow items-center bg-neutral-900">
      {openAddNewGameToSessionModal ? (
        <div className="modal-overlay">
          <AddPlayedGameToSessionModal
            boardgames={avalibleBoardgames}
            addNewPlayedGameToSession={addNewPlayedGameToSession}
            setNewGameName={setBoardgameToAdd}
            isOpen={openAddNewGameToSessionModal}
            onClose={toggleAddPlayedGameToSessionModal}
            getGameDetails={getGameDetails}
            players={currentSession.players}
          />
        </div>
      ) : null}
      {openAddNewSessionModal ? (
        <div className="modal-overlay">
          <AddSessionModal
            isOpen={openAddNewSessionModal}
            onClose={toggleAddNewSessionModal}
            addNewSession={addNewSession}
            setNewSessionName={setNewSessionName}
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
          isOpen={openAddNewGameModal}
          onClose={toggleAddNewGameModal}
          addNewGame={addNewGame}
          setNewBoardgameName={setNewGameName}
          setNewBoardgameWinCondition={setNewBoardgameWinCondition}
        />
      ) : null}
      <div className="self-stretch py-5 bg-black justify-start items-center gap-5 space-y-4">
        <div className="grow shrink basis-0 pr-5 justify-center items-center gap-5 flex">
          <div className="text-white text-5xl font-bold font-['Montserrat']">
            🐍
          </div>
          <Link
            href="https://www.youtube.com/watch?v=S0ximxe4XtU"
            className="text-white text-5xl font-bold font-['Montserrat']"
          >
            Tunnel Snakes Rule
          </Link>
          <div className="text-white text-5xl font-bold font-['Montserrat']">
            🐍
          </div>
        </div>
        <div className="px-10 justify-center items-center gap-2 flex flex-row">
          <Button
            onPress={toggleAddNewPlayerModal}
            className="px-10 bg-lime-500 justify-center items-center gap-2 inline-flex"
          >
            Add new player
          </Button>
          <Button
            onPress={toggleAddNewGameModal}
            className="px-10 bg-lime-500 justify-center items-center gap-2 inline-flex"
          >
            Add new game
          </Button>
        </div>
      </div>
      <div className="flex-col justify-start items-center gap-12 flex ">
        <div className="self-stretch flex-col justify-start items-start gap-6 flex">
          <div className="text-white text-[32px] font-semibold font-['Montserrat']">
            Current Session
          </div>
          {currentSession ? (
            <div className="self-stretch px-6 py-5 bg-black border border-orange-500 flex-col justify-start items-start gap-[27px] flex ">
              <div className="self-stretch justify-between items-start inline-flex ">
                <div className="justify-start items-start gap-4 flex ">
                  <div className="text-white text-2xl font-semibold font-['Montserrat']">
                    {currentSession.date.toDate().toLocaleDateString()}
                  </div>
                  <div className="text-white text-2xl font-normal font-['Montserrat']">
                    {currentSession.name}
                  </div>
                </div>
                <div className="justify-start items-start gap-8 flex ">
                  <div className="justify-start items-center gap-2 flex ">
                    <img src="./Dice.svg" alt="Add new session" />
                    <div className="text-white text-xl font-medium font-['Montserrat'] ">
                      {currentSession.players.length}
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-3 flex ">
                <ul>
                  {currentSession.gamesPlayed.map((game: PlayedGame) => (
                    <li key={game.id}>
                      <div className="self-stretch justify-start items-start gap-2 inline-flex ">
                        <div className="justify-start items-center gap-2 flex">
                          <img src="./Players.svg" alt="number of players" />
                          <div className="text-white text-xl font-medium font-['Montserrat']">
                            {game.playersAndScores.length}
                          </div>
                        </div>
                        <div className="text-white text-xl font-normal font-['Montserrat']">
                          -
                        </div>
                        <div className="text-white text-xl font-normal font-['Montserrat']">
                          {game.name}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="justify-start items-start gap-6 inline-flex">
                <Button
                  onPress={toggleAddPlayedGameToSessionModal}
                  className="px-5 py-2.5 bg-black rounded-sm border border-lime-500 justify-start items-center gap-3 flex"
                >
                  <img src="./Trophy.svg" alt="Add new session" />
                  <div className="text-lime-500 text-base font-medium font-['Montserrat']">
                    Add result
                  </div>
                </Button>
                <div className="px-5 py-2.5 bg-black rounded-sm border border-lime-500 justify-start items-center gap-3 flex">
                  <img src="./Time.svg" alt="Add new session" />
                  <Button
                    onPress={endSession}
                    className="text-lime-500 text-base font-medium font-['Montserrat']"
                  >
                    End session
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {!currentSession ? (
          <div className="grow justify-between flex-col items-start">
            <Button
              onPress={toggleAddNewSessionModal}
              isDisabled={currentSession ? true : false}
              className="px-5 py-2.5 bg-black rounded-sm border border-lime-500 justify-start flex items-center"
            >
              <img
                src="./ButtonPlus.svg"
                alt="Add new session"
                className="mr-4 pb-0.5"
              />
              <div>New session</div>
            </Button>
          </div>
        ) : null}
        <div className="grow justify-between flex-col items-start">
          <div className="text-white text-[32px] font-semibold font-['Montserrat']">
            History
          </div>
          <ul className="flex-col justify-start items-start gap-8 inline-flex">
            {sortedSessions.map((session: Session) => (
              <li key={session.id}>
                <div className="w-[1000px] h-[133px] px-6 pt-5 pb-6 bg-black rounded-sm flex-col justify-start items-start gap-2 inline-flex ">
                  <div className="self-stretch justify-between items-center inline-flex">
                    <div className="text-lime-500 text-base font-semibold font-['Montserrat']">
                      {session.date.toDate().toLocaleDateString()}
                    </div>
                    <div className="justify-start items-start gap-8 flex">
                      <div className="justify-start items-center gap-2 flex">
                        <img src="./Dice.svg" alt="Add new session" />
                        <div className="text-white text-xl font-medium font-['Montserrat']">
                          {session.gamesPlayed.length}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-2xl font-normal font-['Montserrat']">
                    {session.name}
                  </div>
                  <div className="rounded-sm justify-start items-center gap-2 inline-flex">
                    <div className="text-orange-500 text-base font-medium font-['Montserrat'] underline">
                      View session
                    </div>
                    <img src="./RightArrow.svg" alt="Add new session" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
