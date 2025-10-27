import Image from "next/image";
import { Profile } from "../../ui/Profile/Profile";
import { Button } from "../../ui/Button/Button";

export const Header = () => {
  return (
    <header className="flex flex-col gap-[20px]">
      <Image
        alt="Логотип страницы"
        src=""
        width={100}
        height={50}
        className="border-b w-[1000px] border-b-solid border-[#ffffff]"
      />
      <div className="flex justify-between">
        <Profile />
        <Button image="" />
      </div>
    </header>
  );
};
