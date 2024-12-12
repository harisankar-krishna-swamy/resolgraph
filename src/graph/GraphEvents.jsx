import { useState, useEffect } from "react";
import { useSigma, useRegisterEvents, useSetSettings } from "@react-sigma/core";

const NODE_FADE_COLOR = "#bbb";
const EDGE_FADE_COLOR = "#eee";

const GraphEvents = () => {
    const sigma = useSigma();
    const setSettings = useSetSettings();
    const [hoverNode, setHoverNode] = useState(null);

    const registerEvents = useRegisterEvents();
    const graph = sigma.getGraph();

    useEffect(() => {
        console.log("register events");
        // Register the events
        registerEvents({
            // node events
            clickNode: (event) => {
                hoverNode === event.node
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
            clickEdge: (event) => console.log("clickEdge", event.edge),
        });
    }, [registerEvents, hoverNode]);

    useEffect(() => {
        const hoveredColor =
            (hoverNode && sigma.getNodeDisplayData(hoverNode)?.color) || "";

        setSettings({
            nodeReducer: (node, data) => {
                if (hoverNode) {
                    const newData =
                        node === hoverNode ||
                        graph.neighbors(hoverNode).includes(node)
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
                if (hoverNode) {
                    return graph.hasExtremity(edge, hoverNode)
                        ? { ...data, color: hoveredColor, size: 4 }
                        : { ...data, color: EDGE_FADE_COLOR, hidden: true };
                }
                return data;
            },
        });
    }, [hoverNode, setSettings, sigma, graph]);

    return null;
};

export default GraphEvents;
