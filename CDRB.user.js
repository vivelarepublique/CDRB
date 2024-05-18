// ==UserScript==
// @name         CDRB
// @namespace    http://tampermonkey.net/
// @version      2.5.19
// @description  Coder Doesn't Require BAIDU.
// @author       vivelarepublique
// @run-at       document-body
// @match        http://www.baidu.com/*
// @match        https://www.baidu.com/*
// @grant        window.onurlchange
// @downloadURL  https://github.com/vivelarepublique/CDRB/raw/master/CDRB.user.js
// @updateURL    https://github.com/vivelarepublique/CDRB/raw/master/CDRB.user.js
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/dom.ts
function debounce(func, wait) {
    let timeout = null;
    return (...args) => {
        if (timeout !== null)
            window.clearTimeout(timeout);
        timeout = window.setTimeout(() => func(...args), wait);
    };
}
function throttle(func, limit) {
    let timer = null;
    return (...args) => {
        if (!timer) {
            timer = window.setTimeout(() => {
                func(...args);
                timer = null;
            }, limit);
        }
    };
}
const getElement = (selector) => {
    return document.querySelector(selector);
};
const getMultiElement = (selector) => {
    return document.querySelectorAll(selector);
};
const listeningForChangesInTarget = (target, action, options, valueOfConcern, immediate) => {
    if (immediate) {
        if (typeof immediate === 'object') {
            const { delay, way } = immediate;
            if (way === 'debounce') {
                debounce(action, delay);
            }
            else if (way === 'throttle') {
                throttle(action, delay);
            }
        }
        else {
            action();
        }
    }
    const targetElement = target instanceof Element ? target : getElement(target);
    if (targetElement) {
        const targetObserver = new MutationObserver(mutations => {
            const mutation = mutations.find(el => el.target === targetElement);
            if (mutation) {
                const element = mutation.target;
                if (valueOfConcern && valueOfConcern in element) {
                    action(element[valueOfConcern]);
                }
                else {
                    action();
                }
            }
        });
        targetObserver.observe(targetElement, { childList: true, characterData: true, subtree: true, attributes: true, ...options });
    }
};
const waitForTargetFinishLoading = (target) => {
    return new Promise(resolve => {
        const bodyObserver = new MutationObserver(_ => {
            const targetElement = getElement(target);
            if (targetElement) {
                bodyObserver.disconnect();
                resolve(targetElement);
            }
        });
        bodyObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
};


;// CONCATENATED MODULE: ./src/utils/parent.ts
const deleteElementIfParentHasClass = (element, terminator) => {
    if (!element.parentElement) {
        return;
    }
    if (terminator.startsWith('#')) {
        if (element.parentElement.id === terminator.substring(1)) {
            element.remove();
        }
        else {
            deleteElementIfParentHasClass(element.parentElement, terminator);
        }
    }
    else {
        if (element.parentElement.classList.contains(terminator)) {
            element.remove();
        }
        else {
            deleteElementIfParentHasClass(element.parentElement, terminator);
        }
    }
};


;// CONCATENATED MODULE: ./src/multiform/ad.ts


const removeAd = () => {
    const ADList1 = getMultiElement('span.ec-tuiguang.ecfc-tuiguang');
    const ADList2 = getMultiElement('a.m.c-gap-left');
    const companyName = getMultiElement('.ec-showurl-line');
    const companyWebsite = getMultiElement('a.c-showurl.c-color-gray');
    ADList1.forEach(el => deleteElementIfParentHasClass(el, '#content_left'));
    ADList2.forEach(el => deleteElementIfParentHasClass(el, '#content_left'));
    const companyNameText = Array.from(companyName).map(el => el.textContent);
    const companyWebsiteLink = Array.from(companyWebsite).map(el => el.textContent);
    if (ADList1.length)
        console.log(`移除了${ADList1.length}个公司的广告, 为\n%c${companyNameText.join('\n')}`, 'padding: 3px; color: #033; background: #dc3545;');
    if (ADList2.length)
        console.log(`移除了${ADList2.length}个公司的广告, 为\n%c${companyWebsiteLink.join('\n')}`, 'padding: 3px; color: #033; background: #dc3545;');
};


;// CONCATENATED MODULE: ./src/multiform/downloadLink.ts


const removeDownloadLink = () => {
    const safeDownload = getMultiElement('span.c-btn.c-btn-primary.OP_LOG_BTN');
    const downloadLinks = getMultiElement('div.c-row.source_1Vdff.OP_LOG_LINK div span.c-color-gray');
    safeDownload.forEach(el => deleteElementIfParentHasClass(el, '#content_left'));
    const downloadLinksHref = Array.from(downloadLinks).map(el => el.textContent);
    if (safeDownload.length)
        console.log(`移除了${safeDownload.length}个所谓的安全下载, 为\n%c${downloadLinksHref.join('\n')}`, 'padding: 3px; color: #033; background: #ffc107;');
};


;// CONCATENATED MODULE: ./src/multiform/itTrainingInstitutions.ts


const removeITTrainingInstitutions = () => {
    const trainingInstitutions = getMultiElement('p.cu-line-clamp-1');
    const institutionName = Array.from(trainingInstitutions).reduce((acc, cur) => acc + '\n' + cur.textContent, '');
    trainingInstitutions.forEach(el => deleteElementIfParentHasClass(el, '#content_left'));
    if (trainingInstitutions.length)
        console.log(`移除了${trainingInstitutions.length - 1}个IT培训机构的广告, 为\n%c${institutionName}`, 'padding: 3px; color: #033; background: #28a745;');
};


;// CONCATENATED MODULE: ./src/keywords/index.ts
const keywords = [
    'CSDN',
    //这里可以添加其余想屏蔽的关键词
    //添加格式为 ==》 " '想屏蔽的关键词', "
    //！！！注意：不含""双引号，但是包含''单引号，而且,英文逗号不能省略！！！
    //↓请将光标放在此段末尾（最后一个向下箭头的后面），然后按下回车，在此行下面一行进行添加↓
    '脚本之家',
    '华军软件园',
];

;// CONCATENATED MODULE: ./src/multiform/keywords.ts



const removeKeywords = () => {
    const linkList = getMultiElement('a');
    const spanList = getMultiElement('span.c-color-gray.c-gap-left-xsmall');
    const searchingValue = getElement('#kw')?.value;
    const removedKeywords = [];
    keywords.forEach(keyword => {
        linkList.forEach(link => {
            if (link.innerHTML.includes(keyword) && !searchingValue?.includes(keyword)) {
                deleteElementIfParentHasClass(link, '#content_left');
                removedKeywords.push(keyword);
            }
        });
        spanList.forEach(span => {
            if (span.innerHTML.includes(keyword) && !searchingValue?.includes(keyword)) {
                deleteElementIfParentHasClass(span, 'c-gap-bottom-small');
                removedKeywords.push(keyword);
            }
        });
    });
    const uniqueRemovedKeywords = Array.from(new Set(removedKeywords));
    if (uniqueRemovedKeywords.length)
        console.log(`移除了${uniqueRemovedKeywords.length}个自定义的关键词, 为\n%c${uniqueRemovedKeywords.join('\n')}`, 'padding: 3px; color: #033; background: #007bff;');
};


;// CONCATENATED MODULE: ./src/main.ts




const filterAdsAndRemove = () => {
    removeAd();
    removeKeywords();
    removeDownloadLink();
    removeITTrainingInstitutions();
};
const getNewVersionId = (date = new Date()) => {
    return date.getFullYear() - 2022 + '.' + (date.getMonth() + 1) + '.' + date.getDate();
};


;// CONCATENATED MODULE: ./index.ts
/// <reference path="./declaration/custom-tampermonkey.d.ts" />


console.log(`%cCDRB%c${getNewVersionId()}`, 'padding: 3px; color: #fff; background: #00918a', 'padding: 3px; color: #fff; background: #002167');
const app = async () => {
    const target = await waitForTargetFinishLoading('#content_left');
    listeningForChangesInTarget(target, filterAdsAndRemove, {
        attributes: false,
        characterData: false,
    }, undefined, true);
    if (window.onurlchange === null) {
        window.addEventListener('urlchange', async (_) => {
            const target = await waitForTargetFinishLoading('#content_left');
            listeningForChangesInTarget(target, filterAdsAndRemove, {
                attributes: false,
                characterData: false,
            }, undefined, true);
        });
    }
};
app();

/******/ })()
;