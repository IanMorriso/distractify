class Obscurify extends Effect {
  name = "Obscurify";
  #options;
  constructor(options) {
    super();
    this.#options = options;
  }

  create() {
    this.run();
  }

  destroy() {
    console.log("Destroying Obscurify");
  }

  run() {
    

    // Add Custom CSS - Function
    const customStyle = css => document.head.appendChild(document.createElement("style")).innerHTML = css

    // Style for the div block
    customStyle(`#snappy-div {
        font-size: 60px;
        padding: 150px 0;
        color: #ff0037 !important;
        background-color: #fffffff2;
        position: fixed;
        top: 0;
        text-align: center;
        width: 100%;
        z-index: 999999;
    }

    .snappy-div {
        font-size: 60px;
        padding: 150px 0;
        color: #008dff !important;
        background-color: #fffffff2; 
        position: fixed;
        bottom: 0;
        text-align: center;
        width: 100%;
        z-index: 999999;
    }
    `);

    function createElement(tag, attr_tag, attr_name, attr_value) {
        const element = document.createElement(tag);
        element.setAttribute(attr_tag, attr_name);
        element.innerHTML = attr_value;
        document.body.appendChild(element);
    }

    createElement("div", "id", "snappy-div", "GO STUDY");
    const floatingDiv = document.getElementById('snappy-div');

    // Variable to store the previous scroll position
    let prevScrollPos = window.scrollY;

    // Event listener for scroll events
    window.onscroll = function () {
      // Get the current scroll position
      const currentScrollPos = window.scrollY;

      // Check if scrolling up or down
      if (prevScrollPos > currentScrollPos) {
        // Scrolling up, move the div to the top
        floatingDiv.style.top = '0';
      } else {
        // Scrolling down, move the div to the bottom
        floatingDiv.style.top = window.innerHeight - floatingDiv.clientHeight + 'px';
      }

      // Update the previous scroll position
      prevScrollPos = currentScrollPos;
      };
  }
}

console.log('initializing Obscurify...');
const obscurify = new Obscurify();
obscurify.createEffectListener();
