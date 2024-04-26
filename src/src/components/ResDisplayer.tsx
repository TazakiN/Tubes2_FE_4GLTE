import React from "react";
import { toast } from "sonner";
import { ResultHolder } from "./ResultHolder";
import { Card } from "./ui/card";

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
    <Card className="w-90 mt-4 flex flex-col items-center p-5">
      <ResultHolder
        executionTime={data.waktu}
        solutionLength={data.panjang}
        solutionSequences={data.hasil}
      />
    </Card>
  );
}
