import { useCallback, useEffect, useMemo, useState } from "react";
import SidePanel from "./SidePanel";
import { v4 as uuidv4 } from "uuid";
import { DirectedGraph } from "graphology";
import { GraphDisplay } from "./GraphDisplay";
import NodeDetail from "./NodeDetail";
import { data } from "./data/solar/solarData";

export const GraphRoot = () => {
    const graph = useMemo(() => new DirectedGraph(), []);
    const [nodeDetail, setNodeDetail] = useState(null);

    const nodeExists = useCallback(
        (label) => (graph.nodes().find((l) => l === label) ? true : false),
        [graph]
    );

    const gatherNodeDetail = (label) => {
        label
            ? setNodeDetail({
                  ...graph.getNodeAttributes(label),
                  connections: graph.neighbors(label).length,
                  ingress: graph.inDegree(label),
                  outgress: graph.outDegree(label),
              })
            : setNodeDetail(null);
    };

    const edgeExists = useCallback(
        (sourceLabel, targetLabel) =>
            graph.inEdges(targetLabel, sourceLabel).length ? true : false,
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
                size: 3,
                color: "darkgrey",
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
            onNewEdge(source, target);
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
        console.log(edgeExists(source, target));
        graph.dropEdge(source, target);
    };

    const onClear = () => {
        graph.clear();
    };

    return (
        <div className="row m-3">
            <div className="col-8">
                <GraphDisplay
                    graph={graph}
                    gatherNodeDetail={gatherNodeDetail}
                />
            </div>
            <div className="col-4">
                <div className="row">
                    <div className="col">
                        <SidePanel
                            handleNewNode={onNewNode}
                            handleNewEdge={onNewEdge}
                            handleDropEdge={onDropEdge}
                            handleDeleteNode={onDeleteNode}
                            handleClear={onClear}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <NodeDetail nodeDetail={nodeDetail} />
                    </div>
                </div>
            </div>
        </div>
    );
};
