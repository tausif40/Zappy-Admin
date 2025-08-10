import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

// add city
export const addCategory = createAsyncThunk("addOns/addCategory", async (data, thunkAPI) => {
	try {
		console.log(data)
		const response = await apiClient.post("/categories", data);
		console.log(response);
		return { status: response.status, data: response.data };
	} catch (error: any) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

// create add-on
export const createAddon = createAsyncThunk("addOns/createAddon", async (data, thunkAPI) => {
	try {
		console.log("Creating addon with data:", data);
		const response = await apiClient.post("/addons", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		});
		console.log("Addon creation response:", response);
		return { status: response.status, data: response.data };
	} catch (error: any) {
		console.log("Addon creation error:", error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const getCategory = createAsyncThunk("addOns/getCategory", async (_, thunkAPI) => {
	try {
		const response = await apiClient.get("/categories");
		console.log(response);
		return response.data;
	} catch (error: any) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	category: { data: [], isLoading: false, error: null as unknown },
	addOns: { data: [] as any[], isLoading: false, error: null as unknown }
};

const addOnsSlice = createSlice({
	name: "addOns",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// addCategory
			.addCase(getCategory.pending, (state) => {
				state.category.isLoading = true;
				state.category.error = null;
			})
			.addCase(getCategory.fulfilled, (state, action) => {
				state.category.isLoading = false;
				state.category.error = null;
				state.category.data = action.payload;
			})
			.addCase(getCategory.rejected, (state, action) => {
				state.category.isLoading = false;
				state.category.error = action.payload as string | null;
			})
			// createAddon
			.addCase(createAddon.pending, (state) => {
				state.addOns.isLoading = true;
				state.addOns.error = null;
			})
			.addCase(createAddon.fulfilled, (state, action) => {
				state.addOns.isLoading = false;
				state.addOns.error = null;
				if (state.addOns.data && Array.isArray(state.addOns.data)) {
					state.addOns.data = [...state.addOns.data, action.payload.data];
				} else {
					state.addOns.data = [action.payload.data];
				}
			})
			.addCase(createAddon.rejected, (state, action) => {
				state.addOns.isLoading = false;
				state.addOns.error = action.payload as string | null;
			});
	}
});

export default addOnsSlice.reducer;
