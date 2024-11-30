"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRandom = void 0;
var react_1 = require("react");
var seedrandom_1 = require("seedrandom");
var faker_1 = require("@faker-js/faker");
var graphology_1 = require("graphology");
var erdos_renyi_1 = require("graphology-generators/random/erdos-renyi");
/**
 * The goal of this file is to seed random generators if the query params 'seed' is present.
 * As an example you can go to http://localhost:8000/components.html?seed=foo and refresh multiple times the page
 * you should have the result. This feature is mainly used for the E2E test.
 *
 * For now it :
 * - replace the global `Math.random` with a seed one
 * - seed the faker library
 */
var useRandom = function () {
    var _a = (0, react_1.useState)(faker_1.faker), faker = _a[0], setFaker = _a[1];
    (0, react_1.useEffect)(function () {
        // Globally seed the Math.random
        var params = new URLSearchParams(document.location.search);
        var seed = params.get("seed"); // is the string "Jonathan"
        if (seed) {
            (0, seedrandom_1.default)(seed, { global: true });
            // seed faker with the random function
            var f = new faker_1.Faker({ locale: faker_1.en });
            f.seed(Math.random());
            setFaker(f);
        }
    }, [document.location]);
    var randomColor = (0, react_1.useCallback)(function () {
        var digits = "0123456789abcdef";
        var code = "#";
        for (var i = 0; i < 6; i++) {
            code += digits.charAt(Math.floor(Math.random() * 16));
        }
        return code;
    }, [faker]);
    var randomGraph = (0, react_1.useCallback)(function () {
        // Create the graph
        var graph = (0, erdos_renyi_1.default)(graphology_1.UndirectedGraph, { order: 100, probability: 0.1 });
        graph.nodes().forEach(function (node) {
            graph.mergeNodeAttributes(node, {
                label: faker.person.fullName(),
                size: faker.number.int({ min: 4, max: 20 }),
                color: randomColor(),
                x: Math.random(),
                y: Math.random(),
                // for node-border
                borderColor: randomColor(),
                borderSize: faker.number.float({ min: 0, max: 1, multipleOf: 0.1 }),
                // for node-image
                pictoColor: randomColor(),
                image: faker.image.urlLoremFlickr(),
            });
        });
        return graph;
    }, [faker]);
    return { faker: faker, randomColor: randomColor, randomGraph: randomGraph };
};
exports.useRandom = useRandom;
