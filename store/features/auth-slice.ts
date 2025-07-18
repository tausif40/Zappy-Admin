import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

// Login User
export const adminLogin = createAsyncThunk("auth/adminLogin", async (credentials, thunkAPI) => {
	try {
		const response = await apiClient.post("/admin/login", credentials);
		console.log(response);

		return { status: response.status, data: response.data };
	} catch (error: any) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
}
);

interface AuthState {
	user: { status: number; data: any } | null;
	isLoading: boolean;
	error: unknown | null;
}

const initialState: AuthState = {
	user: null,
	isLoading: false,
	error: null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//login
			.addCase(adminLogin.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(adminLogin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.user = action.payload;
			})
			.addCase(adminLogin.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	}
});

export default authSlice.reducer;
