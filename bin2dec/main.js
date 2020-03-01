function verifyBinary() {
    let binaryInput = document.getElementById("binary");
    let validation = document.getElementById("validation");
    let convertBtn = document.getElementById("btn-convert");

    let regexValidation = /^$|^[0-1]+$/;
    binaryInput.value = binaryInput.value.replace(/\s/g, "");

    if (!binaryInput.value.match(regexValidation)) {
        validation.classList.remove("hide");
        convertBtn.disabled = true;
        convertBtn.classList.add("disabled");
    } else if (binaryInput.value.match(regexValidation)) {
        validation.classList.add("hide");
        convertBtn.disabled = false;
        convertBtn.classList.remove("disabled");
    }
}

function convert() {
    let decimalInput = document.getElementById("decimal");
    let binaryInput = document.getElementById("binary");

    if (binaryInput.value.match(/^$/)) {
        alert('Please, enter a binary number')
    } else {
        decimalInput.value = parseInt(binaryInput.value, 2);
    }
}
