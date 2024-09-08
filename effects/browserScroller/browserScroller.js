class BrowserScroller extends Effect {
    name = 'Browser Scroller';
    #options;
    constructor(options) {
        super()
        this.#options = options;
    }

    create() {
        this.run();
    }

    destroy() {
        console.log("destroying browser scroller");
    }

    run() {
        console.log("running browser scroller");
        // How should this function work?
        /*
            Randomization: 
                Scroll coordinates should be randomized
                Destination coordinates should be outside of current window coordinates if possible

            Timing:
                Scolling should occur at random times
                Based on users time spent on website, scrolling should occur more frequently
                Based on users time spent on website, scrolling should incur randomized behaviour
        */

        // Gets the URL
        const site = window.location.hostname;

        setTimeout(scroller, 4000);

        function scroller() {
            // Gets webpage height and width
            const pageWidth = document.documentElement.scrollWidth;
            const pageHeight = document.documentElement.scrollHeight;

        /*    
            let x = window.screenX;
            let innerX = window.innerWidth;
            let y = window.screenY;
            let innerY = window.innerHeight;
        */

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
            //alert(scrollX, scrollY);
        }

        function rng(num) {
            return Math.floor(Math.random() * num);

        }



    }
}

console.log('initializing Browser Scroller...');
const browserScroller = new BrowserScroller();
browserScroller.createEffectListener();