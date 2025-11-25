import Link from "next/link";
import { Stocks } from "./stocks/page";
import Image from "next/image";
import logo from '../../public/logo.svg';

export default function Home() {
  return (
    <div>
      <Link href="/">
        <Image
        alt="Логотип страницы"
        src={logo}
        width={150}
        height={100}
        className="m-2 cursor-pointer"
      />
      </Link>
      <Stocks/>
    </div>
    
  );
}
