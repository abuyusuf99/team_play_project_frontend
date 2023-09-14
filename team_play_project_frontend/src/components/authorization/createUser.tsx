import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/AuthSlice";
import { AppDispatch } from "../../app/store";
//тут регистрация 
function signUp() {
    //хуки для мониторинга value из input
  const [avatarURL, setavatarURL] = useState("");
  const [nickName, setnickName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
// console.log(avatarURL,nickName,login,password);

  const dispatch = useDispatch<AppDispatch>();

  //функции регистрации
  const handleSetLogin = (e: { target: { value: SetStateAction<string>; }; }) => {
    setLogin(e.target.value);
  };

  const handleSetavatarURL = (e: { target: { value: SetStateAction<string>; }; }) => {
    setavatarURL(e.target.value);
  };

  const handleSetnickName = (e: { target: { value: SetStateAction<string>; }; }) => {
    setnickName(e.target.value);
  };
  const handleSetPass = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(createUser({ login, password, nickName, avatarURL }));
  };

  return (
    <>
      <div>
        <h1>Registr</h1>
      </div>
      <form onSubmit={handleSignUp}>
        <input
          placeholder="Сюда ссылку на фото"
          value={avatarURL}
          onChange={handleSetavatarURL}
          type="text"
        />
        <br />

        <input
          placeholder="Придумайте Ник"
          value={nickName}
          onChange={handleSetnickName}
          type="text"
        />
        <br />

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
export default signUp;
