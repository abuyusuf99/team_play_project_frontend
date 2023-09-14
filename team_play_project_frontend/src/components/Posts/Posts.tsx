import React from 'react';
import { Link } from 'react-router-dom';
// import style from './Post.module.css';

const Post: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.postReducer.posts);
  const maxDescLength = 100;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


interface PostProps {
  title: string;
  imageURL: string;
  desc: string;
  document: string;
  link: string;
  viewsCount: number
}


const Post: React.FC<PostProps> = ({ desc, document, title, imageURL, link, viewsCount}) => {
  return (
    <div >
      <img src={imageURL} alt="*"/>
      <h1 >{title}</h1>
      <p>{desc}</p>
      <p>{document}</p>
      <p>Просмотры: {viewsCount}</p>
      <Link to={link}>Читать</Link>


const Post: React.FC<PostProps> = ({ title, text, imageURL, link }) => {
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

    <div>
      <img  src={imageURL} alt="*"/>
      <h1 >{title}</h1>
      <p >{text}</p>
      <Link to={link}>к новости</Link>


    </div>
  );
};

export default Post;