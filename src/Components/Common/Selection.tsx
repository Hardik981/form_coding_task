import { InputLabel, Select, MenuItem } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function Selection({
  labelName,
  options,
  required,
  placeHolder,
  value,
  setValue,
  showLabel,
}: {
  labelName: string;
  options: string[];
  required: boolean;
  placeHolder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  showLabel: boolean;
}) {
  return (
    <div className="individual_form selectionBlock">
      {showLabel && (
        <InputLabel id="select-label">
          {labelName}
          {required ? <span className="red-asterisk"> *</span> : ""}
        </InputLabel>
      )}
      <Select
        labelId="select-label"
        id="demo-simple-select"
        value={value}
        placeholder="Enter Sex"
        sx={{
          color: value ? "black" : "#B9B9B9",
          fontWeight: "500",
          height: "2rem",
          width:"150px"
        }}
        onChange={(e) => {
          setValue(e.target.value as string);
        }}
        displayEmpty
        renderValue={(val) => (val ? val : placeHolder)}
      >
        {options.map((option) => {
          return (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
