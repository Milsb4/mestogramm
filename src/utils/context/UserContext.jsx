'use client'
import { useContext, createContext, useState } from "react";


const UserContext = createContext();
const initialState ={
    name: 'Алексадр',
    profession: 'Student'}

export const UserProvider = ({children}) => {
const [profileInfo, setProfileInfo] = useState(initialState)

const changeProfileInfo = (newName, newProf) => {
    setProfileInfo({
      name: newName,
      profession: newProf
    });
}

const value = {
    profileInfo,
    changeProfileInfo,
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
