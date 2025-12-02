"use client";

import Link from "next/link";
import { useState } from "react";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [prof, setProf] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const hasChanges =
    name.trim() !== "" &&
    prof.trim() !== "" &&
    mail.trim() !== "" &&
    password.trim() !== "";

  return (
    <article className="min-h-screen bg-[radial-gradient(circle,_white_0%,_gray_20%,_black_100%)]">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-4xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200">
              Mestogramm
            </h1>
          </Link>
        </div>
      </div>
      <div className="max-w-md bg-white rounded-2xl shadow-xl overflow-hidden mt-4 m-auto">
        <div className="p-8 bg-gray-100">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Регистрация
            </h2>
            <p className="text-gray-600">Создайте новый аккаунт</p>
          </div>

          <form className="space-y-6" onChange={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Введите почту
              </label>
              <input
                required
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Введите пароль
              </label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Повторите пароль
              </label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Введите Ваше имя
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Введите Вашу профессию
              </label>
              <input
                required
                value={prof}
                onChange={(e) => setProf(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
              />
            </div>
            <Link href="/" className="block">
              <button
                type="submit"
                disabled={!hasChanges}
                className={
                  !hasChanges
                    ? "rounded-lg font-semibold text-lg w-full py-3 px-6 bg-gray-300 text-gray-500 cursor-not-allowed"
                    : `w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-blue-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`
                }
              >
                Зарегистрироваться
              </button>
            </Link>
          </form>
        </div>
      </div>
    </article>
  );
}
