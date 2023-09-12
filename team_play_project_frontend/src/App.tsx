import { Route, Routes } from "react-router";
import Header from "./components/Comments/Header";
import HomePage from "./components/Comments/sign";
import CreateUser from "./components/authorization/createUser";

import style from './css/app.module.css'

function App() {

  return (
    <div className={style.app}>
    <Header/>
    <Routes>
      <Route path='/' element={<CreateUser/>}>

      </Route>
    </Routes>
    </div>
  )
}

export default App
