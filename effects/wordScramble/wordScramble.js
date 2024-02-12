const noEffectTags = ["script", "style"]
    const body = document.getElementsByTagName("body").item(0).childNodes
    let randomProportion = 0.1

    let start
    let previousTimeStamp = document.timeline.currentTime
    let done = false
    let modifyText = true

    const tNodes = getTextNodes()

    window.requestAnimationFrame(step)

    function step(timeStamp) {
        if (start === undefined) {
            start = timeStamp
        }
        const elapsed = timeStamp - start
        const deltaTime = timeStamp - previousTimeStamp

        if (previousTimeStamp !== timeStamp) {

        }
        const timeFactor = 2
        if (Math.round(elapsed/1000) % timeFactor == 0 && modifyText) {
            randomProportion = randomProportion + 0.1
            tNodes.forEach(node => {
                changeText(node)
            })
            modifyText = false
        } else if (Math.round(elapsed/1000) % timeFactor != 0) {
            modifyText = true
        } else if (Math.round(elapsed/1000) % timeFactor == 0 ) {
            modifyText = false
        }

        if (elapsed < 200000) {
            previousTimeStamp = timeStamp
            if (!done) {
                window.requestAnimationFrame(step)
            }
        }
    }
    function changeText(node) {
        let new_words = []
        
        text = node.nodeValue

        if (text === undefined) {
            return
        }

        textNodes = text.split(" ")

        // shuffle letters of the words
        textNodes.forEach(word => {
            if (Math.random() > randomProportion) {
                new_words.push(word)
                return
            }
            if (word.length < 4) {
                new_words.push(word)
                return
            }
            subWord = word.slice(1, length - 1)
            newWord = word[0] + shuffle(subWord) + word[word.length - 1]
            new_words.push(newWord)
        })
        node.nodeValue = new_words.join(" ")
    }

    

    function shuffle(array) {
        array = array.split("")
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array.join("");
    }

    function getTextNodes() {
        var walker = document.createTreeWalker(
            document.body, 
            NodeFilter.SHOW_TEXT, 
            null, 
            false
        );

        var node;
        var textNodes = [];

        while(node = walker.nextNode()) {
            console.log(`${node.parentNode.tagName}`);
            textNodes.push(node);
        }

        return textNodes
    }