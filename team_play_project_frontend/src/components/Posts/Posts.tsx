import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchPosts } from "../../features/PostSlice";

const Post: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.postReducer.posts);
  console.log(posts);

  useEffect(() => {
    // Диспатчим экшен для загрузки новостей при монтировании компонента
    dispatch(fetchPosts());
    console.log("НЩЩЩЩЦЩВЙЦЗЩВОЩЗЦЙОВ");
  }, [dispatch]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <img src={post.imageURL} alt="*" />
          <h1>{post.title}</h1>
          <p>{post.desc}</p>
          <p>{post.document}</p>
          <p>Просмотры: {post.viewsCount}</p>
          <Link to={`/fullpost/${post._id}`}>Читать</Link>
        </div>
      ))}
    </div>
  );
};

export default Post;
