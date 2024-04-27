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
import ResDisplayer from "./components/ResDisplayer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { judulToLink } from "./lib/utils";
import { toast } from "sonner";
import Spinner from "./components/ui/spinner";

export const store = createStore({
  JudulMulai: "",
  JudulTujuan: "",
  Metode: "BFS",
  Bahasa: "EN",
  results: null,
  inputError: "",
});

function App() {
  const [metode] = store.useState("Metode");
  const [displayResult, setDisplayResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [bahasa] = store.useState("Bahasa");
  const [inputError] = store.useState<string>("inputError");
  const [judulMulai] = store.useState<string>("JudulMulai");
  const [judulTujuan] = store.useState<string>("JudulTujuan");

  const resultQuery = useQuery({
    queryKey: ["res"],
    queryFn: async () => {
      const linkMulai = judulToLink(judulMulai);
      const linkTujuan = judulToLink(judulTujuan);

      const res = await axios.get(
        `http://localhost:3321/${bahasa}/${metode}/${linkMulai}/${linkTujuan}`,
      );
      return res.data;
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const handleButtonClick = async () => {
    setDisplayResult(false);
    setIsLoading(true);

    try {
      toast.info("Pencarian sedang dilakukan");
      await resultQuery.refetch();

      setDisplayResult(true);
    } catch (error) {
      toast.error("Terjadi kesalahan saat melakukan pencarian");
      console.error("Error fetching data", error);
    } finally {
      toast.success("Pencarian berhasil diselesaikan");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Card className="p-4 ">
        <CardHeader className="text-center">
          <CardTitle>Wiki Race Path Finder</CardTitle>
          <CardDescription>
            Program untuk menemukan rute tercepat dalam permainan Wiki Race
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-grow flex-row gap-6">
          <CardContent className="flex w-full flex-col">
            <RadioButtonGroups
              option1Label={"BFS"}
              option2Label={"IDS"}
              radioGroupTitle={"Metode"}
            />
          </CardContent>
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
          <Button
            onClick={handleButtonClick}
            disabled={isLoading || inputError === "error"}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
            )}
            {isLoading ? "Loading..." : "Temukan Rute"}
          </Button>
        </CardContent>
        <CardFooter>
          <CardDescription>
            Program dibuat oleh 4GLTE dengan link repository{" "}
            <a
              href="https://github.com/TazakiN/Tubes2_FE_4GLTE"
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noreferrer"
            >
              disini
            </a>
          </CardDescription>
        </CardFooter>
      </Card>
      {displayResult && (
        <ResDisplayer
          data={resultQuery.data}
          isLoading={resultQuery.isLoading}
          isError={resultQuery.isError}
        />
      )}
    </div>
  );
}

export default App;
