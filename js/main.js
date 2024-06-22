var userName = document.getElementById("user-name");

if (localStorage.getItem("textHome")) {
    userName.innerHTML = JSON.parse(localStorage.getItem("textHome"));
} else {
    window.location.replace("../page/signIn.html");
}
