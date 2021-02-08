# ReactPad

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Live Demo

Feel free to try the live demo of this project on my website at: https://kurtchoi.dev/ReactPad.



## Implementation Description

A React-based application that mimics the functionality of a 3x3 beatpad.

An audio file has been loaded to each `DrumPad` component via [HTMLAudioElement API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) and then played appropriately by adding various Event Handlers: `document.addEventListener()` on `keydown`, `keyup`,  and `mouseup`. Simultaneously, these Event Handlers also allowed each `DrumPad`'s state, whether the key is being pressed or not by keeping a local `state` value of `keydown`, further allowing CSS effects to be carried out on activation.

Please check out `/src/App.js` for additional implementation detail. 



## How To Run

Simply run: `npm start` from the root working directory - website will be deployed locally at: https://localhost:3000.

