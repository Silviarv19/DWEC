function cambiarImagenPrincipal(indice){
    //Selecciona todas las imágenes con la clase miniatura y guárdalas en una NodeList
    const miniaturas = document.querySelectorAll('.miniatura')

    //Usa el índice recibido para acceder a la miniatura correcta dentro de la NodeList
    const imagenMiniatura = miniaturas[indice]

    // Obtén el atributo src de esa miniatura.
    const srcImagen = imagenMiniatura.getAttribute("src")

    //Selecciona la imagen-principal y cambia su src por el de la miniatura
    const imagenPrincipal = document.querySelector("#imagen-principal")
    imagenPrincipal.setAttribute("src", srcImagen)
}