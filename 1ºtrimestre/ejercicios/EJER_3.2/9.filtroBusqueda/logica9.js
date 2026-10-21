function filtrarCiudades(pais) {
    const ciudades = document.querySelectorAll("#lista li");

    ciudades.forEach(ciudad => {
        if (ciudad.textContent.includes(pais)) {
            ciudad.style.display = "list-item";
        } else {
            ciudad.style.display = "none";
        }
    });
}