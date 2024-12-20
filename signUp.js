const signUpForm = document.querySelector(".signUp");
const inputName = document.querySelector(".name");
const inputEmail = document.querySelector(".email");
const inputPassword = document.querySelector(".password");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    console.log(inputName.value);
    console.log(inputEmail.value);
    console.log(inputPassword.value);
    
    try {
        const response = await fetch(`http://localhost:3000/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputName.value, // Ensure correct value retrieval
                email: inputEmail.value,
                password: inputPassword.value,
            }),
        });

        if (!response.ok) {
        
            const errorMessage = await response.json(); // Parse the response
            throw new Error(errorMessage.message); // Throw an error with the message
        }

        console.log("User successfully created.");
    } catch (error) {
        console.error("Error:", error);
    }
});