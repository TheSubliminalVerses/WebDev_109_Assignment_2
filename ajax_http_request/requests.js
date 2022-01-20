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

$('#reset-product-table-button').click(() => {
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

$('#add-product-button').click(() => {
    $('#add-product-form').submit()
})

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

$('#add-product-form').submit((form) => {
    form.preventDefault();
    const addUrl = `https://wt.ops.labs.vu.nl/api22/${API_KEY}`
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

    $.ajax({
        url: addUrl,
        method: 'POST',
        data: product
    }).done((response) => {
        if (response.URI) {
            fetchSingleProductByURI(response.URI)
            showMessage($('#request-feedback'), 'Product added successful!')
            $("#add-product-form").trigger("reset");
        }
    }).catch((error) => {
        showMessage($('#request-error'), `Failed to add product! ${error.responseJSON.Error}`)
    })
})

$("input.restore").click(function () {
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