const nodes = [
    {
        key: "1",
        x: Math.random() * 10 + 50,
        y: Math.random() * 10 + 50,
        size: 20,
        label: "1",
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
    {
        key: "2",
        x: Math.random() * 10 + 50,
        y: Math.random() * 10 + 50,
        size: 20,
        label: "2",
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
];

const edges = [["1", "2"]];

export const data = {
    nodes,
    edges,
};
