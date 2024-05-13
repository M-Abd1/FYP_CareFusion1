function formValidations() {
    var password = document.getElementById('password').value;
    document.getElementById("pwdError").innerHTML = "";
    if (password.length < 8) {
        document.getElementById("pwdError").innerHTML = "Password must be at least 8 digit long!!";
        return false;
    }
    return true;
}