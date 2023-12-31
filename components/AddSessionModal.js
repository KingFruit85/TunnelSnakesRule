import React, { useEffect } from "react";
import { useState } from "react";
import {
  Modal,
  Dialog,
  Button,
  Input,
  Label,
  Heading,
  ListBox,
  ListBoxItem,
  TextField,
  FieldError,
  DialogTrigger,
} from "react-aria-components";

import MyCheckbox from "./MyCheckbox";

const AddSessionModal = ({
  isOpen,
  onClose,
  addNewSession,
  setNewSessionName,
  setNewSessionPlayers,
  avaliblePlayers,
}) => {
  const [sessionName, setSessionName] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);


  const handleCheckboxChange = (playerName) => {
    setSelectedPlayers((prevSelectedPlayers) => {
      if (prevSelectedPlayers.includes(playerName)) {
        // Remove the player from the array
        return prevSelectedPlayers.filter(player => player !== playerName);
      } else {
        // Add the player to the array
        return [...prevSelectedPlayers, playerName];
      }
    });
    
  };

  useEffect(() => {
    console.log("refreshing selected players");
    setNewSessionPlayers(selectedPlayers);
  }, [selectedPlayers]);
  
  
  const handleSubmit = () => {
    addNewSession(sessionName);
  };

  const handleClose = () => {
    setSessionName("");
    onClose();
  };

  const handleSessionNameChange = (event) => {
    setSessionName(event.target.value);
  };

  // update list box to this https://react-spectrum.adobe.com/react-aria/examples/image-grid.html
  return (
    <div
      className="modal-container"
      style={{
        width: 496,
        height: 861,
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
        Add New Session
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
            Session name
          </div>
          <Input
            onChange={handleSessionNameChange}
            value={sessionName}
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
            Players
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
            {/* <div
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 12,
                display: "inline-flex",
              }}
            >
              <MyCheckbox text={"Select all"} />
            </div> */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '400px',
              overflowY: 'auto',
              width: '100%',
            }}>
              {avaliblePlayers.map((player) => (
                <div key={player.id} style={{ paddingBottom: '10px' }}>
                <MyCheckbox text={player.name} id={player.id} image={"./Holly.svg"} handleCheckboxChange={handleCheckboxChange} />
                </div>
              ))}
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
          <img src="./ButtonPlus.svg" />
          <div
            style={{
              color: "#96C431",
              fontSize: 16,
              fontFamily: "Montserrat",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            Create session
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

export default AddSessionModal;
