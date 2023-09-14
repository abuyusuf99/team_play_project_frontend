import React from 'react';
import { Link } from 'react-router-dom';


interface PostProps {
  title: string;
  text: string;
  imageURL: string;
  link: string;
}

const Post: React.FC<PostProps> = ({ title, text, imageURL, link }) => {
  return (
    <div>
      <img  src={imageURL} alt="*"/>
      <h1 >{title}</h1>
      <p >{text}</p>
      <Link to={link}>к новости</Link>
    </div>
  );
};

export default Post;