describe('parseTemplate', () => {
    let object, block;

    beforeEach(() => {
        const body = document.querySelector("body");
        const div = document.createElement("div");
        div.setAttribute("id", "item1");
        div.innerHTML = '<h3 data-field="title">Some title</h3><p data-field="description"></p></div>';
        body.append(div);

        object = {
            title: "Hello world",
            description: "The first program"
        };

        block = document.getElementById("item1");
    });

    afterEach(() => {
        block.innerHTML = '';
        block.remove();
    });

    it('parsed template correctly', () => {
        parseTemplate(block, object);

        const titleElements = document.querySelectorAll('[data-field="title"]');
        const descriptionElements = document.querySelectorAll('[data-field="description"]');

        for (let element of titleElements)
            assert.equal(element.textContent, object.title);

        for (let element of descriptionElements)
            assert.equal(element.textContent, object.description);
    });

    it('parsed template with several same fields correctly', () => {
        const sameTitleElement = document.createElement("div");
        sameTitleElement.setAttribute("data-field", "title");
        block.append(sameTitleElement);

        const sameDescriptionElement = document.createElement("div");
        sameDescriptionElement.setAttribute("data-field", "description");
        block.append(sameDescriptionElement);

        parseTemplate(block, object);

        const titleElements = document.querySelectorAll('[data-field="title"]');
        const descriptionElements = document.querySelectorAll('[data-field="description"]');

        for (let element of titleElements)
            assert.equal(element.textContent, object.title);

        for (let element of descriptionElements)
            assert.equal(element.textContent, object.description);
    });

    it('parsed template with no text tags correctly', () => {
        const noTextTitleElement = document.createElement("div");
        noTextTitleElement.setAttribute("data-field", "title");
        noTextTitleElement.innerHTML = '<div><p>Some tags inside</p><br></div>';
        block.append(noTextTitleElement);

        parseTemplate(block, object);

        assert.equal(noTextTitleElement.textContent, object.title);
        assert.equal(noTextTitleElement.innerHTML, object.title);
    });

    it('does not change elements outside of block', () => {
        const outTitleElement = document.createElement("div");
        outTitleElement.setAttribute("data-field", "title");
        document.querySelector("body").append(outTitleElement);

        const outDescriptionElement = document.createElement("div");
        outDescriptionElement.setAttribute("data-field", "description");
        document.querySelector("body").append(outDescriptionElement);

        parseTemplate(block, object);

        assert.equal(outTitleElement.textContent, "");
        assert.equal(outDescriptionElement.textContent, "");

        outTitleElement.remove();
        outDescriptionElement.remove();
    });

    it('does not change elements without data-field attribute in block', () => {
        const someElement = document.createElement("div");
        someElement.setAttribute("data-other", "title");
        someElement.textContent = 'Something';
        block.append(someElement);

        parseTemplate(block, object);

        assert.equal(someElement.textContent, 'Something');
    });

    it('throw error if no field in object', () => {
        const badElement = document.createElement("p");
        badElement.setAttribute("data-field", "something");
        block.append(badElement);

        assert.throws(() => parseTemplate(block, object), 'No field something in object');
    });

    it('does not throw error if unnecessary field in object', () => {
        object.something = 'Something';

        assert.doesNotThrow(() => parseTemplate(block, object), Error);
    });
})
