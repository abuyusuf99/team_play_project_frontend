import React from 'react';
import { Link } from 'react-router-dom';
// import style from './Post.module.css';

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
    </div>
  );
};

export default Post;