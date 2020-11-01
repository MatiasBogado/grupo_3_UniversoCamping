window.addEventListener("load", function(){
    //Traigo el formulario del register

   //Traigo el formulario del login
    let formulariologin = document.querySelector("form#login")    
    formulariologin.addEventListener("submit", function(event){
        let emailLogin = document.querySelector("input#exampleInputEmail1")
        let passwordLogin = document.querySelector("input#exampleInputPassword1")
        //email
        function ValidateEmail(){
            let email = document.getElementById("exampleInputEmail1").value
            var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if(email.match(pattern)){
                    return true;
                }
                else{
                    return false;
                }
          }
            let emailLoginError = document.getElementById('emailLoginError');
            switch (true) {
            case (emailLogin.value == ""):
                event.preventDefault();
                emailLoginError.innerHTML = "Ingresa tu Email"
                break;
            case (ValidateEmail() == true):
              break;
            case (ValidateEmail() == false):
                event.preventDefault();
                emailLoginError.innerHTML = "Ingresaste un email invalido"
              break;
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
          }
    })

})

