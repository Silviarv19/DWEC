const formulario= document.getElementById('formulario-contacto')
formulario.addEventListener('submit', function(event){
    const nombre= document.getElementById('nombre').value
    const mensaje = document.getElementById('mensaje').value
    console.log(`Nombre: ${nombre} Mensaje: ${mensaje}`)
})