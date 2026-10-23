function generarLorem() {
    const cantidad = Number(document.querySelector("#cantidad").value);
    const resultado = document.querySelector("#resultado");

    resultado.innerHTML = "";

    const fragmento = document.createDocumentFragment();

    for (let i = 0; i < cantidad; i++) {
        const parrafo = document.createElement("p");

        parrafo.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

        fragmento.appendChild(parrafo);
    }

    resultado.appendChild(fragmento);
}