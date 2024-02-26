import { create } from "zustand";

type Store = {
  username: string;
  password: string;
};

type Actions = {
  addUser: (username: string, password: string) => void;
  removeUser: () => void;
};

const initialState = {
  username: "",
  password: "",
};

export const useAuthenticateUser = create<Store & Actions>((set) => ({
  ...initialState,
  addUser: (username, password) =>
    set(() => ({
      username,
      password,
    })),
  removeUser: () => set(initialState),
}));
