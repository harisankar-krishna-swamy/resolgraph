import { useLoadGraph } from "@react-sigma/core";
import Graph from "graphology";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Component that load the graph

export const GraphLoader = ({ graphData }) => {
    const loadGraph = useLoadGraph();

    useEffect(() => {
        const graph = new Graph();
        graphData.forEach((node) => {
            graph.addNode(uuidv4(), node);
        });
        loadGraph(graph);
    }, [graphData, loadGraph]);

    return null;
};
