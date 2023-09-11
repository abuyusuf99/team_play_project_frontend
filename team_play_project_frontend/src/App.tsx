import { Route, Router, Routes } from "react-router";
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Router path='/' element={<HomePage/>}>
      </Router>
    </Routes>
    </>
  )
}

export default App
