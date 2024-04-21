import { linkToJudul } from "../lib/utils";
import React from "react";
import { toast } from "sonner";

interface ResDisplayerProps {
  data: any; // Assuming 'any' type for now
  isLoading: boolean;
  isError: boolean;
}

export default function ResDisplayer({
  data,
  isLoading,
  isError,
}: ResDisplayerProps) {
  if (isLoading) {
    toast.success("Pencarian sedang dilakukan");
    return <p>Loading...</p>;
  }

  if (isError) return <p>Error</p>;

  return (
    <div className="flex flex-col items-center pt-5">
      <p>Waktu: {data.waktu}</p>
      <p>Panjang Solusi: {data.panjang} </p>
      <div className="flex flex-row space-x-3">
        {data.hasil.map((innerArray: any[]) =>
          innerArray.map((elem: string, index: number) => (
            <React.Fragment key={index}>
              <span>{linkToJudul(elem)}</span>
              {index !== innerArray.length - 1 && <p>{"->"}</p>}
            </React.Fragment>
          )),
        )}
      </div>
    </div>
  );
}
