window.addEventListener("load", function () {
  //Formularios
  let formularioEdit = document.getElementById("editarProducto")
  let formularioAdd = document.getElementById("agregarProducto")
  //inputs Edit
  let tituloEdit = document.getElementById("titleEdit")
  let descripcionEdit = document.getElementById("descriptionEdit")
  let imagenEdit = document.getElementById('imagenEdit');
  //inputs Add
  let tituloAdd = document.getElementById("titleAdd")
  let descripcionAdd = document.getElementById("descriptionAdd")
  let imagenAdd = document.getElementById('imagenAdd')
  //expreciones regulares
  let regexFormat = /(\.jpg|\.jpeg|\.png|\.gif)$/i;


  //validaciones

  // Imagen avatar que sea de formato jpg jpeg png gif /ADD      
  function validateFileAdd() {
    var imagenAdd = document.getElementById('imagenAdd')
    var filePath = imagenAdd.value;
    if (regexFormat.exec(filePath)) {
      return true
    }
    else {
      return false
    }
  }
  // Imagen avatar que sea de formato jpg jpeg png gif /EDIT      
  function validateFileEdit() {
    var imagenEdit = document.getElementById('imagenEdit');
    var filePath = imagenEdit.value;
    if (regexFormat.exec(filePath)) {
      return true
    }
    else {
      return false
    }
  }
  //Validacion tiempo real imagen formulario ADD
  imagenAdd.addEventListener("change", function () {
    /* valida en tiempo real el imput de subir imagen avatar */
    if (validateFileAdd() == false && imagenAdd.value) {
      let errorImagenAdd = document.getElementById('errorImageAdd');
      imagenAdd.classList.add("is-invalid")
      errorImagenAdd.innerHTML = "Porfavor sube un archivo que tenga una de las suguiente extenciones .jpeg/.jpg/.png/.gif."
      errores = true
    } else {
      let errorImagenAdd = document.getElementById('errorImageAdd');
      imagenAdd.classList.remove("is-invalid")
      imagenAdd.classList.add("is-valid")
      errorImagenAdd.innerHTML = ""
    }
  })
  //Validacion tiempo real imagen formulario EDIT
  imagenEdit.addEventListener("change", function () {
    /* valida en tiempo real el imput de subir imagen avatar */
    if (validateFileEdit() == false && imagenEdit.value) {
      let errorImagenEdit = document.getElementById('errorImageEdit');
      imagenEdit.classList.add("is-invalid")
      errores = true
      errorImagenEdit.innerHTML = "Porfavor sube un archivo que tenga una de las suguiente extenciones .jpeg/.jpg/.png/.gif."
    } else {
      let errorImagenEdit = document.getElementById('errorImageEdit');
      imagenEdit.classList.remove("is-invalid")
      imagenEdit.classList.add("is-valid")
      errorImagenEdit.innerHTML = ""
    }
  })

  //FORMULARIO ADD
  formularioAdd.addEventListener("submit", function (event) {
    function validateInputsAdd() {
      let errores = true
      let errorTitulo = document.getElementById('errorTitle');
      let errorDescripcion = document.getElementById('errorDescription');
      /* tituloAdd */
      if (tituloAdd.value.length == "" || tituloAdd.value.length < 5) {
        errorTitulo.innerHTML = "*El titulo debe tener 5 carácteres o más"
        tituloAdd.classList.add("is-invalid")
        errores = true
      } else {
        tituloAdd.classList.remove("is-invalid")
        tituloAdd.classList.add("is-valid")
      }
      /* descripcionAdd */
      if (descripcionAdd.value.length == "" || descripcionAdd.value.length < 20) {
        errorDescripcion.innerHTML = "*Ingresa una descripción"
        descripcionAdd.classList.add("is-invalid")
        errores = true
      } else {
        descripcionAdd.classList.remove("is-invalid")
        descripcionAdd.classList.add("is-valid")
      }

    }
    console.log(validateInputsAdd());
    //titulo
    let errorTitulo = document.getElementById('errorTitle');
    switch (true) {
      case (tituloAdd.value == ""):
        event.preventDefault();
        errorTitulo.innerHTML = "*Ingresa un titulo"
        console.log("ingresa tu nombre")
        break;
      case (tituloAdd.value.length < 5):
        event.preventDefault();
        errorTitulo.innerHTML = "*El titulo debe tener 5 carácteres o más"
        console.log("al menos 5 caracteres")
        break;
      default:
        errorTitulo.innerHTML = ``
    }
    //descripcion
    let errorDescripcion = document.getElementById('errorDescription');
    switch (true) {
      case (descripcionAdd.value == ""):
        event.preventDefault();
        errorDescripcion.innerHTML = "*Ingresa una descripción"
        console.log("ingresa tu description")
        break;
      case (descriptionAdd.value.length < 20):
        event.preventDefault();
        errorDescripcion.innerHTML = "*La descripción debe tener 20 carácteres o más"
        console.log("al menos 20 caracteres")
        break;
      default:
        errorDescripcion.innerHTML = ``
    }
    //imagen
    let errorImagenAdd = document.getElementById('errorImageAdd');
    switch (true) {
      case (validateFileAdd() == true && imagenAdd.value != ''):
        errorImagenAdd.innerHTML = ``
        console.log('La imagen se subio correctamente');
        break;
      case (validateFileAdd() == false && imagenAdd.value != ''):
        /* fileInput.value = ''; */
        event.preventDefault();
        errorImagenAdd.innerHTML = "Porfavor sube un archivo que tenga una de las suguiente extenciones .jpeg/.jpg/.png/.gif."
        break;
      default:
        errorImagenAdd.innerHTML = ``
    }


  })

  //FORMULARIO EDIT

  formularioEdit.addEventListener("submit", function (event) {
    function validateInputsEdit() {
      let errores = true
      let errorTituloEdit = document.getElementById('errorTitleEdit');
      let errorDescriptionEdit = document.getElementById('errorDescriptionEdit');
      /* tituloEdit */
      if (tituloEdit.value.length == "" || tituloEdit.value.length < 5) {
        errorTituloEdit.innerHTML = "*El titulo debe tener 5 carácteres o más"
        tituloEdit.classList.add("is-invalid")
        errores = true
      } else {
        tituloEdit.classList.remove("is-invalid")
        tituloEdit.classList.add("is-valid")
      }
      /* descripcionEdit */
      if (descripcionEdit.value.length == "" || descripcionEdit.value.length < 20) {
        errorDescriptionEdit.innerHTML = "*Ingresa una descripción"
        descripcionEdit.classList.add("is-invalid")
        errores = true
      } else {
        descripcionEdit.classList.remove("is-invalid")
        descripcionEdit.classList.add("is-valid")
      }

    }
    console.log(validateInputsEdit());
    //tituloEdit
    let errorTituloEdit = document.getElementById('errorTitleEdit');
    switch (true) {
      case (tituloEdit.value == ""):
        event.preventDefault();
        errorTituloEdit.innerHTML = "*Ingresa un titulo"
        break;
      case (tituloEdit.value.length < 5):
        event.preventDefault();
        errorTituloEdit.innerHTML = "*El titulo debe tener 5 carácteres o más"
        break;
      default:
        errorTituloEdit.innerHTML = ``
    }
    //descriptionEdit
    let errorDescriptionEdit = document.getElementById('errorDescriptionEdit');
    switch (true) {
      case (descripcionEdit.value == ""):
        event.preventDefault();
        errorDescriptionEdit.innerHTML = "*Ingresa una descripción"
        break;
      case (descripcionEdit.value.length < 20):
        event.preventDefault();
        errorDescriptionEdit.innerHTML = "*La descripción debe tener 20 carácteres o más"
        break;
      default:
        errorDescriptionEdit.innerHTML = ``
    }
    //imagen
    let errorImagenEdit = document.getElementById('errorImageEdit');
    switch (true) {
      case (validateFileEdit() == true && imagenEdit.value != ''):
        errorImagenEdit.innerHTML = " "
        console.log('La imagen se subio correctamente');
        break;
      case (validateFileEdit() == false && imagenEdit.value != ''):
        /* fileInput.value = ''; */
        event.preventDefault();
        errorImagenEdit.innerHTML = "Porfavor sube un archivo que tenga una de las suguiente extenciones .jpeg/.jpg/.png/.gif."
        break;
      default:
        errorImagenEdit.innerHTML = " "
    }
  })
})