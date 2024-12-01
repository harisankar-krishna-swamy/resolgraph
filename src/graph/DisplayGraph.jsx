import { useState } from "react";
import { SigmaContainer } from "@react-sigma/core";
import SidePanel from "./SidePanel";
import { GraphLoader } from "./GraphLoader";
import "@react-sigma/core/lib/react-sigma.min.css";
import { graphNodes } from "./data";

const sigmaStyle = {
    height: "800px",
    width: "1200px",
    backgroundColor: "lightgray",
};

// Component that display the graph
export const DisplayGraph = () => {
    const [nodes, setNodes] = useState(graphNodes);

    const onNewNode = (data) => {
        setNodes([...nodes, data]);
    };

    const onClear = (data) => {
        setNodes([]);
    };

    return (
        <div className="row m-3">
            <div className="col-8">
                <SigmaContainer style={sigmaStyle}>
                    <GraphLoader graphData={nodes} />
                </SigmaContainer>
            </div>
            <div className="col-4">
                <SidePanel handleNewNode={onNewNode} handleClear={onClear} />
            </div>
        </div>
    );
};
