let callback = function (allmutations) {
    allmutations.map((mr) => {
        isBreak = false
        elemTextTranslation(mr.target)
    });
}

mo = new MutationObserver(callback)

options = {
    'childList': true,
    'subtree': true
}

mo.observe(document.body, options);