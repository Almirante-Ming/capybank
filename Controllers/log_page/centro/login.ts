function login(usr, pwd) {
    usr= document.getElementById('usr').value;
    pwd =document.getElementById('pwd').value;

    if (usr == "admin" && pwd == "admin") {
        window.location.href = "/log_page/centro/dashboard.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}