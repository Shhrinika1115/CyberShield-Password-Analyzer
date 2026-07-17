// Selecting HTML Elements

const password = document.getElementById("password");
const progress = document.getElementById("progress");
const strengthText = document.getElementById("strengthText");
const tips = document.getElementById("tips");
const crackTime = document.getElementById("crackTime");

const toggleBtn = document.getElementById("toggleBtn");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");
const themeBtn = document.getElementById("themeBtn");


// Show / Hide Password

toggleBtn.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";
        toggleBtn.innerText = "Hide Password";

    }
    else{

        password.type = "password";
        toggleBtn.innerText = "Show Password";

    }

});



// Copy Password

copyBtn.addEventListener("click", () => {

    if(password.value){

        navigator.clipboard.writeText(password.value);

        alert("Password Copied!");

    }
    else{

        alert("Enter a password first!");

    }

});



// Password Analyzer

password.addEventListener("input", checkPassword);


function checkPassword(){

    let pass = password.value;

    let score = 0;

    let suggestions = [];


    // Length Check

    if(pass.length >= 8){

        score++;

    }
    else{

        suggestions.push("Use at least 8 characters");

    }



    // Uppercase Check

    if(/[A-Z]/.test(pass)){

        score++;

    }
    else{

        suggestions.push("Add an uppercase letter");

    }



    // Lowercase Check

    if(/[a-z]/.test(pass)){

        score++;

    }
    else{

        suggestions.push("Add a lowercase letter");

    }



    // Number Check

    if(/[0-9]/.test(pass)){

        score++;

    }
    else{

        suggestions.push("Add a number");

    }



    // Special Character Check

    if(/[!@#$%^&*(),.?":{}|<>]/.test(pass)){

        score++;

    }
    else{

        suggestions.push("Add a special character");

    }



    updateUI(score, suggestions);

}



// Update User Interface

function updateUI(score, suggestions){


    let percent = score * 20;


    progress.style.width = percent + "%";



    // Strength Color

    if(score <= 2){

        progress.style.background = "red";

        strengthText.innerHTML =
        "Strength : Weak";

    }


    else if(score == 3 || score == 4){


        progress.style.background = "orange";

        strengthText.innerHTML =
        "Strength : Medium";


    }


    else{


        progress.style.background = "limegreen";

        strengthText.innerHTML =
        "Strength : Strong";


    }



    // Suggestions

    tips.innerHTML = "";


    suggestions.forEach(item => {


        let li = document.createElement("li");

        li.innerText = item;

        tips.appendChild(li);


    });



    // Crack Time Estimate

    if(score <= 2){

        crackTime.innerHTML =
        "Estimated Crack Time: Few Seconds";

    }

    else if(score == 3){

        crackTime.innerHTML =
        "Estimated Crack Time: Few Hours";

    }

    else if(score == 4){

        crackTime.innerHTML =
        "Estimated Crack Time: Several Months";

    }

    else{

        crackTime.innerHTML =
        "Estimated Crack Time: Hundreds of Years";

    }


}



// Generate Strong Password

generateBtn.addEventListener("click", () => {


    let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";


    let newPassword = "";


    for(let i = 0; i < 12; i++){


        let index =
        Math.floor(Math.random() * chars.length);


        newPassword += chars[index];


    }


    password.value = newPassword;


    checkPassword();


});



// Dark Mode

themeBtn.addEventListener("click",()=>{


    document.body.classList.toggle("dark");


});



// Save Password Locally

password.addEventListener("input",()=>{


    localStorage.setItem(
        "savedPassword",
        password.value
    );


});



// Load Saved Password

window.onload = ()=>{


    let saved =
    localStorage.getItem("savedPassword");


    if(saved){


        password.value = saved;

        checkPassword();


    }


};