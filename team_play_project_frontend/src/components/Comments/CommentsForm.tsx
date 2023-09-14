import { useState, ChangeEvent, FormEvent } from "react";
import style from "./FormComments.module.css";
import { AppDispatch } from "../../app/store";
import { addComment } from "../../features/CommentSlice";
import { useDispatch } from "react-redux";

interface CommentsFormProps {
  postId: string; // Принимаем postId как пропс
  onSubmit: () => void;
}

function FormComments({ postId, onSubmit }: CommentsFormProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAddComment = async () => {
    try {
      if (!text.trim()) {
        setError("Comment text cannot be empty.");
        return;
      }

      // Отправка данных комментария с postId
      await dispatch(addComment({ postId, text }));

      // Очистите поле ввода комментария после успешного добавления
      setText("");
      onSubmit(); // Вызываем onSubmit, чтобы обновить список комментариев
    } catch (error) {
      // Обработка ошибок
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setError(""); // Сбрасываем ошибку при изменении текста
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleAddComment();
  };

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.content}>
          <div className={style.inputContainer}>
            <input
              className={style.input}
              type="text"
              placeholder="Write your comment here..."
              value={text}
              onChange={handleChange}
            />
          </div>
          <div className={style.btnContainer}>
            <button className={style.btn} type="submit" onClick={handleSubmit}>
              ADD
            </button>
          </div>
        </div>
      </form>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}

export default FormComments;
