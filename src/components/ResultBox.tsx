import React from "react";

interface ResultBoxProps {
  title: string;
  link: string;
}

const ResultBox = ({ title, link }: ResultBoxProps) => {
  return (
    <a href={link}>
      <div className="flex size-fit cursor-pointer items-center justify-center rounded-xl bg-primary p-2 text-primary-foreground shadow outline outline-2 outline-offset-1 outline-white hover:bg-primary/90">
        {title}
      </div>
    </a>
  );
};

export default ResultBox;
