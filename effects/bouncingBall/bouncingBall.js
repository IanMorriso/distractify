function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max)
}

/**
 * Allows us to inject styles into the page as necessary for effects
 */
class StyleManager {
    /**
     * 
     * @param {string} css - the css values to inject
     */
    static injectStyle(css) {
        const style = document.createElement('style')
        document.head.append(style)
        style.innerHTML = css
    }
}

/**
 * A ball to add to the canvas
 */
class Ball {
    /**
     * 
     * @param {HTMLObject} parent - the parent object that the ball should be inserted into
     */
    constructor(parent) {
        this.parent = parent
        this.element = document.createElement('div')
        this.width = 100
        this.height = 100
        this.init()
    }

    /**
     * Initializes a ball with a random location and random vector for direction.
     */
    init() {
        this.element.className = 'ball'
        this.x = clamp(Math.random() * this.parent.clientWidth, this.width, this.parent.clientWidth - this.width)
        this.y = clamp(Math.random() * this.parent.clientHeight, this.height, this.parent.clientHeight - this.height)
        this.x_v = Math.random() * 0.2 - 0.1
        this.y_v = Math.random() * 0.2 - 0.1
        this.updatePosition()
        this.parent.appendChild(this.element)
    }

    /**
     * Sets the position for the ball. 
     */
    updatePosition() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    /**
     * Updates x and y coordinates of object based on deltaTime
     * @param {number} deltaTime - the amount of time that has passed
     * from the last frame till now.
     */
    move(deltaTime) {
        this.x += deltaTime * this.x_v
        this.y += deltaTime * this.y_v
        // Collision detection within the parent bounds
        if (this.x < 0 || this.x > this.parent.clientWidth - this.height) this.x_v *= -1
        if (this.y < 0 || this.y > this.parent.clientHeight - this.width) this.y_v *= -1
        this.updatePosition();
    }
}

/**
 * Manager initiates and controls the overall animation on the page. 
 */
class AnimationManager {
    constructor() {
        this.balls = []
        this.previousTimeStamp = 0
        this.newBall = true
        this.initCanvas()
        window.requestAnimationFrame(this.step.bind(this))
    }

    /**
     * Create canvas and set up styles.
     */
    initCanvas() {
        this.canvas = document.createElement('div')
        this.canvas.id = 'canvas'
        document.body.appendChild(this.canvas)
        StyleManager.injectStyle(`
        #canvas {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 100%;
            width: 100%;
            z-index: 9999;
            pointer-events: none;
        }
        
        .ball {
            position: absolute;
            height: ${this.balls[0] === undefined ? 100 : this.balls[0].height}px;
            width: ${this.balls[0] === undefined ? 100 : this.balls[0].width}px;
            background-color: red;
            border-radius: 50%;
            opacity: 0; /* Start fully transparent */
            animation: fadeIn 2s forwards; /* Use forwards to keep the element visible after the animation ends */
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 0.5; }
        }
        `)
    }

    /**
     * The callback function for requestAnimationFrame
     * Controls rate of balls added to screen
     * @param {number} timeStamp - the current time
     */
    step(timeStamp) {
        const deltaTime = timeStamp - this.previousTimeStamp
        if (this.newBall && this.balls.length < 100) {
            this.balls.push(new Ball(this.canvas))
            this.newBall = false
        }

        this.balls.forEach(ball => ball.move(deltaTime))

        if (timeStamp % 2000 < 50) this.newBall = true

        this.previousTimeStamp = timeStamp
        window.requestAnimationFrame(this.step.bind(this))
    }
}

new AnimationManager()