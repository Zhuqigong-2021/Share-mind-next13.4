"use client";

import { Provider } from "react-redux";
import { store } from "./store";

// store.dispatch(fetchPosts());
export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
