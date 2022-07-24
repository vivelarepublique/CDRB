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
    if (!document.getElementById('su')) {
        let searchButton = document.getElementById('su');
        searchButton.addEventListener('click', () => {
            startModify();
        });
    }

    function startModify() {
        console.log('hi');
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
                        console.log('!~1');
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
                        console.log('!~2');
                        break;
                    } else {
                        node = node.parentNode;
                    }
                }
            }
        }
    }
})();
