const loginForm = document.querySelector(".loginForm");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const messageBox = document.querySelector(".messageBox"); 

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    console.log(email.value);
    console.log(password.value);
    
    try {
        const response = await fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message);
        }

        const data = await response.json(); 
        console.log("Login successfully.", data);
        
        
        localStorage.setItem('token', data.token);
        

        
        messageBox.innerHTML = "Login successful!";
        messageBox.style.color = "green";
    } catch (error) {
        console.error("Error:", error);
        messageBox.innerHTML = error.message; 
        messageBox.style.color = "red";
    }
});