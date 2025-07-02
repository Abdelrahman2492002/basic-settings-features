import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./axios";
import { Navigate } from "react-router";

// Async thunks
export const getProfileData = createAsyncThunk(
  "settings/getProfile",
  async () => {
    const response = await axiosInstance("/profile/");
    return response.data;
  }
);

export const editProfileData = createAsyncThunk(
  "settings/editProfile",
  async (formData) => {
    const response = await axiosInstance.patch("/profile/", formData);
    return response.data;
  }
);

export const deleteImage = createAsyncThunk(
  "settings/deleteImage",
  async (formData) => {
    const response = await axiosInstance.patch("/profile/", formData);
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  "settings/changePassword",
  async (account) => {
    const response = await axiosInstance.post("/change-password/", {
      old_password: account.oldPassword,
      new_password: account.newPassword,
      confirm_password: account.confirmNewPassword,
    });
    return response.data;
  }
);

export const deleteAccount = createAsyncThunk(
  "settings/deleteAccount",
  async () => {
    const confirmed = window.confirm("هل أنت متأكد أنك تريد حذف الحساب؟");
    if (!confirmed) return;
    try {
      await axiosInstance.delete("/delete-account/");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      Navigate("/login");
    } catch (error) {
      console.error("خطأ أثناء حذف الحساب:", error);
      alert("حدث خطأ أثناء حذف الحساب");
    }
  }
);

// Initial state
const initialState = {
  user: {
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "@example.com",
    profile: {
      full_name: "",
      bio: "",
      image: "",
      verified: false,
    },
  },
  status: {
    getProfile: "idle",
    editProfile: "idle",
    deleteImage: "idle",
    changePassword: "idle",
    deleteAccount: "idle",
  },
  error: {
    getProfile: null,
    editProfile: null,
    deleteImage: null,
    changePassword: null,
    deleteAccount: null,
  },
  notifications: {
    inApp: true,
    push: false,
    email: false,
  },
  appearance: {
    theme: "systemTheme",
  },
  account: {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  },
};

// Helpers
const getActionKey = (action) => action.type.split("/")[1];

// Slice
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateProfileImage: (state, action) => {
      const { url } = action.payload;
      state.user.profile.image = url;
    },
    updateTheme: (state, action) => {
      state.appearance.theme = action.payload;
    },
    updateAccountPassword: (state, action) => {
      const { oldPassword, newPassword, confirmNewPassword } = action.payload;
      state.account.oldPassword = oldPassword;
      state.account.newPassword = newPassword;
      state.account.confirmNewPassword = confirmNewPassword;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(editProfileData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.user.profile.image = action.payload;
      })

      // 🟡 Matchers
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          const key = getActionKey(action);
          if (state.status[key] !== undefined) state.status[key] = "loading";
          if (state.error[key] !== undefined) state.error[key] = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          const key = getActionKey(action);
          if (state.status[key] !== undefined) state.status[key] = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          const key = getActionKey(action);
          if (state.status[key] !== undefined) state.status[key] = "failed";
          if (state.error[key] !== undefined)
            state.error[key] = action.error.message;
        }
      );
  },
});

// Exports
export const {
  updateUser,
  updateNotifications,
  updateProfileImage,
  updateTheme,
  updateAccountPassword,
} = settingsSlice.actions;

export default settingsSlice.reducer;
