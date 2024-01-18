import { InputLabel, TextField } from "@mui/material";

type TextInputProps = {
  labelName: string;
  placeHolder: string;
  required: boolean;
  register: any;
  showLabel: boolean;
};

export default function TextInput({
  labelName,
  placeHolder,
  required,
  register,
  showLabel,
}: TextInputProps) {
  return (
    <div className="individual_form">
      {showLabel && (
        <InputLabel htmlFor="bootstrap-input">
          {labelName}
          {required ? <span className="red-asterisk"> *</span> : ""}
        </InputLabel>
      )}
      {labelName ? (
        <TextField
          placeholder={placeHolder}
          id="bootstrap-input"
          {...register(labelName)}
        />
      ) : (
        <TextField
          placeholder={placeHolder}
          id="bootstrap-input"
        />
      )}
    </div>
  );
}
