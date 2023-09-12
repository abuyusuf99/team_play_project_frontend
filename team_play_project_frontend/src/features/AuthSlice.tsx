import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import bcrypt from "bcrypt"

// Интерфейс для комментариев
export interface User {
  nickName: string;
  login: string;
  avatarURL: string;
  password: string;
}

// Интерфейс состояния комментариев
export interface CommentState {
  comments: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState = {
  loged: null,
  authSignUp: null,
  error: null,
  token: localStorage.getItem("token"),
};

// Создание асинхронного Thunk-экшена для добавления комментария
export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ login, password, nickName, avatarURL }: User, thunkAPI) => {
    try {
        console.log(login,password,nickName, avatarURL);
      const res = await fetch(`http://localhost:4000/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login:login, password:password, nickName:nickName, avatarURL:avatarURL}),
      });

      const json = await res.json()
      if(json.error){
        return thunkAPI.rejectWithValue(json.error)
      }
      return json
    //   return res.json("Авторизация прошла успешно");
    } catch (e) {
        console.log("ошибка fetch");
        
      thunkAPI.rejectWithValue(e + '12314134');
    }
  }
);

//фетч логин
export const authlogin = createAsyncThunk<string, User>(
  "auth/login",
  async ({ login, password }: User, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const token = await res.json();
      console.log(token);

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      localStorage.setItem("token", token);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

// Создание среза (slice) для управления состоянием комментариев
const authSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.createUser = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUser = false;
        state.error = action.payload;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.createUser = true;
        state.error = null;
      })
      .addCase(authlogin.pending, (state) => {
        state.loged = false;
      })
      .addCase(authlogin.rejected, (state, action) => {
        state.loged = false;
        state.error = action.payload

      })
      .addCase(authlogin.fulfilled, (state, action) => {
        state.loged = true;
        state.error = null;

        state.token = action.payload;
      });
  },
});

export default authSlice.reducer;
