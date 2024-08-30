export default class Effect {
    name;
    createEffectListener() {
        /**
        console.log(`creating effect listener for`, this.name);
        chrome.runtime.onMessage.addListener((data) => {
            if ('action' in data) {
                if (data.action === 'start' && data.effect === this.name) {
                    console.log('creating effect');
                    this.create();
                    
                } else if (data.action === 'stopEffect' && data.effect === this.name) {
                    console.log('destroying effect');
                    this.destroy();
                }
            }
        });
        */
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'start') {
                console.log(`Received start action for effect: ${message.effect}`);
                // Your logic to handle the start action
                this.create();
                sendResponse({ status: 'Effect started' });
            } else if (message.action === 'stopEffect') {
                console.log(`Received stop action for effect: ${message.effect}`);
                // Your logic to handle the stop action
                sendResponse({ status: 'Effect stopped' });
                this.destroy();
            }
        });
        console.log('effect listener created');
    }

    create() { console.log('i am the parent create')};
    destroy() {};
}
