window.onload = initialize;



function initialize(){

    const form = document.getElementById("formLog")

    form.addEventListener("submit", autentificar, false);


    checkIfUserIsLoggedIn();
}

function autentificar(event){
    event.preventDefault()
    var email = event.target.email.value
    var password = event.target.password.value

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result){
        console.log("Sesión iniciada")
        document.getElementById("login-check").style.display = "block";
    })
    .catch (function (error){

        console.log("Hubo un error") 

    });
}


function checkIfUserIsLoggedIn(){
    firebase.auth().onAuthStateChanged(function (user){
        if (user){
            console.log("Hay usuario logueado")
            var user = firebase.auth().currentUser;
            console.log(user.email)
        }
        else {
            console.log("No hay usuario logueado")
        }
    });
}