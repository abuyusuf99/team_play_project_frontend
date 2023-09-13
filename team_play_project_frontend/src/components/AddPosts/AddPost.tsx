import React, { useState } from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import style from "../../css/addPost.module.css"
import Dropdown from 'react-bootstrap/Dropdown';
import "bootstrap/dist/css/bootstrap.min.css";
function AddPost() {
  const [titl, setTitl] = useState("");
  const [desc, setDesc] = useState("");
  const [categ, setCateg] = useState("");
  const imgRef = React.useRef(null);
  const docRef = React.useRef(null);

const dispatch = useDispatch<AppDispatch>()





  return (
    <div className={style.rod_block_addpost}>
      <div className={style.inputs}>
        <div className={style.input} ><input onChange={(e)=> setTitl(e.target.value)} type="text" placeholder="Название поста" /></div>
       <div className={style.input}> <input onChange={(e)=> setDesc(e.target.value)} type="text" placeholder="Описание" /></div>
       <div className={style.input}> <input  onChange={(e)=> setCateg(e.target.value)}  type="text" placeholder="Категория" /> <Dropdown>
      <Dropdown.Toggle className={style.butbootstarp} variant="success" id="dropdown-basic">
        Выбрать
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown></div>
    <div className={style.input}> <input ref={imgRef}  type="file" hidden /></div>
      </div>
      <div className={style.drop}>
      <button onClick={()=>imgRef.current.click()} >Загрузить фото</button>
    </div>
      <div className={style.drop}>
      <button onClick={()=>docRef.current.click()} >Загрузить документ</button>
    </div>
<div className={style.addBut}>
    <button>Добавить</button>
    </div>
    </div>
  );
}

export default AddPost;
