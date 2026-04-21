"use client";

import { useUserContext } from "@/utils/context/UserContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { login, register } = useUserContext();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError("Для регистрации укажи имя.");
          return;
        }
        await register(email, password, name || "User", profession || "");
      }
      setSuccess("Успешно! Перенаправляю на главную...");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (err: any) {
      const message = err.message || "Ошибка авторизации";
      if (mode === "login" && message === "Invalid credentials") {
        setError("Неверный email/пароль. Если аккаунта нет, переключитесь на регистрацию.");
      } else {
        setError(message);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle,_white_0%,_gray_20%,_black_100%)]">
      <div className="container mx-auto max-w-md px-4 py-10">
        <Link href="/" className="text-white underline">
          На главную
        </Link>

        <form onSubmit={onSubmit} className="mt-6 bg-white p-6 rounded-xl shadow">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              className={`rounded p-2 text-sm ${
                mode === "login" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
                setSuccess("");
              }}
              className={`rounded p-2 text-sm ${
                mode === "register" ? "bg-black text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Регистрация
            </button>
          </div>

          <h1 className="text-2xl font-bold mb-4">
            {mode === "login" ? "Вход" : "Регистрация"}
          </h1>

          {mode === "register" && (
            <>
              <input
                className="w-full border rounded p-2 mb-3 text-black placeholder:text-gray-500"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={mode === "register"}
              />
              <input
                className="w-full border rounded p-2 mb-3 text-black placeholder:text-gray-500"
                placeholder="Профессия"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </>
          )}

          <input
            className="w-full border rounded p-2 mb-3 text-black placeholder:text-gray-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border rounded p-2 mb-3 text-black placeholder:text-gray-500"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-black text-white rounded p-2" type="submit">
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </button>

          <p className="w-full mt-2 text-sm text-gray-600 text-center">
            {mode === "login"
              ? "Нет аккаунта? Нажми кнопку «Регистрация» выше."
              : "Уже есть аккаунт? Нажми кнопку «Вход» выше."}
          </p>

          {error && <p className="text-red-600 mt-3">{error}</p>}
          {success && <p className="text-green-700 mt-3">{success}</p>}
        </form>
      </div>
    </main>
  );
}
