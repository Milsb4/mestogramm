'use client'
import { useContext, createContext, useEffect, useState } from "react";
import { API_ORIGIN, authApi, usersApi } from "@/utils/api";


const UserContext = createContext();
const initialState ={
    id: null,
    name: 'Жак-Ив Кусто',
    profession: 'Иследователь',
    avatarUrl: null,
    cardsCount: 0,
    commentsCount: 0,
}

export const UserProvider = ({children}) => {
const [profileInfo, setProfileInfo] = useState(initialState)
const [isAuth, setIsAuth] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const loadMe = async () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    setIsAuth(false);
    return;
  }

  try {
    setIsLoading(true);
    const me = await usersApi.getMe();
    const normalizedAvatar = me.avatarUrl
      ? me.avatarUrl.startsWith("/uploads")
        ? `${API_ORIGIN}${me.avatarUrl}`
        : me.avatarUrl
      : null;
    setProfileInfo({
      id: me.id ?? null,
      name: me.name || initialState.name,
      profession: me.profession || initialState.profession,
      avatarUrl: normalizedAvatar,
      cardsCount: me.cardsCount || 0,
      commentsCount: me.commentsCount || 0,
    });
    setIsAuth(true);
  } catch {
    localStorage.removeItem("token");
    setIsAuth(false);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  loadMe();
}, []);

const changeProfileInfo = async (newName, newProf) => {
    if (!isAuth) throw new Error("Сначала выполните вход на /auth-page");
    await usersApi.updateMe({ name: newName, profession: newProf });
    setProfileInfo({
      id: profileInfo.id,
      name: newName,
      profession: newProf,
      avatarUrl: profileInfo.avatarUrl,
      cardsCount: profileInfo.cardsCount,
      commentsCount: profileInfo.commentsCount,
    });
}

const login = async (email, password) => {
  const data = await authApi.login({ email, password });
  localStorage.setItem("token", data.token);
  await loadMe();
};

const register = async (email, password, name, profession) => {
  const data = await authApi.register({ email, password, name, profession });
  localStorage.setItem("token", data.token);
  await loadMe();
};

const logout = () => {
  localStorage.removeItem("token");
  setIsAuth(false);
  setProfileInfo(initialState);
};

const changeAvatar = async (file) => {
  if (!isAuth) throw new Error("Сначала выполните вход на /auth-page");
  await usersApi.uploadAvatar(file);
  await loadMe();
};

const value = {
    profileInfo,
    changeProfileInfo,
    login,
    register,
    logout,
    changeAvatar,
    isAuth,
    isLoading,
    reloadMe: loadMe,
}

 return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context
};
