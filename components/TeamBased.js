import { use, useState, useEffect } from "react";

import {
  Row,
  Table,
  TableHeader,
  Column,
  TableBody,
  Cell,
  Input,
  Checkbox,
  Radio,
  TextField,
  Label,
  Button,
} from "react-aria-components";

import "../styles/styles.css";

import TeamRow from "./TeamRow";

const CoOperative = ({ players, results }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    results(teams);
  }, [teams]);

  const checkTeamScore = () => {
    if (teams.length === 0) return;

    // Convert team scores to numbers and find the highest score
    const highestScore = Math.max(
      ...teams.map((team) => Number(team.score) || 0)
    );

    // Update the winner property for each team
    const updatedTeams = teams.map((team) => ({
      ...team,
      winner: Number(team.score) === highestScore,
    }));

    setTeams(updatedTeams);
    console.log(updatedTeams);
  }

  const addTeam = () => {
    setTeams([...teams, {}]); // Add a new team (empty object for now)
  };

  const updateTeam = (index, teamDetails) => {
    setTeams(teams.map((team, idx) => (idx === index ? teamDetails : team)));
  };

  const deleteTeam = (index) => {
    setTeams(teams.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      {teams.length > 0 && (
        <div style={{ height: 40, position: "relative" }}>
          <div
            style={{
              left: 0,
              top: 0,
              position: "absolute",
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Team name
          </div>
          <div
            style={{
              left: 379.5,
              top: 0,
              position: "absolute",
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Score
          </div>
          <div
            style={{
              left: 190.5,
              top: 0,
              position: "absolute",
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Players
          </div>
          <div
            style={{
              left: 470.5,
              top: 0,
              position: "absolute",
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Winner
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <div style={{ paddingBottom: 5 }}>
          {/* <TeamRow players={players}updateTeam={updateTeam} /> */}
        </div>
        {teams.map((team, index) => (
          <div style={{ paddingBottom: 35 }}>
            <TeamRow
              key={index}
              players={players}
              deleteTeam={deleteTeam}
              id={index}
              updateTeam={updateTeam}
              checkTeamScore={checkTeamScore}
            />
          </div>
        ))}
      </div>
      <Button
        onClick={addTeam}
        style={{
          width: 150,
          height: 40,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 8,
          background: "#020202",
          borderRadius: 2,
          border: "1px #FE8A1F solid",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          display: "inline-flex",
          marginTop: 20,
        }}
      >
        <div
          style={{
            color: "#FE8A1F",
            fontSize: 14,
            fontFamily: "Montserrat",
            fontWeight: "500",
            wordWrap: "break-word",
          }}
        >
          Add team
        </div>
      </Button>
    </div>
  );
};

export default CoOperative;
