// variables declaration 
var userEmail = document.getElementById("user-email");
var userPassword = document.getElementById("user-password");
var errorMessage = document.getElementById("error-message");
var userData = [];

if(!localStorage.getItem("user-data")) {
    localStorage.setItem("user-data" , JSON.stringify(userData));
}else{
    userData = JSON.parse(localStorage.getItem("user-data"));
    
}

// login function
function login(e){
    e.preventDefault();

    if(validation()) {
        for (var user of userData) {
            if(user.email.toLowerCase() == userEmail.value.toLowerCase()) {
             // if the data correct login the user
                if(user.password === userPassword.value) {
                    localStorage.setItem("textHome", JSON.stringify(user.name));
                    window.location.replace("../index.html");
                    return;
                } else {
                    errorMessage.style.visibility = "visible";
                    errorMessage.innerHTML = "Your password or email is incorrect !";
                }
                return;
            }
        }
        errorMessage.style.visibility = "visible";
        errorMessage.innerHTML = `
            <div class="login-text m-0 p-0 text-mute">
                You do not have an account you can create from here
                <a href="../page/signUp.html" class="ms-3" style="color: #c81e1e; text-decoration: none; font-weight: bold;" >Sign Up</a>
            </div>
            `;
    } else{
        validation();
    }

}

// validation function
function validation(){

    var validation = {
        email : /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/,
        password : /^[a-zA-Z0-9._-]{8,}/,
    }

    if (userEmail.value == "" || userPassword.value == "") {
        errorMessage.style.visibility = "visible";
        errorMessage.innerHTML = "Your Data Cannot be Empty !";
        return false;
    } else{
        if(!validation.email.test(userEmail.value)) {
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