const order = document.getElementById("order")

order.addEventListener("change", function () {
    let orderBy = order.options[order.selectedIndex].text
    let tableBody = document.getElementById("body-1")
    let children = []

    for (let child of tableBody.children) {
        if (child.getAttribute("class") !== "input-row") {
            children.push(child)
        }
    }

    switch (orderBy) {
        case "Product Brand":
            sortElementChild(children, 0, tableBody, 0)
            break
        case "Product Model":
            sortElementChild(children, 1, tableBody, 0)
            break
        case "Product OS":
            sortElementChild(children, 2, tableBody, 0)
            break
        case "Screen Size":
            sortElementChild(children, 3, tableBody, 0)
            break
        default:
            console.warn("No such option in the list!!!")
    }
})

/**
 * Function for sorting child elements of the table.
 * @param {Element[]} children
 * @param {number} index
 * @param {Element} parentElement
 * @param {number} Start
 * @returns {void}
 */
function sortElementChild(children, index, parentElement, Start) {
    children.sort((a, b) => {
        if (a.children[index].innerText[Start].toLowerCase() > b.children[index].innerText[Start].toLowerCase()) {
            return 1
        } else if (a.children[index].innerText[Start].toLowerCase() < b.children[index].innerText[Start].toLowerCase()) {
            return -1
        }

        return 0
    })

    for (let element of children) {
        parentElement.removeChild(element)
    }

    children.forEach(child => {
        parentElement.appendChild(child)
        console.log(child)
    })
}