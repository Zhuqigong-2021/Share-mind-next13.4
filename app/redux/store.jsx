"use client";

import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/prompt/postSlice";

export const store = configureStore({
  reducer: {
    prompt: postReducer,
  },
});
