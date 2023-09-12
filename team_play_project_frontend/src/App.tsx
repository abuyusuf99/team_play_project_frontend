import { Route, Routes } from "react-router";
import Header from "./components/Comments/Header";
import HomePage from "./components/Comments/HomePage";
import CreateUser from "./components/authorization/createUser";
import Login from "./components/authorization/login";

import style from "./css/app.module.css";

function App() {
  return (
    <div className={style.app}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/createUser"element={<CreateUser/>}/>
        <Route path="/auth"element={<Login/>}/>

      </Routes>
    </div>
  );
}

export default App;
