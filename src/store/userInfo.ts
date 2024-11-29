import { createStore  } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserRole } from "@/constants";

interface UserType {
  userEmail?: string; // 账号绑定的163邮箱
  userRole?: UserRole; // 当前角色
  userId?: string | number; // 账号id
  token?: string; // 登录token
}

interface UserInfoStoreType {
  user: UserType;
  setUserInfo: (data: UserType) => void;
  clearUserInfo: () => void;
}

const useUserInfoStore = createStore<UserInfoStoreType>()(
  persist(
    (set) => ({
      user: {},
      setUserInfo: (data: UserType) => {
        set({ user: data });
      },
      clearUserInfo: () => {
        set({ user: {} });
      },
    }),
    {
    name: 'USER_COOKIES_NEED_CHANGE', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  )
);

// const { getState, setState, subscribe, getInitialState } = useUserInfoStore

export default useUserInfoStore
