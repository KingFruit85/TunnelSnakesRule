import { GameSession } from "../../models/Session";
import { PreviousSessionsProps } from "./PreviousSessionsProps";

export const PreviousSessions = (props: PreviousSessionsProps) => {

    return (
        <div className="grow justify-between flex-col items-start">
          <div className="text-white text-[32px] font-semibold font-['Montserrat']">
            History
          </div>
          <ul className="flex-col justify-start items-start gap-8 inline-flex">
            {props.sortedSessions.map((session: GameSession) => (
              <li key={session.id}>
                <div className="w-[1000px] h-[133px] px-6 pt-5 pb-6 bg-black rounded-sm flex-col justify-start items-start gap-2 inline-flex ">
                  <div className="self-stretch justify-between items-center inline-flex">
                    <div className="text-lime-500 text-base font-semibold font-['Montserrat']">
                      {session.date.toDate().toLocaleDateString()}
                    </div>
                    <div className="justify-start items-start gap-8 flex">
                      <div className="justify-start items-center gap-2 flex">
                        <img src="./Icons/Dice.svg" alt="Add new session" />
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
                    <img src="./Icons/RightArrow.svg" alt="Add new session" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
    );
};