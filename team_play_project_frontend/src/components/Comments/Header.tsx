import img from "../../img/logo.svg";
import img1 from "../../img/category.svg";
import style from "../../css/header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={style.header_block}>
      <div className={style.input}>
        <div className={style.image}>
          <img src={img} alt="" />
        </div>
        <input placeholder="Что сегодня будем читать?" type="text" />
      </div>
      <div>
        <div className={style.right_block}>
          <Link to="/">
            <span>Главная</span>
          </Link>

          <span>Публикации</span>

          <Link to="/auth">
            <span>Вход</span>
          </Link>
          <img src={img1} alt="" />
        </div>
      </div>
    </div>
    
  );
}

export default Header;
