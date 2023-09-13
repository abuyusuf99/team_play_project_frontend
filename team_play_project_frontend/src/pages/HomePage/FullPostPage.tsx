import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById, fetchPosts } from "../../features/PostSlice";
import { RootState, AppDispatch } from "../../app/store";
import CommentList from "../../components/Comments/CommentsList";
import FormComments from "../../components/Comments/CommentsForm";
import "tailwindcss/tailwind.css";

function FullPost() {
  const { postId } = useParams<{ postId?: string }>(); // postId теперь может быть undefined
  const dispatch = useDispatch<AppDispatch>();

  // Селектор для выборки поста по его ID из Redux store
  const posts = useSelector((state: RootState) => state.postReducer.posts);

  useEffect(() => {
    dispatch(fetchPostById(postId))
    dispatch(fetchPosts())
  }, [dispatch])

  if (!posts) {
    console.error("Post not found for postId:", postId);
    return (
      <div>
        <p>Error: Post not found</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div>
        {posts.map(
          (singlePost) =>
            singlePost._id === postId && (
              <div key={singlePost._id} className="bg-white rounded shadow p-4">
                <h2 className="text-2xl font-semibold">{singlePost.title}</h2>
                <p className="text-gray-600">{singlePost.desc}</p>
                <p className="text-gray-600">{singlePost.document}</p>
                <img
                  src={singlePost.imageURL}
                  alt="Post"
                  className="rounded-lg mt-4"
                />
              </div>
            )
        )}
        <FormComments postId={postId} />
        <CommentList postId={postId} />
      </div>
    </div>
  );  
}

export default FullPost;
