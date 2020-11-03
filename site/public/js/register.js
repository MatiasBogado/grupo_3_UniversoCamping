window.addEventListener("load", function () {
    //REGISTER
    //Traigo el formulario del register
    let formularioRegister = document.querySelector("form#register")
    //Traigo los input del formulario
    let nombre = document.querySelector("input#nombre")
    let apellido = document.querySelector("input#apellido")
    let email = document.querySelector("input#email")
    let password = document.querySelector("input#password")
    let confirmPassword = document.querySelector("input#confirmPassword")
    var fileInput = document.getElementById('customFileLang');
    let selectArchivo = document.getElementById("selectArchivo")
    let checkBox = document.getElementById("exampleCheck1")
    /* expreciones regulares */
    let regexEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let regexFormat = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    //////* funciones validators *//////

    /* Email que sea un mail verdadero */
    function ValidateEmail() {
        let emailValue = document.getElementById("email").value
        if (emailValue.match(regexEmail)) {
            return true;
        }
        else {
            return false;
        }
    }
    /* Imagen avatar que sea de formato jpg jpeg png gif */
    function validateFile() {
        var fileInput = document.getElementById('customFileLang');
        var filePath = fileInput.value;
        if (regexFormat.exec(filePath)) {
            return true
        }
        else {
            return false
        }
    }
    /* consultas a la de base de datos */

    fetch("http://localhost:8080/api/users")
        .then(respuesta => respuesta.json())
        .then(data => {
            let usuarios = data.usuarios
            /* validacion que no se repita mail */
            email.addEventListener("keyup", function (e) {
                e.preventDefault()
                emailRegister.innerHTML = ""
                setTimeout(function () {
                    usuarios.forEach(usuario => {
                        if (email.value == usuario.email) {
                            emailRegister.innerHTML = "El email ya está en uso"
                            email.classList.remove("is-valid")
                            email.classList.add("is-invalid")
                        }
                    })
                }, 0)
            })
        })


    ///////* EVENTOS *///////       
    ////////////////////////////////////////////////////////////////////////////
    /// CHANGE EVENTS
    ////////////////////////////////////////////////////////////////////////////  

    fileInput.addEventListener("change", function () {
        /* muestra el texto de la foto que se elige para subir de avatar  */
        var imagenAvatar = fileInput.files[0].name;
        selectArchivo.innerHTML = imagenAvatar.substring(0, 20) + "...";

        /* valida en tiempo real el imput de subir imagen avatar */
        if (validateFile() == false && fileInput.value) {
            let avatarRegister = document.getElementById('avatarRegister');
            avatarRegister.innerHTML = "Porfavor sube un archivo que tenga una de las suguiente extenciones .jpeg/.jpg/.png/.gif."
            fileInput.classList.add("is-invalid")
            errores = true
        } else {
            let avatarRegister = document.getElementById('avatarRegister');
            fileInput.classList.remove("is-invalid")
            fileInput.classList.add("is-valid")
            avatarRegister.innerHTML = ``
        }



    })


    ////////////////////////////////////////////////////////////////////////////
    ///////////////KEYUP EVENTS
    ////////////////////////////////////////////////////////////////////////////

    formularioRegister.addEventListener("keyup", function () {
        /* validaciones en tiempo real valido o invalido */
        function validateInputs() {
            let errores = true
            /* nombre */
            if (nombre.value.length == "" || nombre.value.length < 3) {
                nombreRegister.innerHTML = `debe ingresar un nombre de al menos 3 caracteres`
                nombre.classList.add("is-invalid")
                errores = true
            } else {
                nombre.classList.remove("is-invalid")
                nombre.classList.add("is-valid")
                nombreRegister.innerHTML = ``
            }
            /* apellido */
            if (apellido.value.length == "" || apellido.value.length < 3) {
                apellidoRegister.innerHTML = `debe ingresar un apellido de al menos 3 caracteres`
                apellido.classList.add("is-invalid")
                errores = true
            } else {
                apellido.classList.remove("is-invalid")
                apellido.classList.add("is-valid")
                apellidoRegister.innerHTML = ``
            }
            /* email */
            if (email.value.length == "" || ValidateEmail() == false) {
                emailRegister.innerHTML = `debe ingresar un mail verdadero`
                email.classList.add("is-invalid")
                errores = true
            } else {
                email.classList.remove("is-invalid")
                email.classList.add("is-valid")
            }
            //Contraseña
            if (password.value.length == "" || password.value.length < 8) {
                contraseñaRegister.innerHTML = `debe ingresar una contraseña de al menos 8 caracteres`
                password.classList.add("is-invalid")
                errores = true
            } else {
                password.classList.remove("is-invalid")
                password.classList.add("is-valid")
                contraseñaRegister.innerHTML = ``
            }
            //Confirmar contraseña
            if (confirmPassword.value.length == "" || password.value != confirmPassword.value) {
                contraseñaConfirmError.innerHTML = `las contraseñas deben coincidir`
                confirmPassword.classList.add("is-invalid")
                errores = true
            } else {
                confirmPassword.classList.remove("is-invalid")
                confirmPassword.classList.add("is-valid")
                contraseñaConfirmError.innerHTML = ``
            }
        }
        console.log(validateInputs());
    })

    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////SUBMIT EVENTS
    ////////////////////////////////////////////////////////////////////////////

    formularioRegister.addEventListener("submit", function (event) {
        /* validaciones al querer enviar el formulario */

        //nombre
        let nombreRegister = document.getElementById('nombreRegister');
        switch (true) {
            case (nombre.value == ""):
                event.preventDefault();
                nombreRegister.innerHTML = "Ingresa tu nombre"
                nombre.classList.add("is-invalid")
                break;
            case (nombre.value.length < 3):
                event.preventDefault();
                nombreRegister.innerHTML = "El nombre debe tener 3 caracteres o más"
                nombre.classList.add("is-invalid")
                break;
            default:
                nombreRegister.innerHTML = ``
        }
        //apellido
        let apellidoRegister = document.getElementById('apellidoRegister');
        switch (true) {
            case (apellido.value == ""):
                event.preventDefault();
                apellidoRegister.innerHTML = "Ingresa tu apellido"
                apellido.classList.add("is-invalid")
                break;
            case (apellido.value.length < 3):
                event.preventDefault();
                apellidoRegister.innerHTML = "El apellido debe tener mas de 3 caracteres"
                apellido.classList.add("is-invalid")
                break;
            default:
                apellidoRegister.innerHTML = ``

        }
        //email
        let emailRegister = document.getElementById('emailRegister');
        switch (true) {
            case (email.value == ""):
                event.preventDefault();
                emailRegister.innerHTML = "Ingresa tu Email"
                break;
            /* case (ValidateEmail() == true):
              break; */
            case (ValidateEmail() == false):
                event.preventDefault();
                emailRegister.innerHTML = "Ingresaste un email invalido"
                break;

            default:
                emailRegister.innerHTML = ``
        }
        //Contraseña
        let contraseñaRegister = document.getElementById('contraseñaRegister');
        switch (true) {
            case (password.value == ""):
                event.preventDefault();
                contraseñaRegister.innerHTML = "Ingresa una contraseña"
                break;
            case (password.value.length < 8):
                event.preventDefault();
                contraseñaRegister.innerHTML = "La contraseña debe tener 8 caracteres o más"
                break;
            default:
                contraseñaRegister.innerHTML = ``
        }
        //Confirmar contraseña
        switch (true) {
            case (confirmPassword.value == ""):
                event.preventDefault();
                contraseñaConfirmError.innerHTML = "Debe repetir su contraseña"
                break;
            case (password.value != confirmPassword.value):
                event.preventDefault();
                contraseñaConfirmError.innerHTML = "Las contraseñas no son iguales"
                break;
            default:
                contraseñaConfirmError.innerHTML = ``
                break;
        }
        //imagen
        let avatarRegister = document.getElementById('avatarRegister');
        switch (true) {
            case (validateFile() == true && fileInput.value != ''):
                console.log('La imagen se subio correctamente');
                break;
            case (validateFile() == false && fileInput.value != ''):
                /* fileInput.value = ''; */
                event.preventDefault();
                avatarRegister.innerHTML = "Porfavor sube un archivo que tenga una de las suguiente extenciones .jpeg/.jpg/.png/.gif."
                break;
            default:
                avatarRegister.innerHTML = ``
        }
        /* checkbox */
        /*             let checkRegister = document.getElementById("checkRegister")
                    switch (true) {
                        case (checkBox.value != "acepto"):
                            checkRegister.innerHTML =`qqqqqqq`
                            break;
                        case (checkBox.value == "acepto"):
                                checkRegister.innerHTML =`ccccccccccc`
                                break;
                        default:
                            checkRegister.innerHTML =``
                            break;
                    } */
    })







})



