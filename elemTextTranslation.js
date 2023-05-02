const SEARCH_VALUE = "а"

const changes = {
    "changesList": []
}
let isBreak = false

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "continue") {
        let body = document.body
        isBreak = false
        elemTextTranslation(body)
    }
});

while (!isBreak) {
    elemTextTranslation(document.body)
}

function elemTextTranslation(node) {
    const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message === "stop") {
            isBreak = true
            revertTranslation()
        }
    });

    while (treeWalker.nextNode()) {
        if (isBreak) {
            break
        }

        let changesNode = {}

        if (!(treeWalker.currentNode.parentElement.tagName === "SCRIPT" || treeWalker.currentNode.parentElement.tagName === "STYLE")) {
            const node = treeWalker.currentNode

            if (node.textContent.includes(SEARCH_VALUE)) {
                changesNode.node = node
            }

            let replaceValues = []

            while (node.textContent.includes(SEARCH_VALUE)) {
                if (isBreak) {
                    break
                }

                replaceValues.push(node.textContent.indexOf(SEARCH_VALUE))
                node.textContent = node.textContent.replace(SEARCH_VALUE, (Math.floor(Math.random() * 9)) + "");
            }

            changesNode.replaceValues = replaceValues
        }

        if (changesNode.node) {
            changes.changesList.push(changesNode)
        }

    }
    isBreak = true
}






