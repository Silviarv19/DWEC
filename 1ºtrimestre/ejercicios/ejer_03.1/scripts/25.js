const cursos= document.querySelectorAll('.card')
cursos.forEach(function(card){
    const categoria= card.querySelector('.categoria')
    if(categoria.textContent === 'Desarrollo Web'){
        tarjeta.style.backgroundColor= '#f0f0f0'
    }
})