const todosH2 = document.querySelectorAll('.card h2')
todosH2.forEach(function(titulo){
    titulo.textContent = `[CURSO] ${titulo.textContent}`
})