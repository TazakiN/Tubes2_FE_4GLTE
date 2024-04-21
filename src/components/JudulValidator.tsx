import React from "react";
import axios from "axios";
import { judulToLink } from "../lib/utils";
import { store } from "../App";
import Spinner from "./ui/spinner";

const JudulValidator = ({ inputId }: { inputId: string }) => {
  const [judulMulai] = store.useState("JudulMulai");
  const [judulTujuan] = store.useState("JudulTujuan");
  const [bahasa] = store.useState("Bahasa");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const timerId = setTimeout(async () => {
      try {
        let judul: string;

        if (inputId === "judulMulai") {
          judul = judulMulai as string;
        } else if (inputId === "judulTujuan") {
          judul = judulTujuan as string;
        } else {
          judul = "";
        }

        if (judul === "") {
          setErrorMessage("");
          setSuccessMessage("");
        } else if (judul !== "") {
          setIsLoading(true);

          const response = await axios.get(
            `https://${(bahasa as string).toLowerCase()}.wikipedia.org/api/rest_v1/page/title/${judulToLink(judul)}`,
          );

          console.log(response.data);

          setIsLoading(false);

          if (response.data.items) {
            setSuccessMessage(`Artikel ditemukan di Wikipedia!`);
            setErrorMessage("");
          } else if (response.status === 404) {
            setErrorMessage("Artikel tidak ditemukan di Wikipedia.");
            setSuccessMessage("");
          }
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Artikel tidak ditemukan di Wikipedia.");
        setSuccessMessage("");
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [bahasa, inputId, judulMulai, judulTujuan]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="text-xs text-red-500">{errorMessage}</div>
      )}
      {!isLoading && successMessage && (
        <div className="text-xs text-green-500">{successMessage}</div>
      )}
    </>
  );
};

export default JudulValidator;
