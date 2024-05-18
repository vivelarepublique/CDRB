import { removeAd } from './multiform/ad';
import { removeDownloadLink } from './multiform/downloadLink';
import { removeITTrainingInstitutions } from './multiform/itTrainingInstitutions';
import { removeKeywords } from './multiform/keywords';

const filterAdsAndRemove = () => {
    removeAd();
    removeKeywords();
    removeDownloadLink();
    removeITTrainingInstitutions();
};

const getNewVersionId = (date = new Date()) => {
    return date.getFullYear() - 2022 + '.' + (date.getMonth() + 1) + '.' + date.getDate();
};

export { filterAdsAndRemove, getNewVersionId };
