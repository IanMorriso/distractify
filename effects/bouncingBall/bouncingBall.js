const canvas = document.getElementById("canvas")
var balls = []

let start
let previousTimeStamp = document.timeline.currentTime
let done = false
let newBall = true

function Ball() {
    this.element = document.createElement("div")
    this.element.className = "ball"
    this.element.style.height = "100px"
    this.element.style.width = "100px"
    this.element.style.opacity = "50%"
    // set up the initial position for the ball
    this.x = Math.max(1, Math.min(Math.random() * canvas.clientWidth, canvas.clientWidth - parseInt(this.element.style.width, 10) - 1))
    this.y = Math.max(1, Math.min(Math.random() * canvas.clientHeight, canvas.clientHeight - parseInt(this.element.style.height, 10) - 1))
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    
    // set up the start vector for the ball
    this.x_v = Math.random() * 0.2 * Math.pow(-1, Math.round(Math.random()))
    this.y_v = Math.random() * 0.2 * Math.pow(-1, Math.round(Math.random()))
}

function step(timeStamp) {
    if (start === undefined) {
        start = timeStamp
    }
    const elapsed = timeStamp - start
    const deltaTime = timeStamp - previousTimeStamp

    if (previousTimeStamp !== timeStamp) {
        const topEdge = canvas.clientTop
        const leftEdge = canvas.clientLeft
        const rightEdge = canvas.clientWidth
        const bottomEdge = canvas.clientHeight

        balls.forEach(ball => {
            ball.x = ball.x + deltaTime * ball.x_v
            ball.y = ball.y + deltaTime * ball.y_v
            ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px)`
            ballBound = ball.element.getBoundingClientRect()
            if (ballBound.right >= rightEdge || ballBound.left <= leftEdge) {
                ball.x_v = -ball.x_v
            } else if (ballBound.bottom >= bottomEdge || ballBound.top <= topEdge) {
                ball.y_v = -ball.y_v
            }
        }) 
    }
    const timeFactor = 2
    if (Math.round(elapsed/1000) % timeFactor == 0 && newBall && balls.length < 100) {
        ball = new Ball()
        canvas.appendChild(ball.element)
        balls.push(ball)
        newBall = false
    } else if (Math.round(elapsed/1000) % timeFactor != 0) {
        newBall = true
    } else if (Math.round(elapsed/1000) % timeFactor == 0 ) {
        newBall = false
    }

    if (elapsed < 200000) {
        previousTimeStamp = timeStamp
        if (!done) {
            window.requestAnimationFrame(step)
        }
    }
}

window.requestAnimationFrame(step) // give our callback func to requsetor