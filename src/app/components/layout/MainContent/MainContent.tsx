import { Card } from "@/app/shared/Card";

export const MainContent = () => {
  return (
    <article
    >
        <ul 
        className="flex list-none gap-[20px]">
            <li>
                <Card></Card>
                
            </li>
            <li>
                <Card></Card>
                
            </li>
            <li>
                <Card></Card>
                
            </li>
        </ul>
    </article>
  );
};
