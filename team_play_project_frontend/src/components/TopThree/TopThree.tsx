import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
const TopThree: React.FC = () => {
  const posts = useSelector((state: RootState) =>
    state.postReducer.posts
      .slice()
      .sort((a, b) => b.viewsCount - a.viewsCount)
      .slice(0, 3)
  );
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <img src={post.imageURL} alt="*" />
          <h1>{post.title}</h1>
          <p>{post.text}</p>
          <p> ПРОСМОТРЫ: {post.viewsCount}</p>
          <Link to={`/fullpost/${post._id}`}>к тексту</Link>
        </div>
      ))}
    </div>
  );
};

export default TopThree;
