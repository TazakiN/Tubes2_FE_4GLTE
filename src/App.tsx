import React from "react";
import "./App.css";
import InputWithLabel from "./components/InputWithLabel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import RadioButtonGroups from "./components/RadioButtonGroups";
import { Button } from "./components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { createStore } from "state-pool";
import { judulToLink } from "./lib/utils";

export const store = createStore({
  JudulMulai: "",
  JudulTujuan: "",
  Metode: "BFS",
  Bahasa: "ID",
});

function App() {
  const [judulMulai] = store.useState("JudulMulai");
  const [judulTujuan] = store.useState("JudulTujuan");
  const [metode] = store.useState("Metode");
  const [bahasa] = store.useState("Bahasa");

  const handleClick = () => {
    const judulMulaiLink = judulToLink(judulMulai as string);
    const judulTujuanLink = judulToLink(judulTujuan as string);

    const url = `http://localhost:3321/${bahasa}/${metode}/${judulMulaiLink}/${judulTujuanLink}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="m-6 flex min-h-screen items-center justify-center">
      <Card className="p-4 ">
        <CardHeader className="text-center">
          <CardTitle>Wiki Race Path Finder</CardTitle>
          <CardDescription>
            Program untuk menemukan rute tercepat dalam permainan Wiki Race
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-grow flex-row gap-6">
          <RadioButtonGroups
            option1Label={"BFS"}
            option2Label={"IDS"}
            radioGroupTitle={"Metode"}
          />
          <RadioButtonGroups
            option1Label={"EN"}
            option2Label={"ID"}
            radioGroupTitle={"Bahasa"}
          />
        </CardContent>
        <CardContent className="flex flex-row gap-3">
          <InputWithLabel
            label={"Judul Halaman Mulai"}
            inputId={"judulMulai"}
          />
          <InputWithLabel
            label={"Judul Halaman Tujuan"}
            inputId={"judulTujuan"}
          />
        </CardContent>
        <CardContent className="flex justify-center">
          <Button onClick={handleClick}>
            <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
            Temukan Rute
          </Button>
        </CardContent>
        <CardFooter>
          <CardDescription>
            Program dibuat oleh 4GLTE dengan link repository{" "}
            <a
              href="https://github.com/TazakiN/Tubes2_FE_4GLTE"
              className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
              target="_blank"
              rel="noreferrer"
            >
              disini
            </a>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
