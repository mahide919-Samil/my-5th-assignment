function login(){
    let user = document.getElementById("username").value
    let password = document.getElementById("password").value
if (user === "admin" && password === "admin123" ){
    // alert("login successful")
    window.location.href="dashboard.html"
}
else{
    alert("wrong id and password")
}

}