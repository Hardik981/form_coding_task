import TextInput from "./Common/TextInput";
import { useForm } from "react-hook-form";
import Selection from "./Common/Selection";
import { Dispatch, useState } from "react";
import IssuedId from "./IssuedId";
import { number, object, string } from "yup";

export default function FirstForm({
  setOpenSecForm,
}: {
  setOpenSecForm: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { register, handleSubmit } = useForm();
  const [sexSelected, setSexSelected] = useState<string>("");
  const [IDTypeSelected, setIDType] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  async function submitClicked(data: any) {
    const tempObj: any = {};
    tempObj["Sex"] = sexSelected;
    tempObj["ID Type"] = IDTypeSelected;
    if (data["Mobile"] === "") data["Mobile"] = null;
    const data1 = { ...data, ...tempObj };
    console.log("data1: ", data1);
    try {
      const result = await formSchema.validate(data1);
      setErrorMsg("");
    } catch (err: any) {
      setErrorMsg(err.message);
      return;
    }
    if (data1["ID Type"] === "Aadhar") {
      if (!AadharRegex.test(data1["IDValue"])) {
        setErrorMsg("Aadhar must be 12 digits not starting with 0 or 1");
        return;
      } else setErrorMsg("");
    } else if (data1["ID Type"] === "PAN") {
      if (!PANRegex.test(data1["IDValue"])) {
        setErrorMsg("PAN must be 10 digits starting with A");
        return;
      } else setErrorMsg("");
    }
    setOpenSecForm(true);
  }
  return (
    <form onSubmit={handleSubmit((data) => submitClicked(data))}>
      <section>
        <TextInput
          labelName="Name"
          placeHolder="Enter Name"
          required={true}
          register={register}
          showLabel={true}
        />
        <TextInput
          labelName="Age"
          placeHolder="Enter Age"
          required={true}
          register={register}
          showLabel={true}
        />
        <Selection
          labelName="Sex"
          options={["Male", "Female"]}
          required={true}
          placeHolder="Select Sex"
          value={sexSelected}
          setValue={setSexSelected}
          showLabel={true}
        />
        <TextInput
          labelName="Mobile"
          placeHolder="Enter Mobile"
          required={false}
          register={register}
          showLabel={true}
        />
        <IssuedId
          register={register}
          IDTypeSelected={IDTypeSelected}
          setIDType={setIDType}
        />
      </section>
      <div className="actionBlock">
        {errorMsg && <div className="errorMsg">{errorMsg}</div>}
        <button type="submit">Next</button>
      </div>
    </form>
  );
}

const formSchema = object({
  Name: string().required(),
  Age: number().required().positive().integer(),
  Sex: string().required(),
  Mobile: number().nullable(),
});
const AadharRegex = /^[2-9][0-9]{11}$/;
const PANRegex = /^[a-zA-Z0-9]{10}$/;
