const deleteElementIfParentHasClass = (element: Element, terminator: string) => {
    if (!element.parentElement) {
        return;
    }

    if (terminator.startsWith('#')) {
        if (element.parentElement.id === terminator.substring(1)) {
            element.remove();
        } else {
            deleteElementIfParentHasClass(element.parentElement, terminator);
        }
    } else {
        if (element.parentElement.classList.contains(terminator)) {
            element.remove();
        } else {
            deleteElementIfParentHasClass(element.parentElement, terminator);
        }
    }
};
export { deleteElementIfParentHasClass };
