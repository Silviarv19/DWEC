function ordenarLista() {
    const lista = document.querySelector("#lista");
    const elementos = document.querySelectorAll("#lista li");

    const array = Array.from(elementos);

    array.sort((a, b) => {
        return a.textContent.localeCompare(b.textContent);
    });

    lista.innerHTML = "";

    array.forEach(elemento => {
        lista.appendChild(elemento);
    });
}