import { useState, useEffect } from "react";
import { useSigma, useRegisterEvents, useSetSettings } from "@react-sigma/core";

const NODE_FADE_COLOR = "#bbb";
const EDGE_FADE_COLOR = "#eee";

const GraphEvents = () => {
    const sigma = useSigma();
    const setSettings = useSetSettings();
    const [interestNode, setHoverNode] = useState(null);

    const registerEvents = useRegisterEvents();
    const graph = sigma.getGraph();

    useEffect(() => {
        console.log("register events");
        // Register the events
        registerEvents({
            // node events
            clickNode: (event) => {
                interestNode === event.node
                    ? setHoverNode("")
                    : setHoverNode(event.node);
            },
            enterNode: (event) => {
                //setHoverNode(event.node);
            },
            leaveNode: (event) => {
                //setHoverNode(null);
            },
            // edge events
            hoverEdge: (event) => console.log("clickEdge", event.edge),
        });
    }, [registerEvents, interestNode]);

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
