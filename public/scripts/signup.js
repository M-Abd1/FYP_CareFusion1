function formValidations() {
  // email validation @gmail.com
  var email = document.getElementById("email").value;
  console.log(email);
  const domain = email.split('@')[1];
  document.getElementById("emailError").innerHTML = "";
  if (domain.toLowerCase() !== 'gmail.com') {
    document.getElementById("emailError").innerHTML = "Invalid domain!!"
    return false;
  }
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('cnfrmpassword').value;
  document.getElementById("pwdError").innerHTML = "";
  if (password.length < 8) {
    document.getElementById("pwdError").innerHTML = "Password must be at least 8 digit long!!";
    return false;
  }
  if (confirmPassword.length < 8 || confirmPassword !== password) {
    document.getElementById("pwdError2").innerHTML = "Password doesn't matches!!";
    return false;
  }
}
document.addEventListener('DOMContentLoaded', function () {
  var serviceSeeker = document.getElementById('serviceSeeker');
  var serviceProvider = document.getElementById('serviceProvider');

  // Event listeners to handle radio button changes
  serviceSeeker.addEventListener('change', function () {
    serviceProvider.checked = false;
  });

  serviceProvider.addEventListener('change', function () {
    serviceSeeker.checked = false;
  });
});
