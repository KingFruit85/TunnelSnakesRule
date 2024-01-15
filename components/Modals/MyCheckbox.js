import { Input, Checkbox } from "react-aria-components";

const MyCheckbox = ({ text, id, image, handleCheckboxChange, isSelected }) => {
  return (
    <div className="inline-flex flex-row gap-3  ">
      <Checkbox
        onChange={() => handleCheckboxChange(id)}
        defaultSelected={isSelected}
        style={{
          color: "white",
          fontSize: 18,
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
        {image ? (
          <img
            style={{
              width: 40,
              height: 40,
              borderRadius: 9999,
              position: "relative",
            }}
            src={image}
          />
        ) : (
          <div></div>
        )}
        {text}
      </Checkbox>
    </div>
  );
};

export default MyCheckbox;
