import { store } from "../App";
import { judulToLink, linkToJudul } from "../lib/utils";
import Graph from "react-graph-vis";

interface ResultHolderProps {
  executionTime: number;
  solutionLength: number;
  solutionSequences: string[][];
}

type NodeBuatan = {
  id: number;
  label: string;
  color: string;
};

type Edge = {
  from: number;
  to: number;
  id: string;
};

type GraphData = {
  nodes: NodeBuatan[];
  edges: Edge[];
};

export function ResultHolder({
  executionTime,
  solutionLength,
  solutionSequences,
}: ResultHolderProps) {
  const [bahasa] = store.useState("Bahasa");
  function makeLink(title: string) {
    return `https://${bahasa as string}.wikipedia.org/wiki/${judulToLink(title)}`;
  }

  function getNodeIdByLabel(nodes: NodeBuatan[], label: string): number {
    return nodes.find((node) => node.label === label)!.id;
  }

  function getLabelById(nodes: NodeBuatan[], id: number): string {
    return nodes.find((node) => node.id === id)!.label;
  }

  function transformData(data: string[][]): GraphData {
    const nodes: NodeBuatan[] = [];
    const edges: Edge[] = [];

    // Membuat node unik dari data
    for (const row of data) {
      for (const element of row) {
        const existingNode = nodes.find((node) => node.label === element);
        if (!existingNode) {
          nodes.push({
            id: nodes.length + 1,
            label: linkToJudul(element),
            color: "#382B47",
          });
        }
      }
    }

    // Membuat edge dari data
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length - 1; j++) {
        const from = getNodeIdByLabel(nodes, linkToJudul(data[i][j]));
        const to = getNodeIdByLabel(nodes, linkToJudul(data[i][j + 1]));
        // Check if the edge already exists
        const existingEdge = edges.find(
          (edge) => edge.from === from && edge.to === to,
        );
        if (!existingEdge) {
          edges.push({
            from,
            to,
            id: `${from}-${to}`,
          });
        }
      }
    }

    return { nodes, edges };
  }

  const graphData = transformData(solutionSequences);
  console.log("graph Data", graphData);
  const options: any = {
    layout: {
      hierarchical: true,
    },
    nodes: {
      font: {
        color: "#ffffff",
      },
      shape: "box",
    },
    edges: {
      color: "rgb(255,255,255)",
      width: 2,
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 0.5,
        },
      },
      dashes: true,
      smooth: {
        type: "cubicBezier",
        forceDirection: "horizontal",
        roundness: 0.4,
      },
    },
    height: "600px",
  };

  const events = {
    doubleClick: function (event: { nodes: any; edges: any }) {
      console.log("click event", event);
      console.log("judul", getLabelById(graphData.nodes, event.nodes[0]));
      window.open(
        makeLink(getLabelById(graphData.nodes, event.nodes[0])),
        "_blank",
      );
    },
  };

  return (
    <div className="w-full ">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-medium">Waktu Eksekusi</div>
        <div className="text-2xl font-bold text-blue-500">{executionTime}</div>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div className="text-lg font-medium">Kedalaman</div>
        <div className="text-2xl font-bold text-blue-500">
          {solutionLength - 1}
        </div>
      </div>
      <div className="border-t border-gray-800 pt-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-lg font-medium">Solusi: </div>
        </div>
        <div className="flex flex-row items-center justify-center bg-cyan-950">
          <Graph graph={graphData} options={options} events={events}></Graph>
        </div>
      </div>
    </div>
  );
}
