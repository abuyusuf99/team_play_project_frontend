import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Интерфейс для комментариев
export interface Comment {
  user: {
    user: string,
    email: string,
    avatarURL: string
  },
  email: string;
  text: string;
  _id: string;
  post: string;
}

// Интерфейс состояния комментариев
export interface CommentState {
  comments: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  status: "idle",
  error: null,
};

interface AddCommentArgs {
  postId: string;
  text: string;
}

// Создание асинхронного Thunk-экшена для добавления комментария
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, text }: AddCommentArgs, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      // Отправка POST-запроса на сервер для добавления комментария
      const response = await axios.post(
        `http://localhost:9000/comment/${postId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Server error");
      }

      // Возвращение данных комментария после успешного добавления
      const data = response.data;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unexpected error");
      }
    }
  }
);

// Создание асинхронного Thunk-экшена для загрузки комментариев
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, thunkAPI) => {
    try {
      // Запрос на сервер для загрузки комментариев
      const response = await axios.get("http://localhost:9000/comments");

      if (response.status !== 200) {
        throw new Error("Server error");
      }

      // Возвращение загруженных данных комментариев
      const data = response.data;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unexpected error");
      }
    }
  }
);

// Создание среза (slice) для управления состоянием комментариев
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        // Обработка начала загрузки комментариев
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        // Обработка успешной загрузки комментариев
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        // Обработка ошибки при загрузке комментариев
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addComment.pending, (state) => {
        // Обработка начала добавления комментария
        state.status = "loading";
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        // Обработка успешного добавления комментария
        state.status = "succeeded";
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        // Обработка ошибки при добавлении комментария
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;
