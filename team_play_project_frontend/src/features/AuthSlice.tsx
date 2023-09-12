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
  SignIn: null,
  authSignUp: null,
  error: null,
  signingUp: false,
  signingIn: false,
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

export const SignIn = createAsyncThunk<string, User>(
  "auth/signIn",
  async ({ login, password }: User, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:4000/user", {
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
      thunkAPI.rejectWithValue(e + 'asdasdasd');
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
        state.createUser = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUser = false;

        state.error = action.payload;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.createUser = false;
        state.error = null;
      })
      .addCase(SignIn.pending, (state) => {
        state.SignIn = true;
      })
      .addCase(SignIn.rejected, (state, action) => {
        state.SignIn = true;

        state.error = action.payload;
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.SignIn = true;
        state.error = null;

        state.token = action.payload;
      });
  },
});

export default authSlice.reducer;
