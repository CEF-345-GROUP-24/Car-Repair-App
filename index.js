
const  joinUs= document.querySelector(".joinUs") ;
const   login= document.querySelector(".login");
const getStarted= document.querySelector(".getStarted");
joinUs.addEventListener("click",()=>{
    window.location.replace("signUp.html");
})
getStarted.addEventListener("click",()=>{
    window.location.replace("signUp.html");
})
login.addEventListener("click",()=>{
    window.location.replace("login.html");
})

const appointmentForm = document.querySelector(".appointment-form");
const userName= document.getElementById("name");
const email= document.getElementById("email");
const phone= document.getElementById("phone");
const date= document.getElementById("date");
const time= document.getElementById("time");
const service= document.getElementById("service");

    appointmentForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        console.log(userName.value)
        console.log(email.value)
        console.log(phone.value)
        console.log(date.value)
        console.log(time.value)
        console.log(service.value)

        try {
            const response = await fetch(`http://localhost:3000/bookAppointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName.value,
                    email: email.value,
                    phone: phone.value,
                    date:   date.value,
                    time:   time.value,
                    service: service.value,
                }),
            });
    
            if (!response.ok) {
               
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }
    
            console.log("Appointment booked successfully.");
        } catch (error) {
            console.error("Error:", error);
        }
       
    })


