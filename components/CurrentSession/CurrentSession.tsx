import { Button } from "react-aria-components";
import { PlayedGame } from "../../models/PlayedGame";
import { CurrentSessionProps } from "./CurrentSessionProps";


export const CurrentSession = (props: CurrentSessionProps) => {
  console.log(props.currentSession)
  return (
    <div className="self-stretch px-6 py-5 bg-black border border-orange-500 flex-col justify-start items-start gap-[27px] flex ">
      <div className="self-stretch justify-between items-start inline-flex ">
        <div className="justify-start items-start gap-4 flex ">
          <div className="text-white text-2xl font-semibold font-['Montserrat']">
            {props.currentSession.date ? props.currentSession.date.toDate().toLocaleDateString() : "No session date"}
          </div>
          <div className="text-white text-2xl font-normal font-['Montserrat']">
            {props.currentSession.name}
          </div>
        </div>
        <div className="justify-start items-start gap-8 flex ">
          <div className="justify-start items-center gap-2 flex ">
            <img src="./Icons/Dice.svg" alt="Add new session" />
            <div className="text-white text-xl font-medium font-['Montserrat'] ">
              {props.currentSession.gamesPlayed.length}
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-3 flex ">
        <ul>
          {props.currentSession.gamesPlayed.map((game: PlayedGame) => (
            <li key={game.id}>
              <div className="self-stretch justify-start items-start gap-2 inline-flex ">
                <div className="justify-start items-center gap-2 flex">
                  <img src="./Icons/Players.svg" alt="number of players" />
                  <div className="text-white text-xl font-medium font-['Montserrat']">
                    {game.results.length}
                  </div>
                </div>
                <div className="text-white text-xl font-normal font-['Montserrat']">
                  -
                </div>
                <div className="text-white text-xl font-normal font-['Montserrat']">
                  {game.name}
                </div>
                <div className="text-white text-xl font-normal font-['Montserrat']">
                  -
                </div>
                <div className="text-white text-xl font-normal font-['Montserrat']">
                  {game.results.map((result) => {
                    if (result.winner && result.name) {
                      return <span>{result.name} won</span>;
                    }
                    if (result.winner && result.playerName) {
                      return (
                        <span>
                          {result.playerName} won ( {result.score} points )
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="justify-start items-start gap-6 inline-flex">
        <Button
          onPress={props.toggleAddPlayedGameToSessionModal}
          className="px-5 py-2.5 bg-black rounded-sm border border-lime-500 justify-start items-center gap-3 flex"
        >
          <img src="./Icons/Trophy.svg" alt="Add new session" />
          <div className="text-lime-500 text-base font-medium font-['Montserrat']">
            Add result
          </div>
        </Button>
        <div className="px-5 py-2.5 bg-black rounded-sm border border-lime-500 justify-start items-center gap-3 flex">
          <img src="./Icons/Time.svg" alt="Add new session" />
          <Button
            onPress={props.endSession}
            className="text-lime-500 text-base font-medium font-['Montserrat']"
          >
            End session
          </Button>
        </div>
      </div>
    </div>
  );
};
