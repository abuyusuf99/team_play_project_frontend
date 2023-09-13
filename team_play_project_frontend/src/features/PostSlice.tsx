import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { RootState } from "../app/store";

export interface Post {
  _id: string;
  imageURL: string;
  document: string,
  title: string;
  desc: string;
  category: string;
  viewsCount: number;
}

export interface PostState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface CreatePostArgs {
  title: string;
  desc: string;
  category: string;
  imageURL: string;
  user: string;
  document: string;
  viewsCount: number;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  error: null,
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, desc, imageURL, document,user,category }: CreatePostArgs) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await axios.post(
        "http://localhost:4000/post",
        {title, imageURL,desc,document,user,category },
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

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:4000/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_) => {
    try {
      const response = await axios.get("http://localhost:4000/post");

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


const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const postIndex = state.posts.findIndex((post) => post._id === action.payload._id);
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload);
      });
  },
});

export default postSlice.reducer;
