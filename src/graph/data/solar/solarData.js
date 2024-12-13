import { v4 as uuidv4 } from "uuid";
import { planetsNSatellites } from "./planets-satellites";
import { planets } from "./planets";
const nodeSize = 18;
const makeNodeAttrs = (x = 80, y = 80, delta = 110) => ({
    key: uuidv4(),
    x:
        Math.random() * 10 +
        Math.random() * (x + delta - (x - delta)) +
        (x - delta),
    y:
        Math.random() * 10 +
        Math.random() * (y + delta - (y - delta)) +
        (y - delta),
    size: nodeSize,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
});

const nodes = [
    {
        ...makeNodeAttrs(),
        label: "Sun",
        size: 50,
        color: "orange",
        cluster: "Solar system",
        x: 500,
        y: 500,
    },
    ...planets.map((p) => ({ ...makeNodeAttrs(), ...p, cluster: "Sun" })),

    ...planetsNSatellites.map(([planet, satellite]) => ({
        ...makeNodeAttrs(
            planets.find((p) => p.label === planet).x,
            planets.find((p) => p.label === planet).y,
            planets.find((p) => p.label === planet).delta
        ),
        label: satellite,
        cluster: planet,
        size: 10,
        color: "darkgrey",
    })),
];

console.log(nodes);

const edges = [
    ...planets.map((p) => ["Sun", p.label]),
    ...planetsNSatellites.map(([planet, satellite]) => [planet, satellite]),
];
export const data = {
    nodes,
    edges,
};
