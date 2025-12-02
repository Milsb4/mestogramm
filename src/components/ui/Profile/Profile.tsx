'use client'

import Link from "next/link";
import avatar from "../../../../public/avatar.jpg";
import edit from "../../../../public/edit-icon-black.svg";
import Image from "next/image";
import { useUserContext } from "@/utils/context/UserContext";

export const Profile = () => {
  const { profileInfo } = useUserContext();
  
  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 max-w-2xl ml-8">
      <div className="relative group">
        <Image
          alt="Аватар"
          src={avatar}
          width={120}
          height={120}
          className="rounded-full object-cover border-4 border-gray-100 shadow-sm group-hover:border-blue-100 transition-all duration-300"
        />
        <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      {/* Информация профиля */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-gray-900 truncate">
            {profileInfo.name || "Пользователь"}
          </h2>
          {profileInfo.profession && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full whitespace-nowrap">
              {profileInfo.profession}
            </span>
          )}
        </div>
        
        <div className="flex gap-6 mt-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="font-bold text-gray-900">24</div>
            <div className="text-xs text-gray-500">Публикации</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900">156</div>
            <div className="text-xs text-gray-500">Лайки</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900">89</div>
            <div className="text-xs text-gray-500">Комментарии</div>
          </div>
        </div>
      </div>

      {/* Кнопка редактирования */}
      <Link 
        href="/profile-page"
        className="flex items-center justify-center w-12 h-12 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl transition-all duration-300 group/edit"
      >
        <Image
          alt="Редактировать профиль"
          src={edit}
          width={20}
          height={20}
          className="opacity-60  group-hover/edit:opacity-80 group-hover/edit:scale-110 transition-all duration-300"
        />
        <span className="sr-only">Редактировать профиль</span>
      </Link>
    </div>
  );
};