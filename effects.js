// couldn't find a way to have content scripts and the background script make use of both of these.

export const effectsBackground = [
    {
        name: "Obscurify",
        path: "effects/obscurify/obscurify.js",
        active: false,
        params: {
            text: "Vote Abdul Bari for CS Wizard",
            start_size: 10,
            opacity: 0.2,
            growth: 1,
        }
    },
    {
        name: "Word Scramble",
        path: "effects/wordScramble/wordScramble.js",
        active: false,
        params: {
            density: 0.1,
            speed: 1,
            growth: 0.1
        }
    },
    {
        name: "Load Blocker",
        path: "effects/load-blocker/load-blocker.js",
        active: false,
        params: {
            text: "Vote Abdul Bari for CS Wizard",
            start_size: 10,
            opacity: 0.2,
            speed: 1,
        }
    },
    {
        name: "browserScroller",
        path: "effects/browserScroller/browserScroller.js",
        active: false,
        params: {
            text: "Vote Abdul Bari for CS Wizard",
            start_size: 10,
            opacity: 0.2,
            speed: 1,
        }
    },
    {
        name: "Bouncing Ball",
        path: "effects/bouncingBall/bouncingBall.js",
        active: false,
        params: {
            growth: 1,
            opacity: 0.2,
            speed: 1,
            color: "red"
        }
    },
]

const effects = [
    {
        name: "Obscurify",
        path: "effects/obscurify/obscurify.js"
    },
    {
        name: "Word Scramble",
        path: "effects/wordScramble/wordScramble.js"
    },
    {
        name: "Load Blocker",
        path: "effects/load-blocker/load-blocker.js"
    },
    {
        name: "Scroller",
        path: "effects/scroller/scroller.js"
    },
    {
        name: "Bouncing Ball",
        path: "effects/bouncingBall/bouncingBall.js"
    },
]
