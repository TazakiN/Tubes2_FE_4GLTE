import { store } from "../App";
import { linkToJudul, judulToLink } from "../lib/utils";
import { Button } from "./ui/button";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "./ui/collapsible";

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
      <Collapsible className="border-t border-gray-800 pt-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <div className="text-lg font-medium">Solusi: </div>
          <Button size="icon" variant="ghost">
            <ChevronDownIcon className="h-5 w-5" />
          </Button>
        </CollapsibleTrigger>
        {solutionSequences.map((innerArray: string[], index: number) => (
          <CollapsibleContent key={index} className="mt-4 space-y-2">
            <div>
              {index + 1}.{" "}
              {innerArray.map((elem: string, innerIndex: number) => (
                <>
                  <a
                    href={`https://${bahasa}.wikipedia.org/wiki/${judulToLink(elem)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkToJudul(elem)}{" "}
                  </a>
                  <span>
                    {innerIndex !== innerArray.length - 1 ? "→" : null}{" "}
                  </span>
                </>
              ))}
            </div>
          </CollapsibleContent>
        ))}
      </Collapsible>
    </div>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
