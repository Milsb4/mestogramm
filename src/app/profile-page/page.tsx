'use client'

import Image from "next/image";
import avatar from "@/public/avatar.jpg";
import Link from "next/link";
import { Footer } from "@/components/layout/footer/Footer";
import { useUserContext } from "@/utils/context/UserContex";
import { useState } from "react";

const newData= {
  name: 'антоха',
  profile: 'Worker'
}

// обязательно обявлять так, если это страничка + соблюдать нейминг файлов
export default function ProfilePage() {
  const { profileInfo, changeProfileInfo } = useUserContext()
  const [newName, SetNewName] = useState('')
  const [newProf, SetNewProf] = useState('')

  const handleChange = () => {
    changeProfileInfo(newName, newProf)
  }
  
  return (
    <div>
      <Link href="/">
        <h1 className="m-4 text-5xl">Mestogramm</h1>
      </Link>
      <span className="block h-10 w-[100%] bg-white"></span>
      <div className="mt-20 justify-center flex gap-[7vw]">
        <Image
          alt="Аватар"
          src={avatar}
          width={250}
          height={250}
          className="ml-5 border-2 rounded-[80px] cursor-pointer"
        />
        <div>
          <h2 className="text-3xl">ваш профиль</h2>
          <div className="mt-4 flex flex-col pb-4 w-[400px] border-t border-t-solid border-b border-b-solid border-white">
            <input required value={newName} onChange={(e) => SetNewName(e.target.value)} placeholder={profileInfo.name} className="p-1 mt-4 text-2xl text-black"/>
            <input required value={newProf} onChange={(e) => SetNewProf(e.target.value)}placeholder={profileInfo.profession} className="p-1 mt-4 text-2xl text-black"/>
          </div>
          <button onClick={handleChange} className="border cursor-pointer h-10 w-60 mt-5">Редактировать профиль</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
