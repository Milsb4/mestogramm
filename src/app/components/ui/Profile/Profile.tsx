import Image from "next/image";

export const Profile = () => {
  return (
    <div className="flex flex-row gap-[40px]">
      <Image
        alt="Аватар"
        src="/avatar.jpg"
        width={150}
        height={150}
        className="border-2 rounded-[80px]"
      />
      <div>
        <h2 className="mt-[10px] mr-[30px]">Александр</h2>
        <p>Студент</p>
      </div>
      <span className="mt-[10px] block h-[20px] w-[20px] border border-solid border-[#ffffff] bg-[#000000]"></span>
    </div>
  );
};
