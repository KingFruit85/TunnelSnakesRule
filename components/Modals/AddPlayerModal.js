import React from "react";
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
} from "react-aria-components";

import "../../styles/styles.css";

const AddPlayerModal = ({ isOpen, onClose, addNewPlayer }) => {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = () => {
    addNewPlayer(playerName);
  };

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <div
      className="modal-container"
      style={{
        width: 496,
        height: 481,
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
        Add New Player
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
            Player name
          </div>
          <Input
            onChange={handlePlayerNameChange}
            value={playerName}
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
            Player photo
          </div>
        </div>
        <div
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div style={{ width: 60, height: 60, position: "relative" }}>
            <Button
              style={{
                width: 60,
                height: 60,
                left: 0,
                top: 0,
                position: "absolute",
                borderRadius: 9999,
                border: "1px #96C431 dotted",
              }}
            />
            {
              <img
                src="./Icons/ButtonPlus.svg"
                style={{
                  width: 16,
                  height: 16,
                  left: 22,
                  top: 22,
                  position: "absolute",
                }}
              ></img>
            }
          </div>
          <div
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Upload photo
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
          <div
            style={{
              color: "#96C431",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Add player
          </div>
        </Button>
        <Button
          onPress={onClose}
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

export default AddPlayerModal;
