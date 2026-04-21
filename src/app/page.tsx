"use client";

import Link from "next/link";
import Stocks from "./stocks/page";
import { useUserContext } from "@/utils/context/UserContext";

export default function Home() {
  const { isAuth, logout } = useUserContext();

  return (
<div className="bg-[radial-gradient(circle,_white_0%,_gray_20%,_black_100%)]">
       <div className="flex px-4 py-4 justify-between bg-white shadow-sm">
        <div className="container mx-auto">
          <Link href="/">
            <h1 className="text-4xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200">
              Mestogramm
            </h1>
          </Link>
        </div>
      
        {isAuth ? (
          <button
            onClick={logout}
            className="w-40 h-10 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg border"
          >
            Выход
          </button>
        ) : (
          <Link href='/auth-page'> 
            <button className=" w-40 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg border cursor-point hover hover:bg-gray-700">Вход</button>
          </Link>
        )}
      </div>
      <Stocks />
    </div>
    
  );
}
