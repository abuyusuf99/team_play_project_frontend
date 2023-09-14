import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchPosts } from "../../features/PostSlice";

const Post: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.postReducer.posts);
  const maxDescLength = 100;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center">
        {posts.map((post) => (
          <div
            key={post._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-md p-4 mb-4 mx-2 py-2"
          >
            <img src={post.imageURL} alt="*" className="w-full h-auto" />
            <h1 className="text-lg sm:text-xl font-semibold mt-2">
              {post.title.length > 20 ? `${post.title.slice(0,20)}...`: post.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {post.desc.length > 100
                ? `${post.desc.slice(0, 50)}...`
                : post.desc}
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              Просмотры: {post.viewsCount}
            </p>
            <Link
              to={`/fullpost/${post._id}`}
              className="text-blue-500 hover:underline text-sm sm:text-base"
            >
              Читать
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
