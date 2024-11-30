import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useRandom } from "./common/useRandom";

const sigmaStyle = {
    height: "800px",
    width: "1200px",
    backgroundColor: "lightgray",
};

// Component that load the graph
export const LoadGraph = () => {
    const { faker, randomColor } = useRandom();
    const loadGraph = useLoadGraph();

    useEffect(() => {
        const graph = new Graph();
        graph.addNode("first", {
            x: 0,
            y: 0,
            size: 15,
            label: faker.person.fullName(),
            color: randomColor(),
        });
        graph.addNode("second", {
            x: 10,
            y: 10,
            size: 15,
            label: faker.person.fullName(),
            color: randomColor(),
        });
        loadGraph(graph);
    }, [loadGraph]);

    return null;
};

// Component that display the graph
export const DisplayGraph = () => {
    return (
        <SigmaContainer style={sigmaStyle}>
            <LoadGraph />
        </SigmaContainer>
    );
};
