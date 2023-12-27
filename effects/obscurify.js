// Add Custom CSS - Function
const customStyle = css => document.head.appendChild(document.createElement("style")).innerHTML = css

// Style for the div block
customStyle(`#js-custom-element {
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

.js-custom-element {
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
    alert("butts");
}

createElement("div", "id", "js-custom-element", "DONT LOOK AT THIS");