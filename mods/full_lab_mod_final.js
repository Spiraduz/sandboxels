// ==UserScript==
// @name         Full Lab Mod Final
// @version      1.0
// @description  Adds a complete lab setup with realistic chemical reactions, heating, and visual effects.
// ==/UserScript==

// Define new elements
const elements = {
    crushed_pills: {
        color: "#ff6347", // Tomato red
        category: "Powders",
        behavior: ["Solid", "Powder"],
        tempHigh: 100,
        reactions: {
            "water": "pseudoephedrine_water"
        }
    },
    water: {
        color: "#00bfff", // Deep sky blue
        category: "Liquids",
        behavior: ["Liquid"],
        tempHigh: 100,
        reactions: {
            "crushed_pills": "pseudoephedrine_water"
        }
    },
    pseudoephedrine_water: {
        color: "#ff4500", // Orange red
        category: "Liquids",
        behavior: ["Liquid"],
        tempHigh: 120,
        reactions: {
            "heat": "pseudoephedrine"
        }
    },
    pseudoephedrine: {
        color: "#8b0000", // Dark red
        category: "Solids",
        behavior: ["Solid"],
        tempHigh: 150,
        reactions: {
            "hydriodic_acid": "methamphetamine_hydroiodide"
        }
    },
    hydriodic_acid: {
        color: "#800080", // Purple
        category: "Liquids",
        behavior: ["Liquid"],
        tempHigh: 120,
        reactions: {
            "pseudoephedrine": "methamphetamine_hydroiodide"
        }
    },
    methamphetamine_hydroiodide: {
        color: "#ff1493", // Deep pink
        category: "Solids",
        behavior: ["Solid"],
        tempHigh: 180,
        reactions: {
            "heat": "methamphetamine"
        }
    },
    methamphetamine: {
        color: "#0000ff", // Blue
        category: "Solids",
        behavior: ["Solid"],
        tempHigh: 200
    }
};

// Register elements
Object.keys(elements).forEach(key => {
    const el = elements[key];
    registerLabElement(key, el);
});

// Define reactions
const reactions = [
    { input: ["crushed_pills", "water"], output: "pseudoephedrine_water" },
    { input: ["pseudoephedrine_water", "heat"], output: "pseudoephedrine" },
    { input: ["pseudoephedrine", "hydriodic_acid"], output: "methamphetamine_hydroiodide" },
    { input: ["methamphetamine_hydroiodide", "heat"], output: "methamphetamine" }
];

// Register reactions
reactions.forEach(reaction => {
    registerReaction(reaction.input, reaction.output);
});

// Define behaviors
const behaviors = [
    { element: "pseudoephedrine_water", behavior: "bubbling" },
    { element: "hydriodic_acid", behavior: "smoking" },
    { element: "methamphetamine_hydroiodide", behavior: "crystallizing" }
];

// Register behaviors
behaviors.forEach(item => {
    registerBehavior(item.element, item.behavior);
});
