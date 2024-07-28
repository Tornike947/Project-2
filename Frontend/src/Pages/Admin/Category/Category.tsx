import { useEffect, useState } from "react";
import { CategoryI } from "@/Types/Category.interface";
import { twMerge } from "tailwind-merge";
import { CheckBox } from "@/Components/UI";

type Props = {
  category: CategoryI;
  handleSelect: (id: string) => void;
  selectedP: boolean;
};

const Category = ({ category, handleSelect, selectedP }: Props) => {
  const [selected, setSelected] = useState(selectedP);

  useEffect(() => {
    setSelected(selectedP);
  }, [selectedP]);

  const onSelect = (id: string) => {
    handleSelect(id);
    setSelected((prev) => !prev);
  };
  return (
    <div
      onClick={() => onSelect(category.id)}
      className={twMerge(
        "flex justify-between items-center p-3 h-[53px] w-full bg-white",
        "rounded-xl border cursor-pointer shadow-[inset_10px_5px_20px_-5px_#0000001A]",
        "transition-all duration-300 ease-in-out border-transparent border-b-2 border-r-2",
        selected && "border-primary border-b-4 border-r-4"
      )}
    >
      <p>{category.name}</p>
      <CheckBox clickable={false} id={category.id} checked={selected} />
    </div>
  );
};

export default Category;
