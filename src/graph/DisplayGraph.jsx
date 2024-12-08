import { useEffect, useMemo } from "react";
import { SigmaContainer } from "@react-sigma/core";
import SidePanel from "./SidePanel";
import { v4 as uuidv4 } from "uuid";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { data } from "./data";

const sigmaStyle = {
    height: "800px",
    width: "1200px",
    background: "lightgray",
};

// Component that display the graph
export const DisplayGraph = () => {
    const graph = useMemo(() => new Graph(), []);

    useEffect(() => {
        graph.clear();
        const { nodes, edges } = data;
        nodes.forEach((node) => {
            graph.addNode(node.key, { ...node });
        });
        edges.forEach(([source, target]) => {
            graph.addEdge(source, target, {
                size: 2,
                color: "black",
            });
        });
    }, [graph]);

    const nodeExists = (label) =>
        graph.nodes().find((l) => l === label) ? true : false;

    const edgeExists = (sourceLabel, targetLabel) =>
        graph.edges(sourceLabel, targetLabel).length ? true : false;

    const onDeleteNode = (nodeLabel) => {
        if (!nodeLabel || !nodeExists(nodeLabel)) return;

        graph.dropNode(nodeLabel);
    };

    const onNewNode = (nodeLabel) => {
        if (nodeExists(nodeLabel)) return;

        graph.addNode(nodeLabel, {
            key: uuidv4(),
            x: Math.random() * 10 + 50,
            y: Math.random() * 10 + 50,
            size: 15,
            label: nodeLabel,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        });
    };

    const onNewEdge = (source, target) => {
        if (
            !nodeExists(source) ||
            !nodeExists(target) ||
            edgeExists(source, target)
        )
            return;

        graph.addEdge(source, target, { size: 2, color: "black" });
    };

    const onDropEdge = (source, target) => {
        if (
            !nodeExists(source) ||
            !nodeExists(target) ||
            !edgeExists(source, target)
        )
            return;

        graph.dropEdge(source, target);
    };

    const onClear = () => {
        graph.clear();
    };

    return (
        <div className="row m-3">
            <div className="col-8">
                <SigmaContainer
                    graph={graph}
                    style={sigmaStyle}
                    className="react-sigma"
                ></SigmaContainer>
            </div>
            <div className="col-4">
                <SidePanel
                    handleNewNode={onNewNode}
                    handleNewEdge={onNewEdge}
                    handleDropEdge={onDropEdge}
                    handleDeleteNode={onDeleteNode}
                    handleClear={onClear}
                />
            </div>
        </div>
    );
};
