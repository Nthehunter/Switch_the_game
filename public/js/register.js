

const usuario = document.getElementById("user")
const email = document.getElementById("email")
const password = document.getElementById("pwd")

const form = document.getElementById("form")
const warnings = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (usuario.value.lenght < 8 ){
        warnings += "El nombre es muy corto"
        entrar = true
    }
    
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido.`
        entrar = true
    }

    if(password.value.lenght < 8 ){
        warnings += `La contraseña no es valida.`
        entrar = true
    }

    if(entrar){
        warnings.innerHTML = warnings
    }
})