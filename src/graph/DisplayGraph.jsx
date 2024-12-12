import { useCallback, useEffect, useMemo } from "react";
import {
    SigmaContainer,
    ControlsContainer,
    ZoomControl,
} from "@react-sigma/core";
import { NodeImageProgram } from "@sigma/node-image";
import SidePanel from "./SidePanel";
import { v4 as uuidv4 } from "uuid";
import { DirectedGraph } from "graphology";
import { data } from "./data";
import GraphEvents from "./GraphEvents";
import "@react-sigma/core/lib/react-sigma.min.css";

const sigmaStyle = {
    height: "800px",
    width: "1200px",
};

// Component that display the graph
export const DisplayGraph = () => {
    const graph = useMemo(() => new DirectedGraph(), []);
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
    const nodeExists = useCallback(
        (label) => (graph.nodes().find((l) => l === label) ? true : false),
        [graph]
    );

    const edgeExists = useCallback(
        (sourceLabel, targetLabel) =>
            graph.edges(sourceLabel, targetLabel).length ? true : false,
        [graph]
    );
    const onNewNode = useCallback(
        (node) => {
            if (!node || !node.label || nodeExists(node.label)) return;

            graph.addNode(node.label, {
                key: uuidv4(),
                x: Math.random() * 10 + 50,
                y: Math.random() * 10 + 50,
                size: 15,
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                // override with input data
                ...node,
            });
        },
        [graph, nodeExists]
    );

    const onNewEdge = useCallback(
        (source, target, edgeAttrs = {}) => {
            if (
                !nodeExists(source) ||
                !nodeExists(target) ||
                edgeExists(source, target)
            )
                return;

            graph.addEdge(source, target, {
                size: 2,
                color: "black",
                // Override with inputs
                ...edgeAttrs,
            });
        },
        [graph, nodeExists, edgeExists]
    );

    useEffect(() => {
        graph.clear();
        const { nodes, edges } = data;
        nodes.forEach((node) => {
            onNewNode(node);
        });
        edges.forEach(([source, target]) => {
            onNewEdge(source, target, {
                size: 2,
                color: "black",
            });
        });
    }, [graph, onNewNode, onNewEdge]);

    const onDeleteNode = (nodeLabel) => {
        if (!nodeLabel || !nodeExists(nodeLabel)) return;

        graph.dropNode(nodeLabel);
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
                <div className="card">
                    <div className="card-header">Graph</div>
                    <div className="card-body">
                        <SigmaContainer
                            graph={graph}
                            style={sigmaStyle}
                            settings={sigmaSettings}
                            className="react-sigma"
                        >
                            <ControlsContainer position={"bottom-right"}>
                                <ZoomControl />
                            </ControlsContainer>

                            <GraphEvents />
                        </SigmaContainer>
                    </div>
                </div>
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
