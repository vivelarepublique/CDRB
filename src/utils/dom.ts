interface RealElement extends Element {
    [key: string]: any;
}

interface ListenOptions {
    callback?: (...args: any[]) => any;
    attributesConcern?: string;
    childrenConcern?: {
        action: (...args: any[]) => any;
        target: string;
    }[];
    noTarget?: boolean;
    immediateImplementation?: boolean;
    triggerLimitation?: {
        delay: number;
        way: 'debounce' | 'throttle' | 'none';
    };
    manualSetupOptions?: {
        childList?: boolean;
        subtree?: boolean;
        attributes?: boolean;
    };
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

const listenElementChanges = (target: string | Element, options: ListenOptions): MutationObserver | undefined => {
    const { callback = () => {}, attributesConcern, childrenConcern = [], immediateImplementation = false, noTarget = false, triggerLimitation = { way: 'none', delay: 0 }, manualSetupOptions } = options;

    const { delay, way } = triggerLimitation;
    const finalAction = way === 'debounce' ? debounce(callback, delay) : way === 'throttle' ? throttle(callback, delay) : callback;

    const targetElement = target instanceof Element ? target : getElement(target);
    if (!targetElement) return;

    if (immediateImplementation) {
        attributesConcern ? callback((targetElement as RealElement)[attributesConcern]) : callback();
    }
    const children = childrenConcern.map(({ target, action }) => {
        return {
            target,
            action: way === 'debounce' ? debounce(action, delay) : way === 'throttle' ? throttle(action, delay) : action,
        };
    });

    const targetObserver = new MutationObserver(mutations => {
        children.forEach(child => {
            if (noTarget) {
                child.action();
            } else {
                const childMutation = mutations.find(el => el.target === getElement(child.target));
                if (childMutation) child.action(childMutation.target);
            }
        });

        const attributesMutation = mutations.find(el => el.target === targetElement);
        if (attributesMutation) {
            const element = attributesMutation.target as RealElement;
            attributesConcern && attributesConcern in element ? finalAction(element[attributesConcern]) : finalAction();
        }
    });

    targetObserver.observe(targetElement, { childList: childrenConcern.length > 0, attributes: !!attributesConcern, subtree: childrenConcern.length > 0, ...manualSetupOptions });
    return targetObserver;
};

const waitElementFinishLoading = (target: string): Promise<Element> => {
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

export { getElement, getMultiElement, listenElementChanges, waitElementFinishLoading, RealElement };
