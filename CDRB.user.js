// ==UserScript==
// @name         CDRB
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Code Doesn't Require BAIDU.
// @author       vivelarepublique
// @match        https://www.baidu.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...

    const targetNode = document.getElementById('wrapper');

    const config = {
        attributes: false,
        childList: true,
        subtree: true,
    };

    const observer = new MutationObserver((mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                startModify();
                break;
            }
        }
    });

    observer.observe(targetNode, config);

    function startModify() {
        let ADlist = document.getElementsByClassName('ec-tuiguang ecfc-tuiguang _2awtgst');
        let ADlist2 = document.getElementsByClassName('c-gap-left');
        console.log(ADlist);
        console.log(ADlist2);
        for (let ad of ADlist) {
            let node = ad;
            while (node.id !== 'content_left') {
                if (node) {
                    if (node.className.includes('c-container')) {
                        node.remove();
                        break;
                    } else {
                        node = node.parentNode;
                    }
                }
            }
        }
        for (let ad of ADlist2) {
            let node = ad;
            while (node.id !== 'content_left') {
                if (node) {
                    if (node.className.includes('c-container')) {
                        node.remove();
                        break;
                    } else {
                        node = node.parentNode;
                    }
                }
            }
        }
    }
})();
