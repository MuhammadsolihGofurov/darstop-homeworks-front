import axios, { authAxios } from "@/utils/axios";
import { LOCAL_PRIVATE_ROLE, LOCAL_PRIVATE_TOKEN } from "@/utils/const";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMe = createAsyncThunk("settings/getMe", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem(LOCAL_PRIVATE_TOKEN);

    const response = await axios.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    setUserInfo: (state, action) => {
      state.user_info = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user_info = action.payload;
        state.user_role = action.payload?.role;
        localStorage.setItem(LOCAL_PRIVATE_ROLE, action?.payload?.role);
        state.loading = false;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleOffanvas, getRolesFromLocal, setUserInfo } =
  settingsSlice.actions;

export default settingsSlice.reducer;
