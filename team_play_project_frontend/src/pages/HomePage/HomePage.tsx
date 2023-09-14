
import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { RootState } from "../../app/store";
import Post from "../../components/Posts/Posts";
import { fetchPosts } from "../../features/PostSlice";


import React from "react";
import TopThree from "../../components/TopThree/TopThree";
import Post from "../../components/Posts/Posts";


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

  console.log(posts)
  
  return (

    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold">Лучшие посты</h1>
        </div>
      </header>
      <div className="container mx-auto py-8">
        <TopThree />
      </div>
      <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-wrap"> {/* Добавлен flex-wrap */}
        <div className="container mx-auto py-4"> {/* Добавлены классы ширины */}
        <h2 className="text-3xl font-semibold">Посты</h2>
          <div className="container mx-auto py-8">
            <div className="container mx-auto">
            </div>
            <Post />
          </div>
        </div>

      </div>

      </div>
    </div>
  );
}

export default HomePage;
