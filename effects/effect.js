export default class Effect {
    name;
    createEffectListener() {
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
        console.log('effect listener created');
    }

    create() { console.log('i am the parent create')};
    destroy() {};
}
