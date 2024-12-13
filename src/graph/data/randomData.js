const nodeSize = 18;
const clusters = ["Solar", "Andromeda", "Black star", "Earth"];
const nNodes = 20;
const nodes = [];
for (let i = 0; i < nNodes; i++) {
    nodes[i] = {
        key: (i + 1).toString(),
        cluster: clusters[Math.floor(Math.random() * clusters.length)],
        x: Math.random() * 10 + 50,
        y: Math.random() * 10 + 50,
        size: nodeSize,
        label: (i + 1).toString(),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        // Some domain data
        domain: { partId: `PID-${Math.floor(Math.random() * 10 + 10)}` },
    };
}

const createEdges = () => {
    const el = [];
    for (let i = 1; i < nNodes; i++) el.push(["1", (i + 1).toString()]);
    return el;
};

export const data = {
    nodes,
    edges: createEdges(),
};
