const nodeSize = 18;
const clusters = ["Solar", "Andromeda"];
const nodes = [];
for (let i = 0; i < 5; i++) {
    nodes[i] = {
        key: (i + 1).toString(),
        cluster: clusters[Math.floor(Math.random() * clusters.length)],
        x: Math.random() * 10 + 50,
        y: Math.random() * 10 + 50,
        size: nodeSize,
        label: (i + 1).toString(),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
}

const edges = [
    ["1", "2"],
    ["2", "3"],
    ["4", "2"],
    ["5", "2"],
    ["1", "5"],
];

export const data = {
    nodes,
    edges,
};
