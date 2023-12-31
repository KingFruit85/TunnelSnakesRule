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
} from "react-aria-components";

const CoOperative = ({ players }) => {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 12,
          display: "inline-flex",
        }}
      >
        <Checkbox
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
          Players Win
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
          Game Wins
        </Checkbox>
      </div>


    </div>
  );
};

export default CoOperative;
