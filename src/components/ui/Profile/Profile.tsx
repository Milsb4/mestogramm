'use client'

import Link from "next/link";
import avatar from "@/public/avatar.jpg";
import edit from "@/public/edit-icon.svg";
import Image from "next/image";
import {useUserContext } from "@/utils/context/UserContex";

export const Profile = () => {
  const { profileInfo } = useUserContext();
  return (
    <div className="flex flex-row gap-[40px]">
      <Image
        alt="Аватар"
        src={avatar}
        width={150}
        height={150}
        className="ml-5 border-2 rounded-[80px] cursor-pointer"
      />
      <div>
        <h2 className="mt-[10px] mr-[30px]">{profileInfo.name}</h2>
        <p>{profileInfo.profession}</p>
      </div>
      <span className="mt-[10px] cursor-pointer hover:opacity-60 block h-[20px] w-[20px] border border-solid border-white bg-black">
        <Link href="/profile-page">
            <Image
              alt="Карандаш редактирования"
              src={edit}
              width={20}
              height={10}
              className="p-[5px]"
            />
        </Link>
      </span>
    </div>
  );
};
