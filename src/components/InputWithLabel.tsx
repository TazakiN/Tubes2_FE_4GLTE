import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { store } from "../App";

const InputWithLabel = ({
  label,
  inputId,
}: {
  label: string;
  inputId: string;
}) => {
  const [judulMulai, setJudulMulai] = store.useState("JudulMulai");
  const [judulTujuan, setJudulTujuan] = store.useState("JudulTujuan");
  const [kedalaman, setKedalaman] = store.useState("kedalaman");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    if (inputId === "judulMulai") {
      setJudulMulai(title);
      console.log(judulMulai);
    } else if (inputId === "judulTujuan") {
      setJudulTujuan(title);
      console.log(judulTujuan);
    } else {
      setKedalaman(parseInt(title));
      console.log(kedalaman);
    }
  };

  let placeHolderText: string = "";
  if (label === "Judul Halaman Mulai") {
    placeHolderText = "Rocky Gerung";
  } else if (label === "Judul Halaman Tujuan") {
    placeHolderText = "Joko Widodo";
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
      />
    </div>
  );
};

export default InputWithLabel;
