import FirstForm from './Components/FirstForm'
import './App.scss'
import { useState } from 'react'
import SecForm from './Components/SecForm'

function App() {
const [openSecForm, setOpenSecForm] = useState(false)
  return <>{openSecForm ? <SecForm /> : <FirstForm setOpenSecForm={setOpenSecForm} />}</>;
}

export default App
// TODO Show table and add heading to both forms