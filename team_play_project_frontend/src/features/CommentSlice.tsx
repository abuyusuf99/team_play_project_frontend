import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { RootState } from "../app/store";

export interface Comment {
  user: string;
  email: string;
  text: string;
  _id: string;
  post: string;
}

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

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, text }: AddCommentArgs, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

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

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:9000/comments");

      if (response.status !== 200) {
        throw new Error("Server error");
      }

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

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;