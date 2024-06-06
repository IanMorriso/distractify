import { effects } from "./effects.js";

export function createWebsite(name) {
    return {
        name: name,
        effects: effects
    };
}
/**
const myWebsite = createWebsite("My Website");
console.log(myWebsite.name);
console.log(myWebsite.effects);
*/ 