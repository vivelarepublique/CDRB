// ==UserScript==
// @name         CDRB
// @namespace    http://tampermonkey.net/
// @version      1.8
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
    console.log('%cCDRB%c1.8', 'padding: 3px; color: #fff; background: #00918a', 'padding: 3px; color: #fff; background: #002167');

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

    entry();

    function entry() {
        const id = setInterval(() => {
            const target = document.querySelector('div#wrapper_wrapper');
            times++;
            if (target) {
                clearInterval(id);
                const observer = new MutationObserver(() => filterAdsAndRemove());

                observer.observe(target, {
                    attributes: false,
                    characterData: false,
                    childList: true,
                    subtree: true,
                });
            } else if (times === maxTimes) {
                clearInterval(id);
            }
        }, delay);
    }

    function filterAdsAndRemove() {
        //AD
        const generalAdList = document.querySelectorAll('span.ec-tuiguang.ecfc-tuiguang._2awtgst');
        const topAdList = document.querySelectorAll('a.c-gap-left');

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
        const linkList = document.querySelectorAll('a');
        const spanList = document.querySelectorAll('span.c-color-gray.c-gap-left-xsmall');
        const searchingValue = document.querySelector('#kw')?.value;

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
                        while (node && !node.className?.includes('t c-line-clamp1')) {
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
        const safeDownload = document.querySelectorAll('span.c-btn.c-btn-primary.OP_LOG_BTN');

        if (safeDownload.length) {
            for (let link of safeDownload) {
                let node = link;
                while (node && node.id !== 'content_left') {
                    if (node) {
                        if (node.className?.includes('c-container')) {
                            console.log('移除了一个所谓的安全下载：', node.getAttribute('mu')?.match(/https?:\/\/.*/)?.[0]);
                            node.remove();
                            break;
                        } else {
                            node = node.parentNode;
                        }
                    }
                }
            }
        }

        //IT training institutions
        const trainingInstitutions = document.querySelectorAll('div.c-link.c-line-clamp1.c-font-medium.c-gap-top-mini');

        if (trainingInstitutions.length) {
            for (let institution of trainingInstitutions) {
                let node = institution;
                while (node && node.id !== 'content_left') {
                    if (node) {
                        if (node.className?.includes('c-container')) {
                            console.log(
                                '移除了一些IT培训机构广告：',
                                Array.from(trainingInstitutions).reduce((acc, cur) => acc + ' ' + cur.innerHTML, '')
                            );
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
