import TextInput from "./Common/TextInput";
import { useForm } from "react-hook-form";
import { useDeferredValue, useEffect, useState } from "react";
import { object, string } from "yup";
import { Autocomplete, InputLabel, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addData } from "../redux/reducers/tableSlice";

export default function SecForm({ saveValue, setSaveValue, setOpenSecForm }) {
  const { register, handleSubmit } = useForm();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [countries, setCountries] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const deferredSearchValue = useDeferredValue(searchValue);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${deferredSearchValue}`
      );
      const data = await response.json();
      const countryNames = data.map((country: any) => country.name.common);
      setCountries(countryNames);
    };
    if (deferredSearchValue) fetchData();
  }, [deferredSearchValue]);
  async function submitClicked(data: any) {
    const tempObj: any = {};
    tempObj["Country"] = selectedCountry;
    if (data["Pincode"] === "") data["Pincode"] = null;
    const data1 = { ...data, ...tempObj };
    try {
      const result = await schema.validate(data1);
      setErrorMsg("");
    } catch (err: any) {
      setErrorMsg(err.message);
      return;
    }
    dispatch(addData({ ...saveValue, ...data1 }));
    setSaveValue();
    setOpenSecForm(false);
  }
  return (
    <form onSubmit={handleSubmit((data) => submitClicked(data))}>
        <h4 style={{textDecoration: "underline"}}>Address Details</h4>
      <section>
        <TextInput
          labelName="Address"
          placeHolder="Enter Address"
          required={false}
          register={register}
          showLabel={true}
        />
        <TextInput
          labelName="State"
          placeHolder="Enter State"
          required={false}
          register={register}
          showLabel={true}
        />
        <TextInput
          labelName="City"
          placeHolder="Enter City"
          required={false}
          register={register}
          showLabel={true}
        />
        <TextInput
          labelName="Pincode"
          placeHolder="Enter Pincode"
          required={false}
          register={register}
          showLabel={true}
        />
        <div className="individual_form">
          <InputLabel htmlFor="bootstrap-input">Country</InputLabel>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countries}
            sx={{ width: 280 }}
            renderInput={(params) => <TextField {...params} />}
            onInputChange={(e, newValue) => {
              if (newValue) setSearchValue(newValue);
            }}
            value={selectedCountry}
            onChange={(event, newValue) => {
              setSelectedCountry(newValue);
            }}
          />
        </div>
      </section>
      <div className="actionBlock">
        {errorMsg && <div className="errorMsg">{errorMsg}</div>}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

const schema = object().shape({
  Pincode: string()
    .matches(/^\d+$/, "Pincode must contain only digits")
    .nullable(),
});
