import Image from "next/image";
import { Profile } from "../../ui/Profile/Profile";
import { Button } from "../../ui/Button/Button";
import logo from '@/public/logo.svg';
import addIcon from '@//public/add-icon.svg';


export const Header = () => {
  return (
    <header className="flex flex-col gap-[20px]">
      <Image
        alt="Логотип страницы"
        src={logo}
        width={100}
        height={50}
        className="cursor-pointer"
      />
      <span
      className="border-b border-b-solid border-[#ffffff]">
      </span>
      <div className="flex justify-between">
        <Profile />
        <Button image={addIcon} />
      </div>
    </header>
  );
};
