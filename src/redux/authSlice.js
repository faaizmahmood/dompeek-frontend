import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../utils/apiClient";
import Cookies from "js-cookie";

// Initial State
const initialState = {
  profile: null,
  loading: false,
  error: null,
  token: Cookies.get("authToken") || null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiService.get("/user/profile"); // adjust endpoint if needed
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    logout(state) {
      state.token = null;
      state.profile = null;
      localStorage.removeItem("authToken");
      Cookies.remove("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { setAuthToken, logout } = userSlice.actions;
export default userSlice.reducer;
