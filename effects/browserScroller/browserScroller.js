import Effect from '../effect.js';

export class BrowserScrollerEffect extends Effect {
    name = 'browserScroller';
    #effect;
    #options;
    constructor(options) {
        super()
        this.#options = options;
    }

    create() {
        this.run();
    }

    destroy() {

    }

    run() {
        const site = window.location.hostname;

        setInterval(scroller, 8000);

        function scroller() {
            // Gets webpage height and width
            const pageWidth = document.documentElement.scrollWidth;
            const pageHeight = document.documentElement.scrollHeight;

            var scrollX = rng(pageWidth);
            var scrollY = rng(pageHeight);

            // If user is at top or bottom of webpage
            if ((window.innerHeight == pageHeight) || (window.innerHeight == 0)) {
                scrollY *= -1;
            }
            // If user is at left or right bound of webpage
            if ((window.innerWidth == pageWidth) || (window.innerWidth == 0)) {
                scrollX *= -1;
            }

            window.scrollBy({
                top: scrollY,
                left: scrollX,
                behaviour: "smooth",
            });
            alert(scrollX, scrollY);
        }

        function rng(num) {
            return Math.floor(Math.random() * num);

        }
    }


}

console.log('initializing Browser Scroller...');
const browserScroller = new BrowserScrollerEffect();
browserScroller.createEffectListener();