import React, { useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import debounce from "lodash.debounce";
import { useAppDispatch } from "../../redux/store";
import { clearSearchValue, setSearchValue } from "../../redux/filter/slice";
import {
  searchFilterAllModules,
  sortAllModules,
} from "../../redux/module/slice";

export type TSearch = {
  search: string;
  sort: string;
};

export type TOption = {
  value: string;
  label: string;
};

const AllModulesSearch: React.FC = () => {
  const dispatch = useAppDispatch();

  const colorStyles: StylesConfig = {
    control: (styles) => ({ ...styles, height: "45px" }),
  };
  const { register, handleSubmit, watch, control, setValue } = useForm<TSearch>(
    {
      defaultValues: {
        search: "",
        sort: "oldest",
      },
      mode: "onChange",
    }
  );

  const submitSearch = (data: TSearch) => {
    const { search } = data;
    dispatch(searchFilterAllModules(search));
    dispatch(setSearchValue(search));
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      handleSubmit(submitSearch)();
    }, 150),
    [handleSubmit, dispatch]
  );

  const opt: TOption[] = [
    { value: "oldest", label: "Oldest" },
    { value: "latest", label: "Latest" },
    { value: "words", label: "Words Amount" },
    { value: "popularity", label: "Popularity" },
  ];

  const getValue = (value: string) =>
    value ? opt.find((option) => option.value === value) : "";

  return (
    <section className="allModulesSearchContainer">
      <header className="allModulesSearchContainer__header">
        <h2>Search Form</h2>
      </header>
      <form className="allModulesSearchContainer__formContainer">
        <div className="allModulesSearchContainer__searchForm">
          <label className="allModulesSearchLabel" htmlFor="search">
            Search
          </label>
          <div className="allModulesSearchContainer__searchForm__form">
            <input
              {...register("search")}
              autoComplete="off"
              className="input input__searchAllModules"
              type="text"
              id="search"
              onChange={(e) => {
                setValue("search", e.target.value);
                updateSearchValue(e.target.value);
              }}
            />
            <span className="allModulesSearchIcon">
              <BsSearch />
            </span>
            <button
              onClick={() => {
                dispatch(clearSearchValue());
                setValue("search", "");
              }}
              className={
                watch("search")
                  ? "allModulesCloseIcon allModulesCloseIcon__active"
                  : "allModulesCloseIcon allModulesCloseIcon"
              }
              type="button"
            >
              <IoMdClose />
            </button>
          </div>
        </div>

        <div className="allModulesSearchContainer__sortForm">
          <label htmlFor="sort">Sort by</label>
          <Controller
            control={control}
            name="sort"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Sort Options"
                options={opt}
                value={getValue(value)}
                styles={colorStyles}
                defaultValue={opt[0]}
                onChange={(newValue: TOption | any) => {
                  onChange((newValue as TOption).value);
                  dispatch(sortAllModules(newValue.value));
                }}
              />
            )}
          />
        </div>
      </form>
    </section>
  );
};

export default AllModulesSearch;
