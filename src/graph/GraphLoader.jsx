import { useLoadGraph } from "@react-sigma/core";
import Graph from "graphology";
import { useEffect } from "react";

// Component that load the graph

export const GraphLoader = ({ nodes, edges }) => {
    const loadGraph = useLoadGraph();

    useEffect(() => {
        const graph = new Graph();
        nodes.forEach((node) => {
            graph.addNode(node.key, node);
        });
        edges.forEach(([source, target]) => {
            graph.addEdge(source, target, { size: 2, color: "black" });
        });
        loadGraph(graph);
    }, [nodes, edges, loadGraph]);

    return null;
};
