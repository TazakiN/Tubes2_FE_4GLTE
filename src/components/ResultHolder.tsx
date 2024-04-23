import { ArrowRightIcon } from "@radix-ui/react-icons";
import { store } from "../App";
import { linkToJudul, judulToLink } from "../lib/utils";
import ResultBox from "./ResultBox";

interface ResultHolderProps {
  executionTime: number;
  solutionLength: number;
  solutionSequences: string[][];
}

export function ResultHolder({
  executionTime,
  solutionLength,
  solutionSequences,
}: ResultHolderProps) {
  const [bahasa] = store.useState("Bahasa");

  return (
    <div className="w-full ">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-medium">Waktu Eksekusi</div>
        <div className="text-2xl font-bold text-blue-500">{executionTime}</div>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div className="text-lg font-medium">Banyak Langkah</div>
        <div className="text-2xl font-bold text-blue-500">{solutionLength}</div>
      </div>
      <div className="border-t border-gray-800 pt-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-lg font-medium">Solusi: </div>
        </div>
        {solutionSequences.map((innerArray: string[], index: number) => (
          <div key={index} className="mt-4 space-y-2">
            <div className="flex flex-row items-center justify-center">
              {innerArray.map((elem: string, innerIndex: number) => (
                <>
                  <ResultBox
                    title={linkToJudul(elem)}
                    link={`https://${bahasa}.wikipedia.org/wiki/${judulToLink(elem)}`}
                    key={innerIndex}
                  />
                  {innerIndex !== innerArray.length - 1 && (
                    <ArrowRightIcon className="mx-2 h-6 w-6 text-gray-300" />
                  )}
                </>
              ))}
            </div>  
          </div>
        ))}
      </div>
    </div>
  );
}
