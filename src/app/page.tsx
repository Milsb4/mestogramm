import Link from "next/link";
import { Stocks } from "./stocks/page";
import Image from "next/image";
import logo from '../../public/logo.svg';

export default function Home() {
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
      
        <Link href='/auth-page'> 
        <button className=" w-40 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg border cursor-point hover hover:bg-gray-700">Вход</button>
        </Link>
      </div>
      <Stocks />
    </div>
    
  );
}
