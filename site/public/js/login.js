window.addEventListener("load", function(){
//LOGIN
   //Traigo el formulario del login
   let formulariologin = document.querySelector("form#login") 
   //Traigo los inputs del formulario
   let emailLogin = document.querySelector("input#exampleInputEmail1")
   let passwordLogin = document.querySelector("input#exampleInputPassword1")
   /* expreciones regulares */
   let regEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

   /* funciones validators */
           //email
           function ValidateEmail(){
            let email = document.getElementById("exampleInputEmail1").value
                if(email.match(regEmail)){
                    return true;
                }
                else{
                    return false;
                }
          }


    // consultas a la base de datos
    fetch("http://localhost:8080/api/users")
    .then(respuesta => respuesta.json())
    .then(data => {
        let usuarios=data.usuarios  
        /* validacion que no se repita mail */         
        emailLogin.addEventListener("keyup", function(e){
            emailLoginError.innerHTML = ""
            e.preventDefault()          
            
            setTimeout(function(){  
                
                let  emailRegistrado = []
                if (emailRegistrado == ""){
                    emailLogin.classList.remove("is-valid")
                    emailLogin.classList.add("is-invalid")
                    emailLoginError.innerHTML = `Debe ingresar un mail registrado <br>
                    Ingresa <a href="/users/register" > Aca</a> para registrarte`
                }
                usuarios.forEach(usuario => {
                        console.log(emailRegistrado);
                    if(emailLogin.value === usuario.email){
                        emailRegistrado.push(emailLogin.value)
                        if(emailRegistrado != []){
                            emailLogin.classList.remove("is-invalid")
                            emailLogin.classList.add("is-valid")
                            emailLoginError.innerHTML = ""
                        }
                    }         
                })
            }, 0)
        }) 
        })

                        /* EVENTOS */

////////////////////////////////////////////////////////////////////////////
///////////KEYUP EVENTS
////////////////////////////////////////////////////////////////////////////

passwordLogin.addEventListener("keyup", function () {
    function validateInputs() {
        let errores = true
                //Contraseña
                if (passwordLogin.value.length =="" || passwordLogin.value.length < 8){
                    passwordLoginError.innerHTML = `debe ingresar una contraseña de al menos 8 caracteres`
                    passwordLogin.classList.add("is-invalid")
                    errores = true
                }else{
                    passwordLogin.classList.remove("is-invalid")
                    passwordLogin.classList.add("is-valid")
                    passwordLoginError.innerHTML = ``
                }
            }
            console.log(validateInputs());
})

////////////////////////////////////////////////////////////////////////////
////////////////////SUBMIT EVENTS
////////////////////////////////////////////////////////////////////////////
       
    formulariologin.addEventListener("submit", function(event){
            let emailLoginError = document.getElementById('emailLoginError');
            switch (true) {
            case (emailLogin.value == ""):
                event.preventDefault();
                emailLoginError.innerHTML = "Ingresa tu Email"
                break;
/*             case (ValidateEmail() == true):
              break; */
            case (ValidateEmail() == false):
                event.preventDefault();
                emailLoginError.innerHTML = "Ingresaste un email invalido"
              break;
            default:
                emailLoginError.innerHTML = ``
        }
            //Contraseña
            let contraseñaLoginError = document.getElementById('passwordLoginError'); 
            switch (true) {
                case (passwordLogin.value == ""):
                event.preventDefault();
                contraseñaLoginError.innerHTML = "La contraseña no a sido ingresada"
                    break;
                case (passwordLogin.value.length<8):
                event.preventDefault();
                contraseñaLoginError.innerHTML = "La contraseña debe tener 8 caracteres o mas"
                    break;
                default:
                    contraseñaLoginError.innerHTML = ``
          }
    })



})
