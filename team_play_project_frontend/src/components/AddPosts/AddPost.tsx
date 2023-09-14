import React, { useState } from "react";
import { AppDispatch } from "../../app/store";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "../../css/addPost.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCategory } from "../../features/CategorySlice";
import { createPost } from "../../features/PostSlice";
import img from "../../img/pdf.svg";

import axios from "axios";
=======
import { useDispatch } from "react-redux";
import style from "../../css/addPost.module.css"
import Dropdown from 'react-bootstrap/Dropdown';
import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> 999d788ee585e48df3bb2645dc89f6566945219a
function AddPost() {
  const [titl, setTitl] = useState("");
  const [desc, setDesc] = useState("");
  const [categ, setCateg] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const imgRef = React.useRef(null);
  const docRef = React.useRef(null);
  
  

const dispatch = useDispatch<AppDispatch>()





  const handleAdd = () => {
    category.find((item) => {
      if (item.title === categ) {
        dispatch(createPost({title:titl,desc:desc,category:item._id,imageURL:imgUrl,document:pdfUrl}))

      }
    });
  };

  const handleChangeFile = async (event)=>{
try {
  const formData = new FormData()
  const file =  event.target.files[0]
  formData.append('image', file)
  const { data} = await axios.post('http://localhost:4000/upload/img', formData)
setimgUrl(`http://localhost:4000${data.url}`)







 
  
  
} catch (error) {
  error
}
  }
  const handleChangePdf = async (event)=>{
try {
  const formData = new FormData()
  const file =  event.target.files[0]
  formData.append('file', file)
  const { data} = await axios.post('http://localhost:4000/upload', formData)
setPdfUrl(`http://localhost:4000${data.url}`)
console.log(pdfUrl);




// ll



 
  
  
} catch (error) {
  error
}
  }
  return (
    <>
      <div className={style.rod_block_addpost}>
        <div className={style.inputs}>
          <div className={style.input}>
            {" "}
            <input
              value={titl}
              onChange={(e) => setTitl(e.target.value)}
              type="text"
              placeholder="Название поста"
            />
          </div>
          <div className={style.input}>
            {" "}
            <input
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="Описание"
            />
          </div>
          <div className={style.input}>
            {" "}
            <input
              value={categ}
              onChange={(e) => setCateg(e.target.value)}
              type="text"
              placeholder="Категория"
            />{" "}
            <Dropdown>
              <Dropdown.Toggle
                className={style.butbootstarp}
                variant="success"
                id="dropdown-basic"
              >
                Выбрать
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <>
                  {category.map((item) => {
                    return (
                      <Dropdown.Item onClick={() => setCateg(item.title)}>
                        {item.title}
                      </Dropdown.Item>
                    );
                  })}
                </>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className={style.input}>
            {" "}
            <input onChange={handleChangeFile} ref={imgRef} type="file" hidden />
            <input onChange={handleChangePdf} ref={docRef} type="file" hidden />
          </div>
        </div>
        <div className={style.drop}>
          <button onClick={() => imgRef.current.click()}>Загрузить фото</button>
        </div>

{imgUrl ? <div className={style.imgUrl}><img src={imgUrl} alt="" /></div> : null}
        
        <div className={style.drop}>
          <button  onClick={() => docRef.current.click()}>
            Загрузить документ
          </button>
          {pdfUrl ? <div> <img src={img} alt="" /> <a href={pdfUrl} target={pdfUrl}>Document</a></div> : null }
         
        </div>
        <div className={style.addBut}>
          <button
            onClick={handleAdd}>
            Добавить
          </button>
        </div>


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
