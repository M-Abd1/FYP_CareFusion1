

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = {
        email: event.target.email.value
    }
    console.log(formData)
    // Send form data to server
    fetch('/forgotAction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json()) // Assuming server sends JSON response
    .then(data => {
        console.log(data.message)
        if(data.message == 'no')
        {
            console.log("Email does not exist");
            const message = "Email does not exist";
            window.location.href = `http://localhost:3302/forgotPassword?message=${message}`;
        }
        else{
            console.log("Email exist, otp form up");
            const message = "";
            window.location.href = `http://localhost:3302/otpform?message=${message}&email=${data.email}`;
        }
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
});


