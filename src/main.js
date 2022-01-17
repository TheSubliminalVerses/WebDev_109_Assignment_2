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