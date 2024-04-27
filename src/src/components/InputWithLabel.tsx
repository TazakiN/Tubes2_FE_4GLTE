import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { store } from "../App";
import React from "react";
import JudulValidator from "./JudulValidator";

const InputWithLabel = ({
  label,
  inputId,
}: {
  label: string;
  inputId: string;
}) => {
  const [judulMulai, setJudulMulai] = store.useState("JudulMulai");
  const [judulTujuan, setJudulTujuan] = store.useState("JudulTujuan");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    if (inputId === "judulMulai") {
      setJudulMulai(title);
      console.log(judulMulai);
    } else if (inputId === "judulTujuan") {
      setJudulTujuan(title);
      console.log(judulTujuan);
    }
  };

  let placeHolderText: string = "";
  if (label === "Judul Halaman Mulai") {
    placeHolderText = "Rocky Gerung";
  } else if (label === "Judul Halaman Tujuan") {
    placeHolderText = "Joko Widodo";
  } else {
    // label === "Kedalaman"
    placeHolderText = "2";
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 text-center">
      <Label htmlFor={inputId} className="py-2">
        {label}{" "}
      </Label>
      <Input
        type="text"
        id={inputId}
        placeholder={placeHolderText}
        onChange={handleChange}
        autoComplete="off"
      />
      <JudulValidator inputId={inputId} />
    </div>
  );
};

export default InputWithLabel;
