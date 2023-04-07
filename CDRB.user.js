// ==UserScript==
// @name         CDRB
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Code Doesn't Require BAIDU.
// @author       vivelarepublique
// @match        http://www.baidu.com/*
// @match        https://www.baidu.com/*
// @downloadURL  https://github.com/vivelarepublique/CDRB/raw/master/CDRB.user.js
// @updateURL    https://github.com/vivelarepublique/CDRB/raw/master/CDRB.user.js
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    console.log('%cCDRB%c1.7', 'padding: 3px; color: #fff; background: #00918a', 'padding: 3px; color: #fff; background: #002167');

    const otherResult = [
        'CSDN',
        //这里可以添加其余想屏蔽的关键词
        //添加格式为 ==》 " '想屏蔽的关键词', "
        //！！！注意：不含""双引号，但是包含''单引号，而且,英文逗号不能省略！！！
        //↓请将光标放在此段末尾（最后一个向下箭头的后面），然后按下回车，在此行下面一行进行添加↓
        '脚本之家',
        '华军软件园',
    ];

    const delay = 500;
    const maxTimes = 21;
    let times = 0;

    begin();

    function begin() {
        const id = setInterval(() => {
            const target = document.querySelector('#wrapper');
            times++;
            if (target) {
                clearInterval(id);
                const observer = new MutationObserver(mutationsList => {
                    for (let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            startModify();
                            break;
                        }
                    }
                });

                observer.observe(target, {
                    attributes: false,
                    childList: true,
                    subtree: true,
                });
            } else if (times === maxTimes) {
                clearInterval(id);
            }
        }, delay);
    }

    function startModify() {
        //AD
        let generalAdList = document.getElementsByClassName('ec-tuiguang ecfc-tuiguang _2awtgst');
        let topAdList = document.getElementsByClassName('c-gap-left');

        if (generalAdList.length) {
            for (let ad of generalAdList) {
                let node = ad;
                while (node && node.id !== 'content_left') {
                    if (node) {
                        if (node.className?.includes('c-container')) {
                            console.log('移除了一个常规广告：', ad.parentNode?.parentNode?.innerText);
                            node.remove();
                            break;
                        } else {
                            node = node.parentNode;
                        }
                    }
                }
            }
        }

        if (topAdList.length) {
            for (let ad of topAdList) {
                let node = ad;
                while (node && node.id !== 'content_left') {
                    if (node) {
                        if (node.className?.includes('c-container')) {
                            console.log('移除了一个顶部广告：', ad.parentNode?.parentNode?.innerText);
                            node.remove();
                            break;
                        } else {
                            node = node.parentNode;
                        }
                    }
                }
            }
        }

        // keywords
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

        //downloadLink
        let safeDownload = document.getElementsByClassName('c-btn c-btn-primary OP_LOG_BTN pc-js-btn_n7kWx pc-tabs-content-long-btn_3Deg2');

        if (safeDownload.length) {
            for (let link of safeDownload) {
                let node = link;
                while (node && node.id !== 'content_left') {
                    if (node) {
                        if (node.className?.includes('c-container')) {
                            console.log('移除了一个所谓的安全下载：', node.getAttribute('mu')?.match(/https?:\/\/\w+\.\w+\.\w+\/.+\.html?/g)[0]);
                            node.remove();
                            break;
                        } else {
                            node = node.parentNode;
                        }
                    }
                }
            }
        }
    }
})();
