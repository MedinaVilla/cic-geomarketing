// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './Routes/App';

// ReactDOM.render(<App/>, document.getElementById('app'));

import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import App from './Routes/App';

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

(function () {
    if (typeof EventTarget !== "undefined") {
        let func = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, fn, capture) {
            this.func = func;
            if(typeof capture !== "boolean"){
                capture = capture || {};
                capture.passive = false;
            }
            this.func(type, fn, capture);
        };
    };
}());


root.render(
    // <StrictMode>
        <App />
    // </StrictMode>
);

