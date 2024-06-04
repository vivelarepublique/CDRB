/// <reference path="./declaration/custom-tampermonkey.d.ts" />

import { listenElementChanges, waitElementFinishLoading } from './src/utils/dom';
import { filterAdsAndRemove, getNewVersionId } from './src/main';

console.log(`%cCDRB%c${getNewVersionId()}`, 'padding: 3px; color: #fff; background: #00918a', 'padding: 3px; color: #fff; background: #002167');

const app = async () => {
    const target = await waitElementFinishLoading('#content_left');
    listenElementChanges(target, {
        immediateImplementation: true,
        noTarget: true,
        childrenConcern: [
            {
                target: '.ad-text',
                action: _ => filterAdsAndRemove(),
            },
        ],
    });
    if (window.onurlchange === null) {
        window.addEventListener('urlchange', async _ => {
            const target = await waitElementFinishLoading('#content_left');
            listenElementChanges(target, {
                immediateImplementation: true,
                noTarget: true,
                childrenConcern: [
                    {
                        target: '.ad-text',
                        action: _ => filterAdsAndRemove(),
                    },
                ],
            });
        });
    }
};

app();
