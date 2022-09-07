import { TUser } from "../../components/AllModules/ModuleCart";

export type TWord = {
  word: string;
  translate: string;
  wordId?: string;
};

export type TModule = {
  _id?: string;
  title?: string;
  language?: string;
  words: TWord[];
  viewsCount?: number;
  user: TUser;
  created?: string;
  moduleId?: string;
  createdAt?: string;
  moduleCreator?: TUser;
};

export interface IModuleSliceState {
  isSidebarOpen: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  isLoading: boolean;
  module: TModule | null;
  modules: TModule[];
  totalModules: number;
  totalMyModules: number;
  myModules: TModule[];
}
export type TParams = {
  wordId: string;
  moduleId: string;
  word?: string;
  translate?: string;
};
