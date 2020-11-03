window.addEventListener("load", function () {
  //PRODUCTS ADD
  let formularioAdd = document.getElementById("agregarProducto")
  //inputs Add
  let tituloAdd = document.getElementById("titleAdd")
  let descripcionAdd = document.getElementById("descriptionAdd")
  let imagenAdd = document.getElementById('imagenAdd')
  let precioAdd = document.getElementById('precioAdd')
  let descuentoAdd = document.getElementById('descuentoAdd')
  let stockAdd = document.getElementById('stockAdd')
  let option = document.getElementById('opt')
  let select=document.getElementById('exampleFormControlInput1')
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

////////////////////////////////////////////////////////////////////////////
/////////KEYUP EVENTS
////////////////////////////////////////////////////////////////////////////
formularioAdd.addEventListener("keyup",function(){
  function validateInputsAdd() {
    let errores = true
    /* titulo */
    let errorTitulo = document.getElementById('errorTitle');
    if (tituloAdd.value.length == "" || tituloAdd.value.length < 5) {
      errorTitulo.innerHTML = "*El titulo debe tener 5 carácteres o más"
      tituloAdd.classList.add("is-invalid")
      errores = true
    } else {
      tituloAdd.classList.remove("is-invalid")
      tituloAdd.classList.add("is-valid")
      errorTitulo.innerHTML = ""
    }
    /* descripcion */
    let errorDescripcion = document.getElementById('errorDescription');
    if (descripcionAdd.value.length == "" || descripcionAdd.value.length < 20) {
      errorDescripcion.innerHTML = "*Ingresa una descripción"
      descripcionAdd.classList.add("is-invalid")
      errores = true
    } else {
      descripcionAdd.classList.remove("is-invalid")
      descripcionAdd.classList.add("is-valid")
      errorDescripcion.innerHTML = ""
    }
    /* precio */
    let errorPrecio = document.getElementById('errorPrecio');
    if (precioAdd.value.length == "" || precioAdd.value  < 0) {
      errorPrecio.innerHTML = "*Ingresa una precio"
      precioAdd.classList.add("is-invalid")
      errores = true
    } else {
      precioAdd.classList.remove("is-invalid")
      precioAdd.classList.add("is-valid")
      errorPrecio.innerHTML = ""
    }
    /* descuento */
        let errorDescuento = document.getElementById('errorDescuento');
        if (descuentoAdd.value.length == "" || descuentoAdd.value  < 0) {
          errorDescuento.innerHTML = "*Ingresa una descuento"
          descuentoAdd.classList.add("is-invalid")
          errores = true
        } else {
          descuentoAdd.classList.remove("is-invalid")
          descuentoAdd.classList.add("is-valid")
          errorDescuento.innerHTML = ""
        }
    /* stock */
    let errorStock = document.getElementById('errorStock');
    if (stockAdd.value.length == "" || stockAdd.value  < 0) {
      errorStock.innerHTML = "*Ingresa el stock"
      stockAdd.classList.add("is-invalid")
      errores = true
    } else {
      stockAdd.classList.remove("is-invalid")
      stockAdd.classList.add("is-valid")
      errorStock.innerHTML = ""
    }        

    



  }
  console.log(validateInputsAdd());
})

////////////////////////////////////////////////////////////////////////////
//////////////////CHANGE EVENTS
////////////////////////////////////////////////////////////////////////////
  //Validacion tiempo real imagen formulario ADD
  imagenAdd.addEventListener("change", function () {
    /* valida en tiempo real el imput de subir imagen avatar */
    /* imagen */
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

    /* categorias */
/*     let errorCategoria = document.getElementById("errorCategoria");
    if(option.value == null){
      console.log("asd");
      errorCategoria.innerHTML = "*Ingresa una descripción"
      select.classList.add("is-invalid")
    } */


  })

////////////////////////////////////////////////////////////////////////////
////////////////////////////SUBMIT EVENTS
////////////////////////////////////////////////////////////////////////////
  formularioAdd.addEventListener("submit", function (event) {

    //titulo
    let errorTitulo = document.getElementById('errorTitle');
    switch (true) {
      case (tituloAdd.value == ""):
        event.preventDefault();
        errorTitulo.innerHTML = "*Ingresa un titulo"
        tituloAdd.classList.add("is-invalid")
        
        break;
      case (tituloAdd.value.length < 5):
        event.preventDefault();
        errorTitulo.innerHTML = "*El titulo debe tener 5 carácteres o más"
        
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
        descripcionAdd.classList.add("is-invalid")
        
        break;
      case (descriptionAdd.value.length < 20):
        event.preventDefault();
        errorDescripcion.innerHTML = "*La descripción debe tener 20 carácteres o más"
        
        break;
      default:
        errorDescripcion.innerHTML = ``
    }
    //imagen
    let errorImagenAdd = document.getElementById('errorImageAdd');
    switch (true) {
      case (validateFileAdd() == true && imagenAdd.value != ''):
        errorImagenAdd.innerHTML = ``
        break;
      case (validateFileAdd() == false && imagenAdd.value != ''):
        /* fileInput.value = ''; */
        event.preventDefault();
        errorImagenAdd.innerHTML = "Porfavor sube un archivo que tenga una de las suguiente extenciones .jpeg/.jpg/.png/.gif."
        break;
      default:
        errorImagenAdd.innerHTML = ``
    }
    //precio
    let errorPrecio = document.getElementById('errorPrecio');
    switch (true) {
      case (precioAdd.value == ""):
        event.preventDefault();
        errorPrecio.innerHTML = "*Ingresa un precio" 
        precioAdd.classList.add("is-invalid")  
        break;
      default:
        errorPrecio.innerHTML = ``
    }
        //descuento
        let errorDescuento = document.getElementById('errorDescuento');
        switch (true) {
          case (descuentoAdd.value == ""):
            event.preventDefault();
            errorDescuento.innerHTML = "*Ingresa un Descuento"   
            descuentoAdd.classList.add("is-invalid")  
            break;
          default:
            errorDescuento.innerHTML = ``
        }
    //stock
    let errorStock = document.getElementById('errorStock');
    switch (true) {
      case (stockAdd.value == ""):
        event.preventDefault();
        errorStock.innerHTML = "*Ingresa un stock" 
        stockAdd.classList.add("is-invalid")   
        break;
      default:
        errorStock.innerHTML = ``
    }



  })


})