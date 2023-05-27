"use client";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

// import { sub } from "date-fns";

import axiosInstance from "@utils/axiosInstance";

const POSTS_URL = "/api/prompt";

// const postsAdapter = createEntityAdapter({
//   sortComparer: (a, b) => b.date.localeCompare(a.date),
// });

const initialState = {
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  posts: [],
};

// Apply retry-axios middleware
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axiosInstance.get(POSTS_URL);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.posts = action.payload;

        // return action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.prompt.posts;
export const getPostsStatus = (state) => state.prompt.status;
export const getPostsError = (state) => state.prompt.error;

// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId);

//getSelectors creates these selectors and we rename theme with aliases using destructuring

// export const {
//   selectAll: selectAllPosts,
//   // selectById: selectPostById,
//   // selectIds: selectPostIds,
//   //Pass in a selector that returns the posts slice of state
// } = postsAdapter.getSelectors((state) => state.posts);

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.userId === userId)
// );
export default postSlice.reducer;
