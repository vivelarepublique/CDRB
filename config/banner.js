function getNewVersionId(date = new Date()) {
    return date.getFullYear() - 2022 + '.' + (date.getMonth() + 1) + '.' + date.getDate();
}

function getMultiParameters(parameter, name) {
    return parameter.reduce((acc, cur, index, self) => acc + '// @' + name + ' '.repeat(13 - name.length) + cur + (index === self.length - 1 ? '' : '\n'), '');
}

const config = {
    name: 'CDRB',
    namespace: 'http://tampermonkey.net/',
    description: `Coder Doesn't Require BAIDU.`,
    author: 'vivelarepublique',
    matchUrl: ['http://www.baidu.com/*', 'https://www.baidu.com/*'],
    grant: ['window.onurlchange'],
    runtime: 'document-body',
};

const banner = `// ==UserScript==
// @name         ${config.name}
// @namespace    ${config.namespace}
// @version      ${getNewVersionId()}
// @description  ${config.description}
// @author       ${config.author}
// @run-at       ${config.runtime}
${getMultiParameters(config.matchUrl, 'match')}
${getMultiParameters(config.grant, 'grant')}
// @downloadURL  https://github.com/vivelarepublique/CDRB/raw/master/CDRB.user.js
// @updateURL    https://github.com/vivelarepublique/CDRB/raw/master/CDRB.user.js
// ==/UserScript==
`;

const scriptFilename = `${config.name}.user.js`;
module.exports = {
    banner,
    scriptFilename,
};
