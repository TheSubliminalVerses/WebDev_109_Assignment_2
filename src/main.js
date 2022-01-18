const linkElements = document.getElementsByClassName("order")

window.addEventListener("load", function () {
    bind("click", linkElements, [function () {
        let parentElement = document.getElementById("body-1")
        let children = makeElementArray(parentElement)

        orderElementList(children, 0, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-1")
        let children = makeElementArray(parentElement)

        orderElementList(children, 1, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-1")
        let children = makeElementArray(parentElement)

        orderElementList(children, 2, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-1")
        let children = makeElementArray(parentElement)

        orderElementList(children, 3, parentElement, 0)
    }])
})

/**
 * @function Used for sorting rows in the table in alphabetical order. Used to sort the table rows.
 * @param {Element[]} children
 * @param {number} index
 * @param {Element} parentElement
 * @param {number} Start
 */
function orderElementList(children, index, parentElement, Start) {
    children.sort((a, b) => {
        if (a.children[index].innerText[Start].toLowerCase() > b.children[index].innerText[Start].toLowerCase()) {
            return 1
        } else if (a.children[index].innerText[Start].toLowerCase() < b.children[index].innerText[Start].toLowerCase()) {
            return -1
        }

        return 0
    })

    for (let child of children) {
        parentElement.removeChild(child)
    }

    children.forEach(child => {
        parentElement.appendChild(child)
    })
}

/**
 * @function Used to bulk bind events callback functions to an array of html elements.
 * @param {string} eventType
 * @param {HTMLCollectionOf<Element>} elements
 * @param {EventListenerOrEventListenerObject[]} listenerCollection
 */
function bind(eventType, elements, listenerCollection) {
    for (let i = 0; i < listenerCollection.length; i++) {
        elements[i].addEventListener(eventType, listenerCollection[i])
    }
}

/**
 * @function Used to get the children of the parent element so they can be manipulated.
 * @param {Element} parentElement
 * @returns {Element[]}
 */
function makeElementArray(parentElement) {
    let arr = []

    for (let child of parentElement.children) {
        if (child.getAttribute("class") !== "input-row") {
            arr.push(child)
        }
    }

    return arr
}