

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/AuthSlice";


function signUp () {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
  
    const dispatch = useDispatch<AppDispatch>();
  
    const handleSetName = (e) => {
      setLogin(e.target.value);
      
    };
    const handleSetPass = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSignUp = (e) => {
      e.preventDefault();
      dispatch(createUser({ login, password }));
    };
  
    return (
      <>
      <div><h1>Registr</h1></div>
        <form onSubmit={handleSignUp}>
          <input
            placeholder="Введите логин"
            value={login}
            onChange={handleSetName}
            type="text"
          />
          <br />
          <input
            placeholder="Введите пароль"
            type="password"
            onChange={handleSetPass}
            value={password}
          />
          <button>add</button>
        </form>
       
      </>
    );
}
export default signUp
