window.addEventListener("load", function(){
    //Traigo el formulario del register
    let formularioRegister = document.querySelector("form#register")
    formularioRegister.addEventListener("submit", function(event){

        //Traigo los input del formulario
        let nombre = document.querySelector("input#nombre")
        let apellido = document.querySelector("input#apellido")
        let email = document.querySelector("input#email")
        let password = document.querySelector("input#password")
        let confirmPassword = document.querySelector("input#confirmPassword")
        var fileInput = document.getElementById('customFileLang');

        //validaciones

        //REGISTER
        
        //nombre
        let nombreRegister = document.getElementById('nombreRegister');
        switch (true) {
            case (nombre.value == ""):
                event.preventDefault();
                nombreRegister.innerHTML = "Ingresa tu nombre"
                break;
            case (nombre.value.length<3):
              event.preventDefault();
                nombreRegister.innerHTML = "El nombre debe tener 3 caracteres o mas"
              break;
          }
          //apellido
          let apellidoRegister = document.getElementById('apellidoRegister');
          switch (true) {
            case (apellido.value == ""):
                event.preventDefault();
                apellidoRegister.innerHTML = "Ingresa tu apellido"
                break;
            case (apellido.value.length<3):
              event.preventDefault();
              apellidoRegister.innerHTML = "El apellido debe tener mas de 3 caracteres"
              break;
          }
          //email
          function ValidateEmail(){
            let email = document.getElementById("email").value
            var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if(email.match(pattern)){
                    return true;
                }
                else{
                    return false;
                }
          }
          let emailRegister = document.getElementById('emailRegister');
          switch (true) {
            case (email.value == ""):
                event.preventDefault();
                emailRegister.innerHTML = "Ingresa tu Email"
                break;
            case (ValidateEmail() == true):
              break;
              case (ValidateEmail() == false):
                event.preventDefault();
                emailRegister.innerHTML = "Ingresaste un email invalido"
              break;
          }
          //Contraseña
          let contraseñaRegister = document.getElementById('contraseñaRegister'); 
          switch (true) {
            case (password.value == ""):
                event.preventDefault();
                contraseñaRegister.innerHTML = "La contraseña no a sido ingresada"
                break;
            case (password.value.length<8):
                event.preventDefault();
                contraseñaRegister.innerHTML = "La contraseña debe tener 8 caracteres o mas"
              break;
          }
          //Confirmar contraseña
          if (password.value != confirmPassword.value){
            contraseñaConfirmError.innerHTML = "Las contraseñas no son iguales"
          }
          //imagen
          let avatarRegister = document.getElementById('avatarRegister'); 
          function validateFile(){
            var fileInput = document.getElementById('customFileLang');
            var filePath = fileInput.value;
            var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
                if(allowedExtensions.exec(filePath)){
                    return true
                }
                else{
                    return false
                }
            }
            switch (true) {
                case (validateFile() == true && fileInput.value != ''):
                    console.log('La imagen se subio correctamente');
                    break;
                case (validateFile() == false && fileInput.value != ''):
                    fileInput.value = '';
                    event.preventDefault();
                    avatarRegister.innerHTML = "Porfavor sube un archivo que tenga una de las suguiente extenciones .jpeg/.jpg/.png/.gif."
                    break;
            } 
    })
})

