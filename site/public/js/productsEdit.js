window.addEventListener("load", function () {
    //PRODUCTS EDIT

                        /* FORMULARIO */
    let formularioEdit = document.getElementById("editarProducto")
      //inputs
    let tituloEdit = document.getElementById("titleEdit")
    let descripcionEdit = document.getElementById("descriptionEdit")
    let imagenEdit = document.getElementById('imagenEdit');
    let precioEdit = document.getElementById('precioEdit')
    let descuentoEdit = document.getElementById('descuentoEdit')
    let stockEdit = document.getElementById('stockEdit')
    let guardarBtn = document.getElementById('guardar')
    let cancelarBtn = document.getElementById('cancelar')
      //expreciones regulares
    let regexFormat = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      /* FUNCIONES */
    // Imagen avatar que sea de formato jpg jpeg png gif  
  function validateFileEdit() {
    let imagenEdit = document.getElementById('imagenEdit');
    let filePath = imagenEdit.value;
    if (regexFormat.exec(filePath)) {
      return true
    }
    else {
      return false
    }
  }
////////////////////////////////////////////////////////////////////////////
/////Click EVENTS
////////////////////////////////////////////////////////////////////////////
formularioEdit.addEventListener("click",function(){
   /* FAlta editar confirms de guardar y eliminar */
})
////////////////////////////////////////////////////////////////////////////
/////////KEYUP EVENTS
////////////////////////////////////////////////////////////////////////////
formularioEdit.addEventListener("keyup",function(){
    function validateInputsEdit() {
        let errores = true
        /* tituloEdit */
        let errorTituloEdit = document.getElementById('errorTitleEdit');
        if (tituloEdit.value.length == "" || tituloEdit.value.length < 5) {
          errorTituloEdit.innerHTML = "*El titulo debe tener 5 carácteres o más"
          tituloEdit.classList.add("is-invalid")
          errores = true
        } else {
          tituloEdit.classList.remove("is-invalid")
          tituloEdit.classList.add("is-valid")
        }
        /* descripcionEdit */
        let errorDescriptionEdit = document.getElementById('errorDescriptionEdit');
        if (descripcionEdit.value.length == "" || descripcionEdit.value.length < 20) {
          errorDescriptionEdit.innerHTML = "*Ingresa una descripción"
          descripcionEdit.classList.add("is-invalid")
          errores = true
        } else {
          descripcionEdit.classList.remove("is-invalid")
          descripcionEdit.classList.add("is-valid")
        }
            /* precio */
    let errorPrecioEdit = document.getElementById('errorPrecioEdit');
    if (precioEdit.value.length == "" || precioEdit.value  < 0) {
        errorPrecioEdit.innerHTML = "*Ingresa una precio"
        precioEdit.classList.add("is-invalid")
      errores = true
    } else {
        precioEdit.classList.remove("is-invalid")
      precioEdit.classList.add("is-valid")
      errorPrecioEdit.innerHTML = ""
    }
    /* descuento */
        let errorDescuentoEdit = document.getElementById('errorDescuentoEdit');
        if (descuentoEdit.value.length == "" || descuentoEdit.value  < 0) {
            errorDescuentoEdit.innerHTML = "*Ingresa una descuento"
            descuentoEdit.classList.add("is-invalid")
          errores = true
        } else {
            descuentoEdit.classList.remove("is-invalid")
          descuentoEdit.classList.add("is-valid")
          errorDescuentoEdit.innerHTML = ""
        }
    /* stock */
    let errorStockEdit = document.getElementById('errorStockEdit');
    if (stockEdit.value.length == "" || stockEdit.value  < 0) {
        errorStockEdit.innerHTML = "*Ingresa el stock"
        stockEdit.classList.add("is-invalid")
      errores = true
    } else {
        stockEdit.classList.remove("is-invalid")
        stockEdit.classList.add("is-valid")
      errorStockEdit.innerHTML = ""
    }    
  
      }
      console.log(validateInputsEdit());
   
})

////////////////////////////////////////////////////////////////////////////
//////////////////CHANGE EVENTS
////////////////////////////////////////////////////////////////////////////
  //Validacion tiempo real imagen formulario 
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

      //FORMULARIO EDIT


  })

////////////////////////////////////////////////////////////////////////////
////////////////////////////SUBMIT EVENTS
////////////////////////////////////////////////////////////////////////////
  formularioEdit.addEventListener("submit", function (event) {
     
    
    //tituloEdit
    let errorTituloEdit = document.getElementById('errorTitleEdit');
    switch (true) {
      case (tituloEdit.value == ""):
        event.preventDefault();
        errorTituloEdit.innerHTML = "*Ingresa un titulo"
        tituloEdit.classList.remove("is-valid")
        tituloEdit.classList.add("is-invalid")
        break;
      case (tituloEdit.value.length < 5):
        event.preventDefault();
        errorTituloEdit.innerHTML = "*El titulo debe tener 5 carácteres o más"
        tituloEdit.classList.remove("is-valid")
        tituloEdit.classList.add("is-invalid")
        break;
      default:
        errorTituloEdit.innerHTML = ``
        tituloEdit.classList.add("is-valid")
    }
    //descriptionEdit
    let errorDescriptionEdit = document.getElementById('errorDescriptionEdit');
    switch (true) {
      case (descripcionEdit.value == ""):
        event.preventDefault();
        errorDescriptionEdit.innerHTML = "*Ingresa una descripción"
        descripcionEdit.classList.remove("is-valid")
        descripcionEdit.classList.add("is-invalid")
        break;
      case (descripcionEdit.value.length < 20):
        event.preventDefault();
        errorDescriptionEdit.innerHTML = "*La descripción debe tener 20 carácteres o más"
        descripcionEdit.classList.remove("is-valid")
        descripcionEdit.classList.add("is-invalid")
        break;
      default:
        errorDescriptionEdit.innerHTML = ``
        descripcionEdit.classList.add("is-valid")
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
        errorImagenEdit.innerHTML = ""
    }

     /* precio */
    let errorPrecioEdit = document.getElementById('errorPrecioEdit');
        if (precioEdit.value.length == "" || precioEdit.value  < 0) {
          event.preventDefault();
        errorPrecioEdit.innerHTML = "*Ingresa una precio"
        precioEdit.classList.add("is-invalid")
        errores = true
        } else {
        precioEdit.classList.remove("is-invalid")
        precioEdit.classList.add("is-valid")
        errorPrecioEdit.innerHTML = ""
        }
    /* descuento */
        let errorDescuentoEdit = document.getElementById('errorDescuentoEdit');
        if (descuentoEdit.value.length == "" || descuentoEdit.value  < 0) {
             event.preventDefault();
            errorDescuentoEdit.innerHTML = "*Ingresa una descuento"
            descuentoEdit.classList.add("is-invalid")
            errores = true
        } else {
            descuentoEdit.classList.remove("is-invalid")
            descuentoEdit.classList.add("is-valid")
            errorDescuentoEdit.innerHTML = ""
            }
    /* stock */
        let errorStockEdit = document.getElementById('errorStockEdit');
        if (stockEdit.value.length == "" || stockEdit.value  < 0) {
             event.preventDefault();
            errorStockEdit.innerHTML = "*Ingresa el stock"
            stockEdit.classList.add("is-invalid")
          errores = true
        } else {
            stockEdit.classList.remove("is-invalid")
            stockEdit.classList.add("is-valid")
          errorStockEdit.innerHTML = ""
        }  
  })



  

})