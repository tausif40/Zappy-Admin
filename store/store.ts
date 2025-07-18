import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/features/auth-slice";
import addOptionsSlice from "@/store/features/addOptions-slice";

export const store = configureStore({
	reducer: {
		authSlice: authSlice,
		addOptions: addOptionsSlice
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
