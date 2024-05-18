type ActionFunction = (value?: string) => void;

interface MutationsOptions {
    childList?: boolean;
    characterData?: boolean;
    subtree?: boolean;
    attributes?: boolean;
}

interface RealElement extends Element {
    [key: string]: any;
}

type delayWay = 'debounce' | 'throttle';

interface delayOptions {
    delay: number;
    way: delayWay;
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: number | null = null;

    return (...args) => {
        if (timeout !== null) window.clearTimeout(timeout);
        timeout = window.setTimeout(() => func(...args), wait);
    };
}

function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let timer: number | null = null;

    return (...args) => {
        if (!timer) {
            timer = window.setTimeout(() => {
                func(...args);
                timer = null;
            }, limit);
        }
    };
}

const getElement = (selector: string): Element | null => {
    return document.querySelector(selector);
};

const getMultiElement = (selector: string): NodeListOf<Element> => {
    return document.querySelectorAll(selector);
};

const listeningForChangesInTarget = (target: string | Element, action: ActionFunction, options?: MutationsOptions, valueOfConcern?: string, immediate?: boolean | delayOptions) => {
    if (immediate) {
        if (typeof immediate === 'object') {
            const { delay, way } = immediate;
            if (way === 'debounce') {
                debounce(action, delay);
            } else if (way === 'throttle') {
                throttle(action, delay);
            }
        } else {
            action();
        }
    }

    const targetElement = target instanceof Element ? target : getElement(target);

    if (targetElement) {
        const targetObserver = new MutationObserver(mutations => {
            const mutation = mutations.find(el => el.target === targetElement);
            if (mutation) {
                const element = mutation.target as RealElement;
                if (valueOfConcern && valueOfConcern in element) {
                    action(element[valueOfConcern]);
                } else {
                    action();
                }
            }
        });

        targetObserver.observe(targetElement, { childList: true, characterData: true, subtree: true, attributes: true, ...options });
    }
};

const waitForTargetFinishLoading = (target: string): Promise<Element> => {
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

export { getElement, getMultiElement, listeningForChangesInTarget, waitForTargetFinishLoading, RealElement };
