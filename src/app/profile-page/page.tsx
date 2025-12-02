"use client";

import Image from "next/image";
import avatar from "../../../public/avatar.jpg";
import Link from "next/link";
import { Footer } from "@/components/layout/footer/Footer";
import { useUserContext } from "@/utils/context/UserContext";
import { useState } from "react";

export default function ProfilePage() {
  const { profileInfo, changeProfileInfo } = useUserContext();
  const [newName, setNewName] = useState("");
  const [newProf, setNewProf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    if (!newName.trim() && !newProf.trim()) {
      alert("Заполните хотя бы одно поле");
      return;
    }

    setIsLoading(true);

    try {
      const updatedName = newName.trim() || profileInfo.name;
      const updatedProf = newProf.trim() || profileInfo.profession;

      await changeProfileInfo(updatedName, updatedProf);

      setNewName("");
      setNewProf("");
      console.log("Профиль успешно обновлен!");
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      console.log("Ошибка при сохранении");
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges = newName.trim() !== "" || newProf.trim() !== "";

  return (
    <div className="min-h-screen  bg-[radial-gradient(circle,_white_0%,_gray_20%,_black_100%)]">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-4xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200">
              Mestogramm
            </h1>
          </Link>
        </div>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 bg-gray-100">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <Image
                    alt="Аватар"
                    src={avatar}
                    width={200}
                    height={200}
                    className="rounded-full border-4 border-purple-200 shadow-lg transition-all duration-300 group-hover:border-purple-400 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-purple-500 bg-opacity-0 group-hover:bg-opacity-10 rounded-full transition-all duration-300" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {profileInfo.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{profileInfo.profession}</p>
                </div>
              </div>

              {/* Редактирование профиля */}
              <div className="flex-1">
                <div className="mb-8 ">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Редактирование профиля
                  </h2>
                  <p className="text-gray-600">Обновите информацию о себе</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя пользователя
                    </label>
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={profileInfo.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg text-gray-800 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Профессия
                    </label>
                    <input
                      value={newProf}
                      onChange={(e) => setNewProf(e.target.value)}
                      placeholder={profileInfo.profession}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleChange}
                    disabled={!hasChanges || isLoading}
                    className={`
                      w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200
                      ${
                        !hasChanges || isLoading
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 hover:shadow-lg transform hover:-translate-y-0.5"
                      }
                    `}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Сохранение...
                      </span>
                    ) : (
                      "Сохранить изменения"
                    )}
                  </button>

                  {hasChanges && (
                    <button
                      onClick={() => {
                        setNewName("");
                        setNewProf("");
                      }}
                      className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200"
                    >
                      Отменить изменения
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
