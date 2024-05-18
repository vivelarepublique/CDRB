import { deleteElementIfParentHasClass } from '../utils/parent';
import { keywords } from '../keywords';
import { getElement, getMultiElement, RealElement } from '../utils/dom';

const removeKeywords = () => {
    const linkList = getMultiElement('a');
    const spanList = getMultiElement('span.c-color-gray.c-gap-left-xsmall');
    const searchingValue = (getElement('#kw') as RealElement)?.value;

    const removedKeywords: string[] = [];

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
    if (uniqueRemovedKeywords.length) console.log(`移除了${uniqueRemovedKeywords.length}个自定义的关键词, 为\n%c${uniqueRemovedKeywords.join('\n')}`, 'padding: 3px; color: #033; background: #007bff;');
};

export { removeKeywords };
