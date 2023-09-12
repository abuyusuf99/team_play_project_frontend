import { Route, Routes } from "react-router";
import Header from "./components/Comments/Header";
import HomePage from "./components/Comments/HomePage";
import style from './css/app.module.css'

function App() {

  return (
    <div className={style.app}>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}>
      </Route>
    </Routes>
    </div>
  )
}

export default App
