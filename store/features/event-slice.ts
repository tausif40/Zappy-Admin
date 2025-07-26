import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

// add city
export const createBirthDayEvent = createAsyncThunk("addOptions/createBirthDayEvent", async (formData, thunkAPI) => {
	try {
		const response = await apiClient.post("/birthday-events", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
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

const eventSlice = createSlice({
	name: "event",
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

export default eventSlice.reducer;
