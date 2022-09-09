(function begin() {
    if (!waitTime()) {
        return new Promise(resolve => {
            setTimeout(async () => {
                begin();
                resolve();
            }, 1000);
        });
    } else {
        console.log('done');
    }
})();

function waitTime() {
    console.log(new Date().getSeconds());
    return new Date().getSeconds() === 1 || new Date().getSeconds() === 2 ? new Date().getSeconds() : null;
}
