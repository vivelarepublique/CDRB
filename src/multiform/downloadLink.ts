import { getMultiElement } from '../utils/dom';
import { deleteElementIfParentHasClass } from '../utils/parent';

const removeDownloadLink = () => {
    const safeDownload = getMultiElement('span.c-btn.c-btn-primary.OP_LOG_BTN');
    const downloadLinks = getMultiElement('div.c-row.source_1Vdff.OP_LOG_LINK div span.c-color-gray');

    safeDownload.forEach(el => deleteElementIfParentHasClass(el, '#content_left'));
    const downloadLinksHref = Array.from(downloadLinks).map(el => el.textContent);

    if (safeDownload.length) console.log(`移除了${safeDownload.length}个所谓的安全下载, 为\n%c${downloadLinksHref.join('\n')}`, 'padding: 3px; color: #033; background: #ffc107;');
};

export { removeDownloadLink };
