import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosEndpoints } from "../../models/axios-routes";
import customAxios from "../../utils/customAxios";
import { IModuleSliceState, TModule, TParams } from "./types";

export const fetchAllModules = createAsyncThunk(
  "module/fetchAllModules",
  async (_, thunkAPI) => {
    try {
      const { data } = await customAxios.get(AxiosEndpoints.AllModules);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchMyModules = createAsyncThunk(
  "module/fetchMyModules",
  async (userId: string, thunkAPI) => {
    try {
      const { data } = await customAxios.get(
        `${AxiosEndpoints.MyModules}/${userId}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchSingleModule = createAsyncThunk(
  "module/fetchSingleModule",
  async (moduleId: string, thunkAPI) => {
    try {
      const { data } = await customAxios.get(
        `${AxiosEndpoints.AllModules}/${moduleId}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteWord = createAsyncThunk(
  "module/deleteWord",
  async (params: TParams, thunkAPI) => {
    const { moduleId, wordId } = params;
    try {
      await customAxios.patch(
        `${AxiosEndpoints.DeleteWord}/${moduleId}/${wordId}`
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editWord = createAsyncThunk(
  "module/editWord",
  async (data: TParams, thunkAPI) => {
    const { moduleId, wordId, word, translate } = data;
    try {
      await customAxios.patch(
        `${AxiosEndpoints.EditWord}/${moduleId}/${wordId}`,
        {
          word,
          translate,
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: IModuleSliceState = {
  isSidebarOpen: true,
  isEditing: false,
  isDeleting: false,
  isLoading: true,
  module: null,
  modules: [],
  myModules: [],
  totalMyModules: 0,
  totalModules: 0,
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    searchFilterAllModules: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.filter((module: TModule) => {
        if (module.title)
          return module.title
            .toLowerCase()
            .startsWith(payload.toLocaleLowerCase());
        return null;
      });
      state.totalModules = state.modules.length;
    },
    searchFilterMyModules: (state, { payload }: PayloadAction<string>) => {
      state.myModules = state.myModules.filter((module: TModule) => {
        if (module.title)
          return module.title
            .toLowerCase()
            .startsWith(payload.toLocaleLowerCase());
        return null;
      });
      state.totalMyModules = state.myModules.length;
    },

    sortAllModules: (state, { payload }: PayloadAction<string>) => {
      if (payload === "oldest") {
        state.modules = state.modules.map((item: any) => {
          if (item.createdAt)
            return { ...item, createdAt: new Date(item.createdAt) };
          return null;
        });
        state.modules.sort(
          (objA: TModule, objB: TModule) =>
            Number(objA.createdAt) - Number(objB.createdAt)
        );
      } else if (payload === "latest") {
        state.modules = state.modules.map((item: any) => {
          if (item.createdAt)
            return { ...item, createdAt: new Date(item.createdAt) };
          return null;
        });
        state.modules.sort(
          (objA: TModule, objB: TModule) =>
            Number(objB.createdAt) - Number(objA.createdAt)
        );
      } else if (payload === "words") {
        state.modules.sort((a: TModule, b: TModule) => {
          return b.words.length - a.words.length;
        });
      } else {
        state.modules.sort((a: TModule, b: TModule) => {
          if (a.viewsCount && b.viewsCount) return b.viewsCount - a.viewsCount;
          return 0;
        });
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch All Modules

    builder.addCase(fetchAllModules.pending, (state) => {
      state.isLoading = true;
      state.modules = [];
    });
    builder.addCase(fetchAllModules.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalModules = action.payload.count;
      state.modules = action.payload.modules;
    });
    builder.addCase(fetchAllModules.rejected, (state, action) => {
      state.isLoading = false;
      state.modules = [];
    });

    // Fetch My Modules

    builder.addCase(fetchMyModules.pending, (state) => {
      state.isLoading = true;
      state.myModules = [];
    });
    builder.addCase(fetchMyModules.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalMyModules = action.payload.count;
      state.myModules = action.payload.modules;
    });
    builder.addCase(fetchMyModules.rejected, (state) => {
      state.isLoading = false;
      state.myModules = [];
    });

    // Fetch Single Module

    builder.addCase(fetchSingleModule.pending, (state) => {
      state.isLoading = true;
      state.module = null;
    });
    builder.addCase(fetchSingleModule.fulfilled, (state, action) => {
      state.isLoading = false;
      state.module = action.payload;
    });
    builder.addCase(fetchSingleModule.rejected, (state) => {
      state.isLoading = false;
      state.module = null;
    });

    // Delete word
    builder.addCase(deleteWord.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteWord.fulfilled, (state) => {
      state.isDeleting = false;
    });

    // Edit Word
    builder.addCase(editWord.pending, (state) => {
      state.isEditing = true;
    });
    builder.addCase(editWord.fulfilled, (state) => {
      state.isEditing = false;
    });
  },
});
export const {
  toggleSidebar,
  searchFilterAllModules,
  sortAllModules,
  searchFilterMyModules,
} = moduleSlice.actions;

export default moduleSlice.reducer;
