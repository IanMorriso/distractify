class TextShuffer extends Effect {
    name = 'Word Scramble';
    #options;
    constructor(options) {
        super()
        this.noEffectTags = ["SCRIPT", "STYLE"]
        this.randomProportion = 0.1
        this.randomProportionDelta = 0.05
        this.textNodes = this.getTextNodes()
        this.start = undefined
        this.previousTimeStamp = 0
        this.modifyText = true
        this.#options = options;
    }

    create() {
        this.run();
    }

    destroy() {
        this.randomProportion = 0;
        console.log('not implemented yet. not able to cleanup entirely.');
    }

    run() {
        window.requestAnimationFrame(this.step.bind(this))
    }

    step(timeStamp) {
        if (this.start === undefined) {
            this.start = timeStamp
        }
        const elapsed = timeStamp - this.start

        if (elapsed / 1000 % 2 === 0 && this.modifyText) {
            this.randomProportion += this.randomProportionDelta
            this.textNodes.forEach(node => this.changeText(node))
            this.modifyText = false
        } else if (elapsed / 1000 % 2 !== 0 ){
            this.modifyText = true
        }

        if (elapsed < 200000) {
            this.previousTimeStamp = timeStamp
            window.requestAnimationFrame(this.step.bind(this))
        }
    }

    changeText(node) {
        if (!node.nodeValue) return

        const words = node.nodeValue.split(" ")
        const newWords = words.map(word => {
            if(Math.random() > this.randomProportion || word.length < 4) return word
            
            const middle = word.slice(1, -1)
            return word[0] + this.shuffle(middle) + word[word.length - 1]
        })

        node.nodeValue = newWords.join(' ')
    }

    shuffle(string) {
        const array = string.split('')
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array.join('')
    }

    getTextNodes() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            { acceptNode: node => this.isShuffable(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT},
            false
        )

        const textNodes = []
        let node
        while (node = walker.nextNode()) {
            textNodes.push(node)
        }

        return textNodes
    }

    isShuffable(node) {
        return !this.noEffectTags.includes(node.parentNode.tagName)
    }
}

console.log('initializing Text Shuffler...');
const textShuffler = new TextShuffer();
textShuffler.createEffectListener();