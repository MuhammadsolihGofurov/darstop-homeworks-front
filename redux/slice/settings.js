import { authAxios } from "@/utils/axios";
import { LOCAL_PRIVATE_ROLE } from "@/utils/const";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMe = createAsyncThunk("settings/getMe", async (_, thunkAPI) => {
  try {
    const response = await authAxios.get("/user/me");
    return response.data.data;
  } catch (error) {
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("LOCAL_PRIVATE_TOKEN");
    // }
    return thunkAPI.rejectWithValue("Unauthorized");
  }
});

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    offcanvas: false,
    user_role: "all",
    user_info: null,
  },
  reducers: {
    toggleOffanvas: (state, action) => {
      state.offcanvas = !state.offcanvas;
    },
    getRolesFromLocal: (state, action) => {
      state.user_role =
        typeof window !== "undefined"
          ? localStorage.getItem(LOCAL_PRIVATE_ROLE)
          : "all";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user_info = action.payload;
        state.loading = false;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleOffanvas, getRolesFromLocal } = settingsSlice.actions;

export default settingsSlice.reducer;
