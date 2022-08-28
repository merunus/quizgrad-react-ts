import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterSliceState } from "./types";

const initialState: IFilterSliceState = {
  searchValue: "",
  sort: "latest",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    clearSearchValue: (state) => {
      state.searchValue = "";
    },
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
    setSort: (state, { payload }: PayloadAction<string>) => {
      state.sort = payload;
    },
  },
});
export const { setSearchValue, setSort, clearSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
