import { useMemo } from "react";
import {
    SigmaContainer,
    ControlsContainer,
    ZoomControl,
} from "@react-sigma/core";
import { NodeImageProgram } from "@sigma/node-image";
import GraphEvents from "./GraphEvents";
import "@react-sigma/core/lib/react-sigma.min.css";

const sigmaStyle = {
    height: "800px",
    width: "1200px",
};

// Component that display the graph
export const GraphDisplay = ({ graph }) => {
    const sigmaSettings = useMemo(
        () => ({
            nodeProgramClasses: { image: NodeImageProgram },
            defaultNodeType: "image",
            defaultEdgeType: "arrow",
            labelDensity: 0.07,
            labelGridCellSize: 60,
            labelRenderedSizeThreshold: 15,
            labelFont: "Lato, sans-serif",
            zIndex: true,
        }),
        []
    );

    return (
        <div className="card">
            <div className="card-header">Graph</div>
            <div className="card-body">
                <SigmaContainer
                    graph={graph}
                    style={sigmaStyle}
                    settings={sigmaSettings}
                    className="react-sigma"
                >
                    <ControlsContainer position={"top-right"}>
                        <ZoomControl />
                    </ControlsContainer>
                    <GraphEvents />
                </SigmaContainer>
            </div>
        </div>
    );
};
