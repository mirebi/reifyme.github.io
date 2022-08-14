

const mail_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phone_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

let check_valid_email = (address) => {
    return mail_regex.test(String(address).toLowerCase())
}

let check_valid_phonenum = (num) => {
    return mail_regex.test(String(num).toLowerCase())
}

const name = document.getElementById("fullname")
const mail = document.getElementById("mailto")
const phone = document.getElementById("phonenum")
const purpose = document.getElementById("purpose")
const flash = document.getElementById("flash")
const submit = document.getElementById("button-submit")
submit.onclick = (e)=>{
    let valid = check_valid_email(mail.value)
    && (purpose.value !== "")

    flash.style.display="inline"
    if (valid){
        console.log("valid")
        flash.style.borderColor="#ffd65f"
        flash.innerHTML = "Valid Info! Submission initiated."
        flash.style.display = "shown"
    } else {
        console.log("invalid")
        flash.innerHTML = `<i class = "lni lni-warning" ></i>
Your Information is invalid or incomplete.
`
    }
}