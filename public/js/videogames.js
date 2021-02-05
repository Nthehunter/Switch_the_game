window.onload = initialize;

function initialize() {

    const usuario = document.getElementById("user")
    const password = document.getElementById("pwd")
    const sel = document.getElementById("sel")
    const comment = document.getElementById("comment")

    var ref_Ads = firebase.database().ref().child("Ads")
    var ref_Users = firebase.database().ref().child("Users")

    const on_sale = document.getElementById("on_sale")
    const trade = document.getElementById("trade")

    const form = document.getElementById("form_videogames")

    const img = document.getElementById("img")
    var imgURL = ""

    var validate = ""

    storageRef = firebase.storage().ref();

    mostrarAds();

    form.addEventListener("submit", e => {

        e.preventDefault()

        let notSend = false

        if (readFirebase() != 1) {

            document.getElementById("error-user").style.display = "block";
            notSend = true
        }

        else {
            document.getElementById("error-user").style.display = "none";
        }

        if (readFirebase() != 1) {

            document.getElementById("error-password").style.display = "block";
            notSend = true
        }

        else {
            document.getElementById("error-password").style.display = "none";
        }

        if (sel.value == "Selecciona una categoría") {
            document.getElementById("error-sel").style.display = "block";
            notSend = true
        }


        else {
            document.getElementById("error-sel").style.display = "none";
        }

        if (comment.value.length < 25) {
            document.getElementById("error-comment").style.display = "block";
            notSend = true
        }

        else {
            document.getElementById("error-comment").style.display = "none";
        }

        if (!notSend) {
            subirImgFirebase()
            
            document.getElementById("add-check").style.display = "block";
        }
    })

    function readFirebase() {

        var total = 0

        ref_Users.on("value", function (snap) {
            var datos = snap.val();

            for (var key in datos) {

                var ref_users_name = firebase.database().ref().child("Users").child(key)


                ref_users_name.on("value", function (snap) {
                    var names = snap.val();

                    user_exists = false
                    password_exists = false

                    for (var UN in names) {

                        if (usuario.value == names[UN]) {
                            user_exists = true
                        }

                        if (password.value == names[UN]) {
                            password_exists = true
                        }

                    }

                    if (user_exists == true && password_exists == true) {
                        total = 1
                    }


                })

            }

        });

        return total
    }

    function addToFirebase(Url) {


        ref_Ads.push({
            Category: sel.value,
            Comment: comment.value,
            User_name: usuario.value,
            Img: img.files[0].name,
            Url: Url

        })

    }

    function mostrarAds() {
        ref_Ads.on("value", function (snap) {
            var datos = snap.val();
            var divs = "";
            trade.innerHTML = divs;
            on_sale.innerHTML = divs;

            for (var key in datos) {

                divs = ""

                console.log(datos[key].Category)

                divs += "<div class='container-fluid'>" + "<h2> Nombre de usuario: " + datos[key].User_name + "</h2>" + "<br>" + "<img class='img-fluid' src='" + datos[key].Url + "'/>" + "<h3>" + datos[key].Comment + "</h3>" + "<br>" + "<button class='btn btn-danger delete' data-ad='" + key + "'> <p> remove </p> </button>" + "<br><br>" + "</div>";

                if (datos[key].Category == "Intercambio") {
                    trade.innerHTML += divs;
                }

                if (datos[key].Category == "Venta") {
                    on_sale.innerHTML += divs;
                }
            }

            if (divs != "") {

                var borrar = document.getElementsByClassName("delete");
                for (var i = 0; i < borrar.length; i++) {

                    borrar[i].addEventListener("click", borrarAds, false);

                }
            }
        })
    }

    function subirImgFirebase() {
        var imagenASubir = img.files[0]
        var downloadURL = ""

        var uploadTask = storageRef.child("Imágenes/" + imagenASubir.name).put(imagenASubir)

        uploadTask.on('state_changed', 
        function (snapshot) {

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                addToFirebase(downloadURL)
            });
        });
    }

    function borrarAds() {

        checkIfUserIsLoggedIn()

        if (validate == "true"){
            var keyAdDelete = this.getAttribute("data-ad");
            var refAdD = ref_Ads.child(keyAdDelete);
    
            refAdD.remove();
        }

        else{
            console.log("No se borra")
            
        }
        
        
    }

    function checkIfUserIsLoggedIn() {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Hay usuario logueado")

                var validate_user = user.email

                console.log(user.email)
                console.log(validate_user)


                if (validate_user == "nthehunteryt@gmail.com") {
    
                    validate = "true"
    
                }
            }
            else {

                console.log(user.email)
                return 0
            }
        });
    }

}






