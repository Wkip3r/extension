let isBreakRevert = false

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "continue") {
        isBreakRevert = true
        elemTextTranslation(document.body)
        isBreakRevert = false
    }
});

function revertTranslation() {
    let changesList = changes.changesList
    console.log(changesList)

    for (let i = 0; i < changesList.length; i++) {
        if (isBreakRevert) {
            break
        }
        for (let j = 0; j < changesList[i].replaceValues.length; j++) {
            if (isBreakRevert) {
                break
            }

            let textNode = changesList[i].node.textContent
            changesList[i].node.textContent = textNode.substring(0, changesList[i].replaceValues[j]) + SEARCH_VALUE + textNode.substring(changesList[i].replaceValues[j] + 1);
        }
    }

    changes.changesList = []
}