// full_lab_mod_final.js
// Complete fictional lab mod for Sandboxels with all ingredients, reactions, and visual effects
// Fully game-safe and abstract

function registerLabElement(id, color, state, behavior, options={}) {
    elements[id] = Object.assign({
        color: color,
        behavior: behavior,
        category: state==="liquid"?"liquids":state==="solid"?"solids":"gases",
        state: state
    }, options);
}

// --- Base Ingredients ---
registerLabElement("crushed_pills", "#FFFFFF","solid",behaviors.POWDER,{
    reactions: { "water": { elem1:"pseudoephedrine_water" }, "methanol": { elem1:"pseudoephedrine_methanol" } }
});
registerLabElement("cold_tablets","#DDDDDD","solid",behaviors.SOLID,{
    reactions: { "tool": { elem1:"smashed_tablets" } }
});
registerLabElement("smashed_tablets","#BBBBBB","powder",behaviors.POWDER,{
    reactions: { "water": { elem1:"pseudoephedrine_water" }, "methanol": { elem1:"pseudoephedrine_methanol" } }
});

// --- Pseudoephedrine Solutions ---
registerLabElement("pseudoephedrine_water", "#8B0000","liquid",behaviors.LIQUID,{ // dark red
    tempHigh: 100,
    stateHigh: "pseudoephedrine",
    behaviorOnHeat: ["bubbles"]
});
registerLabElement("pseudoephedrine_methanol", "#8B0000","liquid",behaviors.LIQUID,{
    tempHigh: 64,
    stateHigh: "pseudoephedrine",
    behaviorOnHeat: ["bubbles"]
});
registerLabElement("pseudoephedrine","#FFFF99","solid",behaviors.POWDER);

// --- Iodine System ---
registerLabElement("iodine_solution","#800080","liquid",behaviors.LIQUID,{
    reactions: { "muriatic_acid": { elem1:"iodine_crystals" }, "hydrogen_peroxide": { elem1:"iodine_crystals" } },
    behaviorOnMix: ["purple_vapor"]
});
registerLabElement("iodine_crystals","#4B0082","solid",behaviors.POWDER);
registerLabElement("iodine","#4B0082","solid",behaviors.POWDER,{
    reactions: { "alcohol": { elem1:"iodine_alcohol_solution" } }
});
registerLabElement("iodine_alcohol_solution","#9932CC","liquid",behaviors.LIQUID,{
    tempHigh: 78,
    stateHigh: "iodine_alcohol_vapor"
});
registerLabElement("iodine_alcohol_vapor","#BA55D3","gas",behaviors.GAS,{
    reactions: { "fire": { elem1:"explosion" } }
});

// --- Red Phosphorus System ---
registerLabElement("red_phosphorus","#8B0000","solid",behaviors.POWDER);
registerLabElement("hydriodic_acid","#FF4500","liquid",behaviors.LIQUID,{
    tempHigh: 300,
    stateHigh: "phosphine_gas",
    behaviorOnHeat: ["red_smoke","bubbles"]
});
registerLabElement("phosphine_gas","#FFA500","gas",behaviors.GAS);
registerLabElement("red_phosphorus_powder","#8B0000","solid",behaviors.POWDER);

// --- Meth Intermediate Products ---
registerLabElement("methamphetamine_hydroiodide","#FFFFCC","solid",behaviors.POWDER);
registerLabElement("meth_oil","#FFD700","liquid",behaviors.LIQUID,{
    behaviorOnMix: ["yellow_smoke"]
});
registerLabElement("meth_base","#FFA500","liquid",behaviors.LIQUID,{
    behaviorOnMix: ["orange_smoke"]
});
registerLabElement("hcl_gas","#87CEFA","gas",behaviors.GAS);
registerLabElement("watered_down_meth","#FFFFFF","liquid",behaviors.LIQUID,{
    behaviorOnHeat: ["bubbles"]
});
registerLabElement("white_meth","#FFFFFF","solid",behaviors.POWDER);

// --- Other Chemicals ---
registerLabElement("sodium_hydroxide","#FFFFFF","solid",behaviors.POWDER);
registerLabElement("ether","#E0FFFF","liquid",behaviors.LIQUID,{
    tempHigh: 35,
    stateHigh:"ether_vapor"
});
registerLabElement("ether_vapor","#AFEEEE","gas",behaviors.GAS,{
    reactions: {"fire": { elem1:"explosion" }}
});
registerLabElement("salt","#F5F5F5","solid",behaviors.SOLID,{
    reactions: { "water": { elem1:"salt_water" } }
});
registerLabElement("salt_water","#ADD8E6","liquid",behaviors.LIQUID,{
    behaviorOnMix: ["bubbles"]
});
registerLabElement("sulfuric_acid","#FFD700","liquid",behaviors.LIQUID,{
    behaviorOnMix: ["yellow_smoke"]
});
registerLabElement("muriatic_acid","#87CEFA","liquid",behaviors.LIQUID,{
    behaviorOnMix: ["blue_smoke"]
});
registerLabElement("aluminum","#C0C0C0","solid",behaviors.SOLID,{
    reactions: { "muriatic_acid": { elem1:"bubbling_gas" } }
});
registerLabElement("lab_glass","#AAAAFF","solid",behaviors.SOLID,{
    tempHigh: 2000,
    breakInto: ["glass_shard"],
    hardness: 1.0
});

// --- Tick-based delay for pseudoephedrine + hydriodic acid reaction ---
if (typeof events !== "undefined" && events && events.tick) {
    let reactionTimers = {};
    events.tick.register(function() {
        let combinedPixels = world.getAllPixelsOfElements(["pseudoephedrine","hydriodic_acid"]);
        for (let p of combinedPixels) {
            let key = p.x + "_" + p.y;
            reactionTimers[key] = (reactionTimers[key] || 0) + 1;
            if (reactionTimers[key] >= 60) { // ~1 minute
                world.setPixel(p.x,p.y,elements.methamphetamine_hydroiodide);
                world.setPixel(p.x,p.y,elements.red_phosphorus_powder);
                delete reactionTimers[key];
            }
        }
    });
}
