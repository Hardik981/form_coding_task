import FirstForm from "./Components/FirstForm";
import "./App.scss";
import { useState } from "react";
import SecForm from "./Components/SecForm";
import Table from "./Components/Table";

function App() {
  const [openSecForm, setOpenSecForm] = useState(false);
  const [saveValue, setSaveValue] = useState<any>();
  return (
    <>
      {openSecForm ? (
        <SecForm
          saveValue={saveValue}
          setSaveValue={setSaveValue}
          setOpenSecForm={setOpenSecForm}
        />
      ) : (
        <FirstForm
          setOpenSecForm={setOpenSecForm}
          setSaveValue={setSaveValue}
        />
      )}
      <Table />
    </>
  );
}

export default App;