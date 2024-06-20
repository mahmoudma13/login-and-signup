// variables declaration 
var userName = document.getElementById("user-name");
var userEmail = document.getElementById("user-email");
var userPassword = document.getElementById("user-password");
var errorMessage = document.getElementById("error-message");
var userData = [];

if(!localStorage.getItem("user-data")) {
    localStorage.setItem("user-data" , JSON.stringify(userData));
}else{
    userData = JSON.parse(localStorage.getItem("user-data"));
}

// signup function
function signUp(e){
    e.preventDefault();

    var signUpData = {
        name : userName.value,
        email : userEmail.value,
        password :  userPassword.value
    };

    if(validation()) {
        for (var user of userData) {
            if(user.email.toLowerCase() == userEmail.value.toLowerCase()) {
                errorMessage.style.visibility = "visible";
                errorMessage.innerHTML = "Your Email is already exist!";
                return;
            }
        }
        userData.push(signUpData);
        localStorage.setItem("user-data" , JSON.stringify(userData));
        window.location.replace("../page/signIn.html");
        errorMessage.style.visibility = "visible";
    } else{
        validation();
    }

}

// validation function

function validation(){

    var validation = {
        name : /^[a-zA-Z]{3,}/,
        email : /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/,
        password : /^[a-zA-Z0-9._-]{8,}/,
    }

    if (userName.value == "" || userEmail.value == "" || userPassword.value == "") {
        errorMessage.style.visibility = "visible";
        errorMessage.innerHTML = "Your Data Cannot be Empty !";
        return false;
    } else{
        if(!validation.name.test(userName.value)) {
            errorMessage.style.visibility = "visible";
            errorMessage.innerHTML = "Please Enter A valid Name Up To 3 Characters !";
            return false;
        } else if(!validation.email.test(userEmail.value)) {
            errorMessage.style.visibility = "visible";
            errorMessage.innerHTML = "Please Enter A valid Email Address !";
            return false;
        } else if(!validation.password.test(userPassword.value)) {
            errorMessage.style.visibility = "visible";
            errorMessage.innerHTML = "Please Enter A valid Password More Then 8 Characters !";
            return false;
        } else{
            errorMessage.style.visibility = "hidden";
            return true;
        }
    }
}