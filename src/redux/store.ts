import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./reducers/tableSlice";

export const store = configureStore({
  reducer: {tableReducer},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
