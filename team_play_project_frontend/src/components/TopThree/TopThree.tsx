import React from 'react';
import { Link } from 'react-router-dom';
import style from './Post.module.css';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
interface PostProps {
  title: string;
  text: string;
  imageURL: string;
  link: string;
}

const TopThree: React.FC<PostProps> = ({ title, text, imageURL, link }) => {
    const posts = useSelector((state: RootState) => state.postReducer.posts);
  return (
    <div className={style.block}>
      <img className={style.img} src={imageURL} alt="*"/>
      <h1 className={style.title}>{title}</h1>
      <p className={style.text}>{text}</p>
      <Link to={link}>к новости</Link>
    </div>
  );
};

export default TopThree;