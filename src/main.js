const API_KEY = '6b1e7103'

$("div.intro").append("<p>This is a jquery test!</p>").append("<p>This is another paragraph!</p>")

$("input[type='text']").keyup(function () {
    if (isNaN(parseInt(this.value))) {
        this.style.border = "2px solid red"
    } else if (!isNaN(parseInt(this.value)) && this.style.border === "2px solid red") {
        this.style.border = "0 solid red"
    }
}).blur(function () {
    this.style.border = "0 solid red"
})

$("input[type='number']").keyup(function () {
    if (isNaN(parseInt(this.value))) {
        this.style.border = "2px solid red"
    } else if (!isNaN(parseInt(this.value)) && this.style.border === "2px solid red") {
        this.style.border = "0 solid red"
    }
}).blur(function () {
    this.style.border = "0 solid red"
})

$('#resetProductTableButton').click(() => {
    let confirm = window.confirm('Are you sure? All data will be lost.')

    if (confirm === true) {
        const resetUrl = `https://wt.ops.labs.vu.nl/api22/${API_KEY}/reset`

        $.ajax({ url: resetUrl }).done((response) => {
            if (response.Success) {
                $('#requestFeedback').text('Table reset successful!')
            }
        }).catch((error) => {
            $('#requestError').text(`Table reset failed! ${error.responseJSON.Error}`)
        })
    }
})