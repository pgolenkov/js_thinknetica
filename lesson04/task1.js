function htmlTree1(node = document, tab = 0) {
    console.log("".padStart(tab, '-') + `${node.nodeType} ${node.nodeName} ${node.nodeValue}`);

    for (let childNode of node.childNodes)
        htmlTree1(childNode, tab + 4);
}

function htmlTree2(node = document, tab = 0) {
    while (node) {
        console.log("".padStart(tab, '-') + `${node.nodeType} ${node.nodeName} ${node.nodeValue}`);
        htmlTree2(node.firstChild, tab + 4);
        node = node.nextSibling;
    }
}

function htmlTree3(node = document, tab = 0) {
    let acc = [];

    while (node) {
        acc = acc.concat(htmlTree3(node.lastChild, tab + 4));
        acc.push("".padStart(tab, '-') + `${node.nodeType} ${node.nodeName} ${node.nodeValue}`);
        node = node.previousSibling;
    }

    if (!tab)
        acc.reverse().forEach(item => console.log(item));
    else
        return acc;
}

console.log('1 вариант');
htmlTree1();
console.log('2 вариант');
htmlTree2();
console.log('3 вариант');
htmlTree3();
