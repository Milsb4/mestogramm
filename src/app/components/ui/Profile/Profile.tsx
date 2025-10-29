import avatar from '@/public/avatar.jpg';
import edit from '@/public/edit-icon.svg';
import Image from "next/image";

export const Profile = () => {
  return (
    <div className="flex flex-row gap-[40px]">
      <Image
        alt="Аватар"
        src={avatar}
        width={150}
        height={150}
        className="ml-[20px] border-2 rounded-[80px] cursor-pointer"
      />
      <div>
        <h2 className="mt-[10px] mr-[30px]">Александр</h2>
        <p>Студент</p>
      </div>
      <span className="mt-[10px] cursor-pointer block h-[20px] w-[20px] border border-solid border-[#ffffff] bg-[#000000]">
        <Image
         alt="Карандаш редактирования"
        src={edit}
        width={10}
        height={10}
        className="p-[5px]"
        />
      </span>
    </div>
  );
};
