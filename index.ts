/// <reference path="./declaration/custom-tampermonkey.d.ts" />

import { listeningForChangesInTarget, waitForTargetFinishLoading } from './src/utils/dom';
import { filterAdsAndRemove, getNewVersionId } from './src/main';

console.log(`%cCDRB%c${getNewVersionId()}`, 'padding: 3px; color: #fff; background: #00918a', 'padding: 3px; color: #fff; background: #002167');

const app = async () => {
    const target = await waitForTargetFinishLoading('#content_left');
    listeningForChangesInTarget(
        target,
        filterAdsAndRemove,
        {
            attributes: false,
            characterData: false,
        },
        undefined,
        true
    );
    if (window.onurlchange === null) {
        window.addEventListener('urlchange', async _ => {
            const target = await waitForTargetFinishLoading('#content_left');
            listeningForChangesInTarget(
                target,
                filterAdsAndRemove,
                {
                    attributes: false,
                    characterData: false,
                },
                undefined,
                true
            );
        });
    }
};

app();
