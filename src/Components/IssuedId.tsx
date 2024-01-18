import { InputLabel } from "@mui/material";
import TextInput from "./Common/TextInput";
import Selection from "./Common/Selection";
import { Dispatch } from "react";

export default function IssuedId({
  register,
  IDTypeSelected,
  setIDType,
}: {
  register: any;
  IDTypeSelected: string;
  setIDType: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="individual_form">
      <InputLabel>Govt Issued ID</InputLabel>
      <Selection
        labelName=""
        options={["Aadhar", "PAN"]}
        required={true}
        placeHolder="ID Type"
        value={IDTypeSelected}
        setValue={setIDType}
        showLabel={false}
      />
      <TextInput
        labelName="IDValue"
        placeHolder="Enter Govt ID"
        required={true}
        register={register}
        showLabel={false}
      />
    </div>
  );
}