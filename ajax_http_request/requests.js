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

const addInputError = (inputName, message) => {
    $(`<span class="input-error">${message}</span>`).insertAfter(`input[name="${inputName}"]`)
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
            showMessage($('#request-feedback'), 'Product added successful!')
            $("#add-product-form").trigger("reset");
        }
    }).catch((error) => {
        showMessage($('#request-error'), `Failed to add product! ${error.responseJSON.Error}`)
    })

    return false
})