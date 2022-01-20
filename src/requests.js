/**
 * This webpage is written by Mani Gudvardarson and Michael Adrian Polesensky
 * for Assignment 2 in Web Technology at VU University Amsterdam.
 *
 * Coordinator: J.R . van Ossenbruggen
 * TA: Mithat Ozgun
 * Group: 109
 * Date: 20.1.2022
 */

const API_KEY = '6b1e7103'

// $("div.intro").append("<p>This is a jquery test!</p>").append("<p>This is another paragraph!</p>")
//
// $("input[type='text']").keyup(function () {
//     if (isNaN(parseInt(this.value))) {
//         this.style.border = "2px solid red"
//     } else if (!isNaN(parseInt(this.value)) && this.style.border === "2px solid red") {
//         this.style.border = "0 solid red"
//     }
// }).blur(function () {
//     this.style.border = "0 solid red"
// })
//
// $("input[type='number']").keyup(function () {
//     if (isNaN(parseInt(this.value))) {
//         this.style.border = "2px solid red"
//     } else if (!isNaN(parseInt(this.value)) && this.style.border === "2px solid red") {
//         this.style.border = "0 solid red"
//     }
// }).blur(function () {
//     this.style.border = "0 solid red"
// })

$('#reset-product-table-button').on('click', () => {
    let confirm = window.confirm('Are you sure? All data will be lost.')

    if (confirm === true) {
        const resetUrl = `https://wt.ops.labs.vu.nl/api22/${API_KEY}/reset`

        $.ajax({ url: resetUrl }).done((response) => {
            if (response.Success) {
                showMessage($('#request-feedback'), 'Table reset successful!')
            }
        }).catch((error) => {
            showMessage($('#request-error'), `Table reset failed! ${error.responseJSON.Error}`)
        })
    }
})

$('#add-product-button').on('click', (event) => {
    event.preventDefault()
    $('#add-product-form').trigger('submit')
})

$('#create-demo-data-button').on('click', () => {
    const DEMO_PRODUCTS = [
        {
            brand: 'Apple',
            model: 'iPhone 13',
            os: 'iOS 15.0',
            screensize: 6,
            image: 'https://hi.com'
        },
        {
            brand: 'Apple',
            model: 'MacBook Pro 14',
            os: 'macOS 11.6',
            screensize: 14,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgSxgpT72SixqlSOnoSaoyaGmRethsjDBfXQ&usqp=CAU'
        },
        {
            brand: 'Samsung',
            model: 'Galaxy S21 Ultra',
            os: 'Android 11',
            screensize: 7,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/GalaxyS21.png/440px-GalaxyS21.png'
        },
        {
            brand: 'Apple',
            model: 'Watch Series 7',
            os: 'watchOS 8.3',
            screensize: 2,
            image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKUQ3_VW_PF+watch-45-alum-midnight-nc-7s_VW_PF_WF_CO?wid=1400&hei=1400&trim=1,0&fmt=p-jpg&qlt=95&.v=1632171068000,1631661680000'
        },
        {
            brand: 'Microsoft',
            model: 'Surface Laptop 4',
            os: 'Windows 11',
            screensize: 15,
            image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWBrzy?ver=85d4&q=90&m=6&h=270&w=270&b=%23FFFFFFFF&f=jpg&o=f&aim=true'
        }
    ]

    const promises = DEMO_PRODUCTS.map((product) => {
        return createProduct(product)
    })

    Promise.all(promises).then((products) => {
        // @todo Reload table.
    })
})

const fetchProducts = async () => {
    $.ajax({
        url: `https://wt.ops.labs.vu.nl/api22/${API_KEY}`,
        method: "GET",
        responseType: "JSON"
    }).done(response => {
        for (let i = 0; i < response.length; i++) {
            $("tbody.table-body").append(`
                <tr>
                    <td>${response[i]['brand']}</td>
                    <td>${response[i]['model']}</td>
                    <td>${response[i]['os']}</td>
                    <td>${response[i]['screensize']}</td>
                    <td class="product-image">
                        <figure>
                            <img src=${response[i]['image']} alt=${response[i]['brand']} ${response[i]['model']}>
                            <figcaption>${response[i]['brand']} ${response[i]['model']}</figcaption>
                        </figure>
                    </td>
                </tr>
            `)
        }
    })
}


