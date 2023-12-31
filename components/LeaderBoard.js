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
} from "react-aria-components";

const LeaderBoard = ({ players }) => {
  return (
    <div>
      <div
        style={{
          width: 482,
          height: 217,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 12,
          display: "inline-flex",
        }}
      >
        <div style={{ width: 482, height: 17, position: "relative" }}>
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
            Players
          </div>
          <div
            style={{
              left: 216,
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
              left: 410,
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
        <div
          className="border"
          style={{
            width: 481,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 32,
            display: "inline-flex",
          }}
        ></div>
        {players.map((player) => (
          <div style={{ width: 479, height: 32, position: "relative" }}>
            <div
              style={{
                left: 0,
                top: 4,
                position: "absolute",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 12,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  position: "relative",
                  background: "#96C431",
                  borderRadius: 2,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 10.44,
                    left: 5,
                    top: 7,
                    position: "absolute",
                    background: "white",
                  }}
                ></div>
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {player.name}
              </div>
            </div>
            <div
              style={{
                width: 115,
                left: 216.5,
                top: 0,
                position: "absolute",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 20,
                display: "inline-flex",
              }}
            >
              <Input
                style={{
                  flex: "1 1 0",
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  backgroundColor: "black",
                  alignSelf: "stretch",
                  flex: "1 1 0",
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 6,
                  paddingBottom: 6,
                  background: "#141813",
                  borderRadius: 2,
                  border: "1px white solid",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 10,
                  display: "inline-flex",
                }}
              />
            </div>
            <Input
              type="radio"
              style={{
                width: 24,
                height: 24,
                left: 410,
                top: 5,
                position: "absolute",
                background: "#141813",
                borderRadius: 29,
                border: "1px white solid",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
