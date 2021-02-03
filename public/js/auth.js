window.onload = initialize;

function initialize(){


    checkIfUserIsLoggedIn();
}

function checkIfUserIsLoggedIn(){
    firebase.auth().onAuthStateChanged(function (user){
        if (user){

        }
        else {
            console.log("No hay usuario logueado")
        }
    });
}