"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { fetchPosts } from "./features/prompt/postSlice";

// store.dispatch(fetchPosts());
export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
