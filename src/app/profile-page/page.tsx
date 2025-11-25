'use client'

import Image from "next/image";
import avatar from "../../../public/avatar.jpg";
import Link from "next/link";
import { Footer } from "@/components/layout/footer/Footer";
import { useUserContext } from "@/utils/context/UserContext";
import { useState } from "react";


// обязательно обявлять так, если это страничка + соблюдать нейминг файлов
export default function ProfilePage() {
  const { profileInfo, changeProfileInfo } = useUserContext();
  const [newName, setNewName] = useState('');
  const [newProf, setNewProf] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    if (!newName.trim() && !newProf.trim()) {
      alert('Заполните хотя бы одно поле');
      return;
    }

    setIsLoading(true);

    try {
      const updatedName = newName.trim() || profileInfo.name;
      const updatedProf = newProf.trim() || profileInfo.profession;

      // Оптимистичное обновление
      await changeProfileInfo(updatedName, updatedProf);
      
      // Очищаем поля после успешного сохранения
      setNewName('');
      setNewProf('');
      console.log('Профиль успешно обновлен!');
      
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      console.log('Ошибка при сохранении');
    } finally {
      setIsLoading(false);
    }
  };

  // Кнопка активна только если есть изменения
  const hasChanges = newName.trim() !== '' || newProf.trim() !== '';

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
            <input 
              required 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder={profileInfo.name} 
              className="p-1 mt-4 text-2xl text-black"
            />
            <input 
              required 
              value={newProf} 
              onChange={(e) => setNewProf(e.target.value)} 
              placeholder={profileInfo.profession} 
              className="p-1 mt-4 text-2xl text-black"
            />
          </div>
          <button 
            onClick={handleChange} 
            disabled={!hasChanges || isLoading}
            className={`border cursor-pointer h-10 w-60 mt-5 ${
              !hasChanges || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          >
            {isLoading ? 'Сохранение...' : 'Редактировать профиль'}
          </button>
          {hasChanges && (
            <button 
              onClick={() => {
                setNewName('');
                setNewProf('');
              }}
              className="border cursor-pointer h-10 w-60 mt-2 text-red-500"
            >
              Отменить изменения
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}