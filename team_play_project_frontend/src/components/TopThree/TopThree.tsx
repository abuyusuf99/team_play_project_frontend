import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import style from "./TopThree.module.css"
const TopThree: React.FC = () => {
  const posts = useSelector((state: RootState) =>
    state.postReducer.posts
      .slice()
      .sort((a, b) => b.viewsCount - a.viewsCount)
      .slice(0, 3)
  );
  return (
    <div className={style.container}>
      {posts.map((post) => (
        <div className={style.post} key={post._id}>
          <img className={style.img} src={post.imageURL} alt="*" />
          <h1 className={style.title}>{post.title}</h1>
          <p>{post.text}</p>
          <p> ПРОСМОТРЫ: {post.viewsCount}</p>
          <Link to={`/fullpost/${post._id}`}>к тексту</Link>
        </div>
      ))}
    </div>
  );
};

export default TopThree;
