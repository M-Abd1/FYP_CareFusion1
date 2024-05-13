document.getElementById('otpform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = {
        email: event.target.email.value,
        otp: event.target.otp.value
    }    
    // Send form data to server
    fetch('/OTP', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json()) // Assuming server sends JSON response
    .then(data => {
        if(data.message == 'no')
        {
            console.log("OTP does not match");
            const message = "OTP does not match";
        window.location.href = `http://localhost:3302/otpform?message=${message}&email=${data.email}`;
        }
        else{
            console.log("otp match, login form up");
            const message = "";
        window.location.href = `http://localhost:3302/resetform?message=${message}&email=${data.email}`;
        }
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
});