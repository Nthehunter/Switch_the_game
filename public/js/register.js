window.onload = initialize;

function initialize() {

    const usuario = document.getElementById("user")
    const email = document.getElementById("email")
    const password = document.getElementById("pwd")
    const password_cp = document.getElementById("pwd_cp")
    const tlf = document.getElementById("tlf")
    const sel = document.getElementById("sel")
    const terms = document.getElementById("terms")
    const video_yes = document.getElementById("Yes")
    const video_yes_but = document.getElementById("Yes_but")

    var ref_Users = firebase.database().ref().child("Users")


    const form = document.getElementById("form")

    form.addEventListener("submit", e => {
        
        e.preventDefault()

        let notSend = false
        let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        console.log(readFirebase().value)

        if (usuario.value.length < 8 || readFirebase() == 1) {
            document.getElementById("error-user").style.display = "block";
            notSend = true
            
        }

        else {
            document.getElementById("error-user").style.display = "none";
        }

        if (!regexEmail.test(email.value) || readFirebase() == 2) {
            document.getElementById("error-email").style.display = "block";
            notSend = true
        }

        else {
            document.getElementById("error-email").style.display = "none";
        }

        if (password.value.length <= 8) {
            document.getElementById("error-password").style.display = "block";
            notSend = true
        }

        else {
            document.getElementById("error-password").style.display = "none";
        }

        if (password_cp.value != password.value) {
            document.getElementById("error-passwordCP").style.display = "block";
            notSend = true
        }

        else {
            document.getElementById("error-passwordCP").style.display = "none";
        }

        if (tlf.value.length != 8 || readFirebase() == 3 || tlf.value < 50000000 || tlf.value > 100000000) {
            document.getElementById("error-tlf").style.display = "block";
            notSend = true
        }

        else {
            document.getElementById("error-tlf").style.display = "none";
        }

        if (sel.value == "Selecciona una provincia") {
            document.getElementById("error-prv").style.display = "block";
            notSend = true
        }


        else {
            document.getElementById("error-prv").style.display = "none";
        }

        if (!terms.checked == true) {
            document.getElementById("error-terms").style.display = "block";
            notSend = true
        }

        else {
            document.getElementById("error-terms").style.display = "none";
        }

        if(!video_yes.checked == true && !video_yes_but.checked == true){
            document.getElementById("error-radio").style.display = "block";
        }

        else{
            document.getElementById("error-radio").style.display = "none";
        }


        if (!notSend) {
            addToFirebase();
            alert("Usuario creado!.")
        }



    })

    function addToFirebase() {

        ref_Users.push({
            Email: email.value,
            Number: tlf.value,
            Password: password.value,
            Province: sel.value,
            Terms: terms.value,
            User_name: usuario.value
        })

    }

    function readFirebase(){

        var error_user = 0
        var error_email = 0
        var error_tlf = 0

        var error_total = 0

        ref_Users.on("value", function(snap){
            var datos = snap.val();
            

            for(var key in datos){
                var ref_users_name = firebase.database().ref().child("Users").child(key)
                
                ref_users_name.on("value", function(snap){
                    var names = snap.val();

                    for(var UN in names ){

                        if(usuario.value == names[UN]){
                            error_user = 1
                            console.log(names[UN])
                            
                        }

                        if(email.value == names[UN]){
                            error_email = 1
                            
                        }

                        if(tlf.value == names[UN]){
                            error_tlf = 1
                            
                        }

                    }
                })
            }

        });

        if(error_user == 1){
            error_total = 1
        }

        if(error_email == 1){
            error_total = 2
        }

        if(error_tlf == 1){
            error_total = 3
        }

        console.log(error_total + "TOTAL ERRORES")

        return error_total
    }

}