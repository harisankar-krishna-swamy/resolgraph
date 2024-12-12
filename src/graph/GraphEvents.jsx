import { useState, useEffect } from "react";
import { useSigma, useRegisterEvents, useSetSettings } from "@react-sigma/core";

const NODE_FADE_COLOR = "#bbb";
const EDGE_FADE_COLOR = "#eee";

const GraphEvents = () => {
    const sigma = useSigma();
    const setSettings = useSetSettings();
    const [interestNode, setInterestNode] = useState(null);
    const [dragNode, setDragNode] = useState(null);

    const registerEvents = useRegisterEvents();
    const graph = sigma.getGraph();

    useEffect(() => {
        // Register the events
        registerEvents({
            // node events
            enterNode: (event) => {
                setInterestNode(event.node);
            },
            leaveNode: (event) => {
                setInterestNode(null);
            },
            downNode: (e) => {
                setDragNode(e.node);
                graph.setNodeAttribute(e.node, "highlighted", true);
            },
            // On mouse move, if the drag mode is enabled, we change the position of the interestNode
            mousemovebody: (e) => {
                if (!dragNode) return;
                // Get new position of node
                const pos = sigma.viewportToGraph(e);
                graph.setNodeAttribute(dragNode, "x", pos.x);
                graph.setNodeAttribute(dragNode, "y", pos.y);

                // Prevent sigma to move camera:
                e.preventSigmaDefault();
                e.original.preventDefault();
                e.original.stopPropagation();
            },
            // On mouse up, we reset the autoscale and the dragging mode
            mouseup: () => {
                if (dragNode) {
                    setDragNode(null);
                    graph.removeNodeAttribute(dragNode, "highlighted");
                }
            },
            // Disable the autoscale at the first down interaction
            mousedown: () => {
                if (!sigma.getCustomBBox())
                    sigma.setCustomBBox(sigma.getBBox());
            },
            // edge events
            hoverEdge: (event) => console.log("clickEdge", event.edge),
        });
    }, [registerEvents, interestNode, dragNode, graph, sigma]);

    useEffect(() => {
        const hoveredColor =
            (interestNode && sigma.getNodeDisplayData(interestNode)?.color) ||
            "";

        setSettings({
            nodeReducer: (node, data) => {
                if (interestNode) {
                    const newData =
                        node === interestNode ||
                        graph.neighbors(interestNode).includes(node)
                            ? { ...data, highlighted: true, zIndex: 1 }
                            : {
                                  ...data,
                                  highlighted: false,
                                  zIndex: 0,
                                  color: NODE_FADE_COLOR,
                              };
                    return newData;
                }
                return data;
            },
            edgeReducer: (edge, data) => {
                if (interestNode) {
                    return graph.hasExtremity(edge, interestNode)
                        ? { ...data, color: hoveredColor, size: 4 }
                        : { ...data, color: EDGE_FADE_COLOR, hidden: true };
                }
                return data;
            },
        });
    }, [interestNode, setSettings, sigma, graph]);

    return null;
};

export default GraphEvents;
