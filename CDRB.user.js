// ==UserScript==
// @name         CDRB
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Code Doesn't Require BAIDU.
// @author       vivelarepublique
// @match        https://www.baidu.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const otherResult = [
        'CSDN',
        //这里可以添加其余想屏蔽的关键词
        //添加格式为 ==》 " '想屏蔽的关键词', "
        //！！！注意：不含""双引号，但是包含''单引号，而且,英文逗号不能省略！！！
        //↓请将光标放在此段末尾（最后一个向下箭头的后面），然后按下回车，在此行下面一行进行添加↓
        '脚本之家',
    ];

    const targetNode = document.getElementById('wrapper');

    const config = {
        attributes: false,
        childList: true,
        subtree: true,
    };

    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
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

        if (ADlist.length) {
            for (let ad of ADlist) {
                let node = ad;
                while (node && node.id !== 'content_left') {
                    if (node) {
                        if (node.className?.includes('c-container')) {
                            console.log('移除了一个广告：', ad.parentNode?.parentNode?.innerText);
                            node.remove();
                            break;
                        } else {
                            node = node.parentNode;
                        }
                    }
                }
            }
        }

        if (ADlist2.length) {
            for (let ad of ADlist2) {
                let node = ad;
                while (node && node.id !== 'content_left') {
                    if (node) {
                        if (node.className?.includes('c-container')) {
                            console.log('移除了一个广告：', ad.parentNode?.parentNode?.innerText);
                            node.remove();
                            break;
                        } else {
                            node = node.parentNode;
                        }
                    }
                }
            }
        }

        let linkList = document.getElementsByTagName('a');
        let spanList = document.getElementsByClassName('c-color-gray item-site-name_3aKAy');
        let searchingValue = document.getElementById('kw')?.value;

        if (linkList.length) {
            for (let link of linkList) {
                let node = link;
                for (let other of otherResult) {
                    if (link.innerHTML.includes(other) && !searchingValue?.includes(other)) {
                        while (node && node.id !== 'content_left') {
                            if (node) {
                                if (node.className?.includes('c-container')) {
                                    console.log('移除了一个关键词：', other);
                                    node.remove();
                                    break;
                                } else {
                                    node = node.parentNode;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }

        if (spanList.length) {
            for (let span of spanList) {
                let node = span;
                for (let other of otherResult) {
                    if (span.innerHTML.includes(other) && !searchingValue?.includes(other)) {
                        while (node && node.id !== 't c-line-clamp1') {
                            if (node) {
                                if (node.className?.includes('c-gap-bottom-small')) {
                                    console.log('移除了一个关键词：', other);
                                    node.remove();
                                    break;
                                } else {
                                    node = node.parentNode;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
})();
