import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

// add city
export const addCity = createAsyncThunk("addOptions/addCity", async (data, thunkAPI) => {
	try {
		const response = await apiClient.post("/cities", data);
		console.log(response);
		return { status: response.status, data: response.data };
	} catch (error: any) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	user: null,
	isLoading: false,
	error: null
};

const addOptionsSlice = createSlice({
	name: "addOptions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder;
		//login
		// .addCase(addCity.pending, (state) => {
		// 	state.isLoading = true;
		// 	state.error = null;
		// })
		// .addCase(addCity.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = null;
		// 	state.user = action.payload;
		// })
		// .addCase(addCity.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload;
		// });
	}
});

export default addOptionsSlice.reducer;
