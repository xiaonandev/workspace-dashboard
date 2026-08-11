import React from "react";

type props = {
  name: string;
  onClick: () => void;
};

const InteractiveButton = ({ name, onClick }: props) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-[#44777d] px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 cursor-pointer"
    >
      {name}
    </button>
  );
};

export default InteractiveButton;
