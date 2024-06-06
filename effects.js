// export const effects = 
// { "0" : "Obscure",
// "1" : "Word Scramble",
// "2" : "Load Blocker",
// "3" : "Scroller",
// "4" : "Bouncing Ball",
// };

export const effects = {
    '0': {
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
    '1': {
        name: "Word Scramble",
        path: "effects/wordScramble/wordScramble.js",
        active: false,
        params: {
            density: 0.1,
            speed: 1,
            growth: 0.1
        }
    },
    '2': {
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
    '3': {
        name: "Scroller",
        path: "effects/scroller/scroller.js",
        active: false,
        params: {
            text: "Vote Abdul Bari for CS Wizard",
            start_size: 10,
            opacity: 0.2,
            speed: 1,
        }
    },
    '4': {
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
}