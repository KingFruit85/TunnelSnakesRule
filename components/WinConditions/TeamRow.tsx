// import { useState, useEffect } from "react";

// import {
//   Input,
//   Button,
//   Popover,
//   ListBox,
//   ListBoxItem,
//   DialogTrigger,
// } from "react-aria-components";
// import { TeamRowProps } from "./TeamRowProps";
// import { TeamScore } from "../../models/TeamScore";
// import { Player } from "../../models/Player";

// const TeamRow = (props: TeamRowProps) => {
//   const [selectedPlayers, setSelectedPlayers] = useState(new Set([""]));
//   const [teamName, setTeamName] = useState("");
//   const [teamScore, setTeamScore] = useState(0);
//   const [teamIsWinner, setTeamIsWinner] = useState(false);

//   const selectionHandler = (e:Player[]) => {
//     let newSelected = new Set();

//     e.forEach((element) => {
//       const player = players.find((player: Player) => player.id === element);
//       if (player) {
//         newSelected.add(player.name);
//       }
//     });

//     setSelectedPlayers(newSelected);
//   };

//   const handleTeamNameChange = (event) => {
//     setTeamName(event.target.value);
//   };

//   const handleTeamScoreChange = (event) => {
//     setTeamScore(event.target.value);
//     props.checkTeamScore();
//   };

//   const notifyChange = () => {
//     const teamDetails = {
//       name: teamName,
//       score: teamScore,
//       players: Array.from(selectedPlayers),
//     } as TeamScore;
//     props.updateTeam(props.id, teamDetails);
//   };

//   useEffect(() => {
//     notifyChange();
//   }, [teamScore, teamName, selectedPlayers]); // Call notifyChange whenever teamScore changes


//   return (
//     <div
//       style={{
//         width: 523,
//         height: 33,
//         flexDirection: "column",
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//         display: "inline-flex",
//         marginBottom: 10,
//       }}
//     >
//       <div
//         style={{
//           width: 523,
//           justifyContent: "flex-start",
//           alignItems: "flex-start",
//           gap: 32,
//           display: "inline-flex",
//         }}
//       >
//         <div
//           style={{
//             flex: "1 1 0",
//             flexDirection: "column",
//             justifyContent: "flex-start",
//             alignItems: "flex-start",
//             gap: 20,
//             display: "inline-flex",
//           }}
//         >
//           <div
//             style={{
//               height: 137,
//               flexDirection: "column",
//               justifyContent: "flex-start",
//               alignItems: "flex-start",
//               gap: 16,
//               display: "flex",
//             }}
//           >
//             <div
//               style={{
//                 flexDirection: "column",
//                 justifyContent: "flex-start",
//                 alignItems: "flex-start",
//                 gap: 20,
//                 display: "flex",
//               }}
//             >
//               <div style={{ width: 479, height: 32, position: "relative" }}>
//                 <Input
//                 onChange={handleTeamNameChange}
//                   style={{
//                     width: 172,
//                     height: 32,
//                     paddingLeft: 12,
//                     paddingRight: 12,
//                     paddingTop: 6,
//                     paddingBottom: 6,
//                     left: 0,
//                     top: 0,
//                     position: "absolute",
//                     background: "#141813",
//                     borderRadius: 2,
//                     border: "1px white solid",
//                   }}
                  
//                 />
//                 <DialogTrigger>
//                   <Button
//                     style={{
//                       width: 172,
//                       minHeight: 32,
//                       left: 189.5,
//                       position: "absolute",
//                       background: "#141813",
//                       borderRadius: 2,
//                       border: "1px white solid",
//                       justifyContent: "flex-start",
//                       alignItems: "center",
//                       gap: 10,
//                       display: "inline-flex",
//                     }}
//                   >
//                     <div
//                       style={{
//                         maxHeight: "100px", // Set a maximum height
//                         // overflowX: 'auto', // Allow vertical scrolling
//                         wordWrap: "break-word", // Ensure long words do not overflow
//                         minHeight: "18px",
//                       }}
//                     >
//                       { Array.from(selectedPlayers).join(", ")}
//                     </div>
//                     <Popover
//                       placement="bottom"
//                       containerPadding={50}
//                       style={{ width: 172 }}
//                     >
//                       <ListBox
//                         selectionMode="multiple"
//                         items={props.players}
//                         onSelectionChange={selectionHandler}
//                         inputValue={selectedPlayers}
//                       >
//                         {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
//                       </ListBox>
//                     </Popover>
//                   </Button>
//                 </DialogTrigger>

//                 <Input type="radio" name="winner" value="winner" defaultChecked={teamIsWinner}
                
//                   style={{
//                     width: 24,
//                     height: 24,
//                     left: 470.5,
//                     top: 5,
//                     position: "absolute",
//                     background: "#141813",
//                     borderRadius: 29,
//                     border: "1px white solid",
//                   }}
//                 />
//               </div>
//               <div style={{ width: 479, height: 32, position: "relative" }}>
//                 <Input
//                 onChange={handleTeamScoreChange}
//                 defaultValue={teamScore}
//                   style={{
//                     width: 72,
//                     height: 32,
//                     paddingLeft: 12,
//                     paddingRight: 12,
//                     paddingTop: 6,
//                     paddingBottom: 6,
//                     left: 378.5,
//                     top: -51.5,
//                     position: "absolute",
//                     background: "#141813",
//                     borderRadius: 2,
//                     border: "1px white solid",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* {!deleteTeam && (
//             <Button style={{ width: 479, height: 32, position: "relative" }}>
//                 <img src="./ButtonPlus.svg" alt="Add team" />
//             </Button>
//         )} */}
//         <button
//           style={{ width: 479, height: 32, position: "relative" }}
//             onClick={() => props.deleteTeam(props.id)}
//           >
//             <img src="./Icons/Bin.svg" alt="Delete team" />
//           </button>
//       </div>
//     </div>
//   );
// };

// export default TeamRow;
