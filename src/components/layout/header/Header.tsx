import { Profile } from "../../ui/Profile/Profile";
import { Button } from "../../ui/Button/Button";
import addIcon from '@//public/add-icon.svg';
import AddModalPhoto from "@/components/forms/AddModalPhoto/AddModalPhoto";
import { UserProvider } from '@/utils/context/UserContex'

export const Header = () => {
  return (
    <header className="flex flex-col gap-5">
      <span
      className="border-b border-b-solid border-white">
      </span>
      <div className="flex justify-between">
        <UserProvider>
          <Profile/>
        <Button image={addIcon} />
        <AddModalPhoto/>  
        </UserProvider>  
      </div>
    </header>
  );
};
