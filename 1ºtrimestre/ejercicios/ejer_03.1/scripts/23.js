const cards = document.querySelectorAll('.card')
const card3 = cards[2]
const react =card3.querySelector('h2')
const oculto = react.querySelector('.oculto')
react.addEventListener('click', function() {
    oculto.classList.remove('oculto')
})