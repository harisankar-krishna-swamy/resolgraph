import { useEffect, useState } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useRandom } from "./common/useRandom";
import SidePanel from "./SidePanel";
import { v4 as uuidv4 } from "uuid";

const sigmaStyle = {
    height: "800px",
    width: "1200px",
    backgroundColor: "lightgray",
};

// Component that load the graph
export const LoadGraph = ({ graphData }) => {
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

// Component that display the graph
export const DisplayGraph = () => {
    const { faker } = useRandom();
    const [nodes, setNodes] = useState([
        {
            x: Math.random() * 10 + 50,
            y: Math.random() * 10 + 50,
            size: 15,
            label: faker.person.fullName(),
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        },
        {
            x: Math.random() * 10 + 50,
            y: Math.random() * 10 + 50,
            size: 15,
            label: faker.person.fullName(),
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        },
    ]);

    const onNewNode = (data) => {
        console.log(data);
        setNodes([...nodes, data]);
    };

    return (
        <div className="row m-3">
            <div className="col-8">
                <SigmaContainer style={sigmaStyle}>
                    <LoadGraph graphData={nodes} />
                </SigmaContainer>
            </div>
            <div className="col-4">
                <SidePanel handleNewNode={onNewNode} />
            </div>
        </div>
    );
};
