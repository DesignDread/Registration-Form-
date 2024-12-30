import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route , Routes} from "react-router-dom"
import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp/>} />

        <Route path="/Login" element={<Login/>} />
        <Route path="/" element={<Dashboard/>} />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
