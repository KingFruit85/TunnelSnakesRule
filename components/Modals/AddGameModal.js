import React, { useEffect } from "react";
import { useState } from "react";
import {
  Modal,
  Dialog,
  Button,
  Input,
  Label,
  Heading,
  TextField,
  FieldError,
  DialogTrigger,
  Checkbox,
} from "react-aria-components";

const AddGameModal = ({
  isOpen,
  onClose,
  addNewGame,
  setNewBoardgameName,
  setNewBoardgameWinCondition,
}) => {
  const handleSubmit = () => {
    addNewGame();
  };

  const handleClose = () => {
    onClose();
  };

  const setTeamBased = () => {
    setNewBoardgameWinCondition("Team based");
  };

  const setCoOperative = () => {
    setNewBoardgameWinCondition("Co-operative");
  };

  const setLeaderboard = () => {
    setNewBoardgameWinCondition("Leaderboard");
  };

  // TODO: update list box to this https://react-spectrum.adobe.com/react-aria/examples/image-grid.html
  return (
    <div
      className="modal-container"
      style={{
        width: 496,
        height: 529,
        padding: 48,
        background: "#020202",
        border: "1px white solid",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 32,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 32,
          fontFamily: "Montserrat",
          fontWeight: "600",
          wordWrap: "break-word",
        }}
      >
        Add New Game
      </div>
      <div
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 20,
          display: "flex",
        }}
      >
        <div
          style={{
            height: 65,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 8,
            display: "flex",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Name
          </div>
          <Input
            onChange={(e) => setNewBoardgameName(e.target.value)}
            style={{
              alignSelf: "stretch",
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 10,
              paddingBottom: 10,
              background: "#141813",
              borderRadius: 2,
              border: "1px white solid",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 10,
              display: "inline-flex",
            }}
          />
        </div>
        <div
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 16,
            display: "flex",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Win conditions
          </div>
          <div
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 20,
              display: "flex",
            }}
          >
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 12,
                display: "inline-flex",
              }}
            >
              <Checkbox
                onChange={setTeamBased}
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                <div className="checkbox">
                  <svg viewBox="0 0 18 18" aria-hidden="true">
                    <polyline points="1 9 7 14 15 4" />
                  </svg>
                </div>
                Team based
              </Checkbox>
            </div>
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 12,
                display: "inline-flex",
              }}
            >
              <Checkbox
                onChange={setCoOperative}
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                <div className="checkbox">
                  <svg viewBox="0 0 18 18" aria-hidden="true">
                    <polyline points="1 9 7 14 15 4" />
                  </svg>
                </div>
                Co-operative
              </Checkbox>
            </div>
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 12,
                display: "inline-flex",
              }}
            >
              <Checkbox
                onChange={setLeaderboard}
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                <div className="checkbox">
                  <svg viewBox="0 0 18 18" aria-hidden="true">
                    <polyline points="1 9 7 14 15 4" />
                  </svg>
                </div>
                Leaderboard
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 20,
          display: "flex",
        }}
      >
        <Button
          onPress={handleSubmit}
          style={{
            width: 400,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            background: "#020202",
            borderRadius: 2,
            border: "1px #96C431 solid",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            display: "inline-flex",
          }}
        >
          <img src="./Icons/ButtonPlus.svg" />
          <div
            style={{
              color: "#96C431",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Add game
          </div>
        </Button>
        <Button
          onPress={handleClose}
          style={{
            width: 400,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            background: "#020202",
            borderRadius: 2,
            border: "1px #FE8A1F solid",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              color: "#FE8A1F",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Cancel
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AddGameModal;
