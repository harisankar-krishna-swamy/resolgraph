import { v4 as uuidv4 } from "uuid";
import { planetsNSatellites } from "./planets-satellites";
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

const planets = [
    {
        label: "Mercury",
        size: 15,
        color: "violet",
        x: 450,
        y: 590,
        delta: 0,
    },
    {
        label: "Venus",
        size: 20,
        color: "purple",
        x: 550,
        y: 600,
        delta: 0,
    },
    {
        label: "Earth",
        size: 20,
        color: "blue",
        x: 650,
        y: 600,
        delta: 50,
    },
    {
        label: "Mars",
        size: 20,
        color: "red",
        x: 280,
        y: 480,
        delta: 80,
    },
    {
        label: "Jupiter",
        size: 40,
        color: "yellow",
        x: 200,
        y: 280,
        delta: 150,
    },
    {
        label: "Saturn",
        size: 30,
        color: "black",
        x: 540,
        y: 150,
        delta: 150,
    },
    {
        label: "Uranus",
        size: 20,
        color: "magenta",
        x: 800,
        y: 300,
        delta: 105,
    },
    {
        label: "Neptune",
        size: 20,
        color: "green",
        x: 950,
        y: 510,
        delta: 120,
    },
    {
        label: "Pluto",
        size: 10,
        color: "blue",
        x: 880,
        y: 50,
        delta: 70,
    },
];

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
    ...planets.map((p) => ({ ...makeNodeAttrs(), ...p })),

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
