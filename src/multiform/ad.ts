import { getMultiElement } from '../utils/dom';
import { deleteElementIfParentHasClass } from '../utils/parent';

const removeAd = () => {
    const ADList1 = getMultiElement('span.ec-tuiguang.ecfc-tuiguang');
    const ADList2 = getMultiElement('a.m.c-gap-left');

    const companyName = getMultiElement('.ec-showurl-line');
    const companyWebsite = getMultiElement('a.c-showurl.c-color-gray');

    ADList1.forEach(el => deleteElementIfParentHasClass(el, '#content_left'));
    ADList2.forEach(el => deleteElementIfParentHasClass(el, '#content_left'));

    const companyNameText = Array.from(companyName).map(el => el.textContent);
    const companyWebsiteLink = Array.from(companyWebsite).map(el => el.textContent);

    if (ADList1.length) console.log(`移除了${ADList1.length}个公司的广告, 为\n%c${companyNameText.join('\n')}`, 'padding: 3px; color: #033; background: #dc3545;');
    if (ADList2.length) console.log(`移除了${ADList2.length}个公司的广告, 为\n%c${companyWebsiteLink.join('\n')}`, 'padding: 3px; color: #033; background: #dc3545;');
};

export { removeAd };
