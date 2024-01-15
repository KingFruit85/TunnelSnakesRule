import { GameSession } from "../../models/Session";
import { PreviousSessionsProps } from "./PreviousSessionsProps";

import "../../styles/styles.css";

export const PreviousSessions = (props: PreviousSessionsProps) => {

    return (
        <div className="history-section ">
          <div className="history-header">
            History
          </div>

          <ul className="previous-sessions ">
            {props.sortedSessions.map((session: GameSession) => (
              <li key={session.id}>
                <div className="previous-session-item ">
                  <div className="previous-session-item-date-info">

                    <div className="previous-session-item-date">
                      {session.date.toDate().toLocaleDateString()}
                    </div>

                    <div className="previous-session-item-game-number-container ">
                      <div className="previous-session-item-game-number">
                        <img src="./Icons/Dice.svg" alt="Add new session" />
                        <div className="previous-session-item-game-number-style">
                          {session.gamesPlayed.length}
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="previous-session-item-title">
                    {session.name}
                  </div>
                  <div className="previous-session-item-view-session">
                    <div className="previous-session-item-view-session-text">
                      View session
                    </div>
                    <img className="revious-session-item-view-session-text" src="./Icons/RightArrow.svg" alt="Add new session" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
    );
};