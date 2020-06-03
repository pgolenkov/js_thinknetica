function parseTemplate(element, object) {
    const dataElements = element.querySelectorAll('[data-field]');

    for (let dataElement of dataElements) {
        let fieldName = dataElement.getAttribute("data-field");

        if (object[fieldName] === undefined)
            throw new Error(`No field ${fieldName} in object`);

        dataElement.textContent = object[fieldName];
    }
}
