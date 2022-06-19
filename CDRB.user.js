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

    console.log('hi');
    startModify();

    function startModify() {
        let ADlist = document.getElementsByClassName('ec-tuiguang ecfc-tuiguang _2awtgst');
        let ADlist2 = document.getElementsByClassName('m c-gap-left');
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
