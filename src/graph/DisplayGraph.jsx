import { useState } from "react";
import { SigmaContainer } from "@react-sigma/core";
import SidePanel from "./SidePanel";
import { GraphLoader } from "./GraphLoader";
import { v4 as uuidv4 } from "uuid";
import "@react-sigma/core/lib/react-sigma.min.css";
import { data } from "./data";

const sigmaStyle = {
    height: "800px",
    width: "1200px",
    background: "lightgray",
};

// Component that display the graph
export const DisplayGraph = () => {
    const emptyGraph = { nodes: [], edges: [] };
    const [graphData, setGraphData] = useState(data);

    const onNewNode = (nodeLabel) => {
        const exists = graphData.nodes.find((n) => n.label === nodeLabel);
        if (exists) return;

        const newNode = {
            key: uuidv4(),
            x: Math.random() * 10 + 50,
            y: Math.random() * 10 + 50,
            size: 20,
            label: nodeLabel,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        };

        setGraphData({ ...graphData, nodes: [...graphData.nodes, newNode] });
    };

    const onNewEdge = (source, target) => {
        const sourceNode = graphData.nodes.find((n) => n.label === source);
        const targetNode = graphData.nodes.find((n) => n.label === target);
        if (!sourceNode || !targetNode) return;

        const exists = graphData.edges.find(
            ([s, t]) => s === sourceNode.key && t === targetNode.key
        );
        if (exists) return;

        const newEdge = [sourceNode.key, targetNode.key];

        setGraphData({ ...graphData, edges: [...graphData.edges, newEdge] });
    };

    const onClear = () => {
        setGraphData(emptyGraph);
    };

    return (
        <div className="row m-3">
            <div className="col-8">
                <SigmaContainer style={sigmaStyle}>
                    <GraphLoader {...graphData} />
                </SigmaContainer>
            </div>
            <div className="col-4">
                <SidePanel
                    handleNewNode={onNewNode}
                    handleNewEdge={onNewEdge}
                    handleClear={onClear}
                />
            </div>
        </div>
    );
};
