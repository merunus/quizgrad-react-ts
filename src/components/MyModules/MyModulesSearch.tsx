import React from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { clearSearchValue, setSearchValue } from "../../redux/filter/slice";
import { searchFilterMyModules } from "../../redux/module/slice";
import { useAppDispatch } from "../../redux/store";

export type TMySearch = {
  searchMy: string;
};

const MyModulesSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, watch, setValue } = useForm<TMySearch>({
    mode: "onChange",
  });

  return (
    <div className="myModulesContainer__top__searchContainer">
      <input
        {...register("searchMy")}
        autoComplete="off"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue("searchMy", e.target.value);
          dispatch(setSearchValue(e.target.value));
          dispatch(searchFilterMyModules(e.target.value));
        }}
        className="input input__searchMyModules"
        placeholder="Search Module"
        type="text"
      />
      <IoMdClose
        onClick={() => {
          dispatch(clearSearchValue());
          setValue("searchMy", "");
        }}
        className={
          watch("searchMy") ? "myModulesCloseIcon active" : "myModulesCloseIcon"
        }
      />
      <BsSearch
        className={
          watch("searchMy")
            ? "myModulesContainer__searchContainer__icon"
            : "myModulesContainer__searchContainer__icon active"
        }
      />
    </div>
  );
};

export default MyModulesSearch;
