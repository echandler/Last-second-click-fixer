// ==UserScript==
// @name         Last second click fixer. v0.1
// @namespace    Last second click fixer.
// @version      0.1
// @description  Blocks click after network request is made. 
// @updateURL    https://github.com/echandler/Last-second-click-fixer/raw/main/LastSecondClickFixer.user.js
// @downloadURL  https://github.com/echandler/Last-second-click-fixer/raw/main/LastSecondClickFixer.user.js
// @author       echandler 
// @match        https://www.geoguessr.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geoguessr.com
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {

    let blockIt = false;

    let oldFetch = window.fetch;
    window.fetch = async function (...args) {
        // Has to modify fetch at document-start or else it won't work.

        if (blockIt === true) return; 

        if (!/geoguessr.com.api.v3.games/.test(args[0]) || args[1]?.method === 'GET') {
            return oldFetch.apply(null, args);
        }

        let body = JSON.parse(args[1].body);

        if (!body.timedOut === undefined) {
            return oldFetch.apply(null, args);
        }

        blockIt = true;

        let intercepted = await oldFetch.apply(null, args);

        blockIt = false;

        return intercepted;
    }

    let p = setInterval(() => {
        if (!window.google) return

        clearInterval(p);

        modifyGoogOverlay();

    }, 100);

    function modifyGoogOverlay() {
        if (google.maps.OverlayView.prototype.__originalSetMap_lastClickFixer) return;

        let originalSetMap = google.maps.OverlayView.prototype.setMap;

        google.maps.OverlayView.prototype.__originalSetMap_lastClickFixer = originalSetMap;

        google.maps.OverlayView.prototype.setMap = overLaySetMap;
    };

    function overLaySetMap(...args) {
        if (blockIt) {
            console.log('blocked');
         //   let div = document.createElement('div');
         //   div.style.cssText = `position: absolute; bottom: 10px; left: 10px; padding: 1em; z-index: 999999; background-color: white;`;
         //   div.innerText = "Click was blocked!";
         //   document.body.appendChild(div);
         //   setTimeout(()=> div.remove(), 5000);
            return;
        }

        this.__originalSetMap_lastClickFixer.apply(this, args);
    }

})();
