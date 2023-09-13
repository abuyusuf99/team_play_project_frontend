import React, { useState } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "../../css/addPost.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCategory } from "../../features/CategorySlice";
import { createPost, fetchPosts } from "../../features/PostSlice";
import axios from "axios";
function AddPost() {
  const [titl, setTitl] = useState("");
  const [desc, setDesc] = useState("");
  const [categ, setCateg] = useState("");
  const imgRef = React.useRef(null);
  const docRef = React.useRef(null);

  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector((state) => state.categoryReducer.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const handleAdd = () => {
    category.find((item) => {
      if (item.title === categ) {
        dispatch(createPost({title:titl,desc:desc,category:item._id,imageURL:imgRef}))

      }
    });
  };

  const handleChangeFile = async (event)=>{
try {
  const formData = new FormData()
  const file =  event.target.files[0]
  formData.append('image', file)
  const { data} = await axios.post('http://localhost:4000/upload/img', formData)
  console.log(data);
  
} catch (error) {
  console.log(error.message)
}
  }
// kdf
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
          </div>
        </div>
        <div className={style.drop}>
          <button onClick={() => imgRef.current.click()}>Загрузить фото</button>
        </div>
        <div className={style.drop}>
          <button onClick={() => docRef.current.click()}>
            Загрузить документ
          </button>
        </div>
        <div className={style.addBut}>
          <button
            onClick={handleAdd}
          >
            Добавить
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPost;
