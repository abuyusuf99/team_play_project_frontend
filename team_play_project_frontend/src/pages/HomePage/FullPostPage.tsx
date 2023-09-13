import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../features/PostSlice";
import { RootState, AppDispatch } from "../../app/store";
import CommentList from "../../components/Comments/CommentsList";
import FormComments from "../../components/Comments/CommentsForm";

function FullPost() {
  const { postId } = useParams<{ postId?: string }>(); // postId теперь может быть undefined
  const dispatch = useDispatch<AppDispatch>();

  // Селектор для выборки поста по его ID из Redux store
  const posts = useSelector((state: RootState) => state.postReducer.posts);

  useEffect(() => {
    // Проверяем, есть ли postId перед его использованием
    if (postId) {
      try {
        dispatch(fetchPostById(postId));
      } catch (error) {
        console.error("An error occurred while fetching the post:", error);
      }
    }
  }, [dispatch, postId]);

  if (!posts) {
    console.error("Post not found for postId:", postId);
    return (
      <div>
        <p>Error: Post not found</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {posts.map(
          (singlePost) =>
            singlePost._id === postId && (
              <div key={singlePost._id}>
                <h2>{singlePost.title}</h2>
                <p>{singlePost.desc}</p>
                <p>{singlePost.document}</p>
                <img src={singlePost.imageURL} alt="Post" />
              </div>
            )
        )}
      <FormComments postId={postId}/>
      <CommentList postId={postId}/>
      </div>
    </div>
  );
}

export default FullPost;
