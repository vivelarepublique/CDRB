import { deleteElementIfParentHasClass } from '../utils/parent';
import { getMultiElement } from '../utils/dom';

const removeITTrainingInstitutions = () => {
    const trainingInstitutions = getMultiElement('p.cu-line-clamp-1');
    const institutionName = Array.from(trainingInstitutions).reduce((acc, cur) => acc + '\n' + cur.textContent, '');

    trainingInstitutions.forEach(el => deleteElementIfParentHasClass(el, '#content_left'));

    if (trainingInstitutions.length) console.log(`移除了${trainingInstitutions.length - 1}个IT培训机构的广告, 为\n%c${institutionName}`, 'padding: 3px; color: #033; background: #28a745;');
};

export { removeITTrainingInstitutions };
