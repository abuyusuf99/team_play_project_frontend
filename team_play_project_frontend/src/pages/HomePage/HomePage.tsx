import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { RootState } from "../../app/store";
import Post from "../../components/Posts/Posts";
import { fetchPosts } from "../../features/PostSlice";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.postReducer.posts);
  console.log(posts);

  useEffect(() => {
    // Диспатчим экшен для загрузки новостей при монтировании компонента
    dispatch(fetchPosts());
    console.log('НЩЩЩЩЦЩВЙЦЗЩВОЩЗЦЙОВ')
  }, [dispatch]);
  
  return (
    <div>
      <h1>Посты</h1>
      <div>
        {posts.map((post) => (
          <Post
            key={post._id} // Предполагается, что у постов есть уникальный идентификатор (например, _id)
            desc={post.desc}
            document={post.document}
            imageURL={post.imageURL} // Добавьте свойство для изображения, если есть
            link={`/fullpost/${post._id}`} // Предполагается, что вы хотите перейти к полному посту с идентификатором
            title={post.title}
            viewsCount={post.viewsCount}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
