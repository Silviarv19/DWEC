const infos = document.querySelectorAll('.card .info')
infos.forEach(function(info){
    const duracion= document.createElement('p')
    duracion.textContent = 'Duración: 20 horas'
    duracion.classList.add('Duracion')
    info.appendChild(duracion)
})