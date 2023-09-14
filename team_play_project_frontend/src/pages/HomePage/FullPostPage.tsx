import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../features/PostSlice";
import { RootState, AppDispatch } from "../../app/store";

function FullPost() {
  const { postId } = useParams<{ postId?: string }>();
  const dispatch = useDispatch<AppDispatch>();
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

        {posts.map((singlePost) => (
          singlePost._id === postId && (
            <div key={singlePost._id}>
              <h2>{singlePost.title}</h2>
              <p>{singlePost.desc}</p>
              <p>{singlePost.document}</p>
              <img src={singlePost.imageURL} alt="Post" />
            </div>
          )
        ))}

        {posts.map(
          (singlePost) =>
            singlePost._id === postId && (
              <div key={singlePost._id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-3xl font-semibold text-gray-800">{singlePost.title}</h2>
                <p className="text-gray-600">{singlePost.desc}</p>
                <p className="text-gray-600">{singlePost.document}</p>
                <div className="relative w-80 h-100 mb-4 overflow-hidden rounded-lg"> {/* Обновленные значения для высоты */}
                  <img
                    src={singlePost.imageURL}
                    alt="Post"
                    className="object-cover w-full h-full" // Используется object-cover для заполнения блока
                  />
                </div>
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