$(function() {
    fetchProducts()
})

// Create a single product with a AJAX call to the API.
const createProduct = async (product) => {
    const createUrl = `https://wt.ops.labs.vu.nl/api22/${API_KEY}`

    return $.ajax({
        url: createUrl,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(product)
    })
}

// Toggles a message for 2.5 seconds in an element
const showMessage = ($elm, message) => {
    $elm.text(message).fadeIn(500).delay(2500).fadeOut(500);
}

// Add an error element after an input element
const addInputError = (inputName, message) => {
    $(`<span class="input-error">${message}</span>`).insertAfter(`input[name="${inputName}"]`)
}

// When a new product is added, a URI is returned for the new product.
// This product needs to be fetched so it can be added to the product table
const fetchSingleProductByURI = (URI) => {
    $.ajax({ url: URI, method: "GET" }).done((product) => {
        addProductToTable(product)
    }).catch((error) => {
        showMessage($('#request-error'), `Failed to fetch product! ${error.responseJSON.Error}`)
    })
}

const addProductToTable = (product) => {
    $("tbody.table-body").append(`<tr>
        <td>${product["brand"]}</td>
        <td>${product["model"]}</td>
        <td>${product["os"]}</td>
        <td>${product["screensize"]}</td>
        <td class="product-image">
            <figure>
                <img src=${product["image"]} alt=${product["brand"]} ${product["model"]}
                <figcaption>${product["brand"]} ${product["model"]}</figcaption>
            </figure>
        </td>
    </tr>`)
}

// form submit handler.
$('#add-product-form').on('submit', (form) => {
    form.preventDefault();
    $('.input-error').remove()
    let isFormValid = true

    let product = {
        brand: $('input[name="brand"]').val(),
        model: $('input[name="model"]').val(),
        os: $('input[name="os"]').val(),
        screensize: $('input[name="screensize"]').val(),
        image: $('input[name="image"]').val(),
    }

    // Validate fields
    if (!product.brand) {
        addInputError('brand', 'Brand is required!')
        isFormValid = false
    }

    if (!product.model) {
        addInputError('model', 'Model is required!')
        isFormValid = false
    }

    if (!product.os) {
        addInputError('os', 'OS is required!')
        isFormValid = false
    }

    if (!product.screensize) {
        addInputError('screensize', 'Screen size is required!')
        isFormValid = false
    }
    if (!product.image) {
        addInputError('image', 'Image is required!')
        isFormValid = false
    } else {
        var urlExpression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(urlExpression);

        if (!product.image.match(regex)) {
            addInputError('image', 'Invalid URL!')
            isFormValid = false
        }
    }

    if (!isFormValid) {
        showMessage($('#request-error'), `Review input fields and try again!`)
        return
    }

    createProduct(product).then((response) => {
        if (response.URI) {
            fetchSingleProductByURI(response.URI)
            showMessage($('#request-feedback'), 'Product added successful!')
            $("#add-product-form").trigger("reset");
        }
    }).catch((error) => {
        showMessage($('#request-error'), `Failed to add product! ${error.responseJSON.Error}`)
    })
})

// Restores the table with the data from the distant database.
$("input.restore").on("click", function () {
    removeElements()
    $.ajax({
        url: "https://wt.ops.labs.vu.nl/api22/6b1e7103",
        method: "GET",
        responseType: "JSON"
    }).done(response => {
        for (let i = 0; i < response.length; i++) {
            $("tbody.table-body").append(`
                <tr>
                    <td>${response[i]['brand']}</td>
                    <td>${response[i]['model']}</td>
                    <td>${response[i]['os']}</td>
                    <td>${response[i]['screensize']}</td>
                    <td class="product-image">
                        <figure>
                            <img src=${response[i]['image']} alt=${response[i]['brand']} ${response[i]['model']}>
                            <figcaption>${response[i]['brand']} ${response[i]['model']}</figcaption>
                        </figure>
                    </td>
                </tr>
            `)
        }
    })
})

/**
 * @function removeElements - Removes the table elements before updating the table.
 * @returns {void}
 */
function removeElements() {
    let parent = document.getElementById("body-1")

    if (parent.children.length > 0) {
        let arr = Array.from(parent.children)

        for (let child of arr) {
            parent.removeChild(child)
        }
    }
}
