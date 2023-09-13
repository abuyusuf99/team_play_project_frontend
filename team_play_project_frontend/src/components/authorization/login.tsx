import { useState } from "react";
import { useDispatch } from "react-redux";
import { authlogin } from "../../features/AuthSlice";

function signIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSetLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authlogin({ login, password }));
  };
  return (
    <>
      <div>
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSignUp}>
        <input
          placeholder="Введите логин"
          value={login}
          onChange={handleSetLogin}
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
export default signIn;
