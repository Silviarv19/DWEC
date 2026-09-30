const playlist=[
    {titulo: "IT MUST SUCK TO KNOW YOU", artista: "Jxdn", duracion: 234},
    {titulo: "too fast to live, too young to die", artista: "Nessa Barrett", duracion: 200},
    {titulo: "Saturate", artista: "Sace6", duracion: 180},
    {titulo: "Blancanieves", artista: "l0rna", duracion: 120},
    {titulo: "Cariño, sueltate el pelo", artista: "Dani Fernández", duracion: 245},
    {titulo: "Dream come true", artista: "Freya Sky, Malachi Barton", duracion: 192},
    {titulo: "Just let go", artista: "Jxdn", duracion: 211},
    {titulo: "Descanso", artista: "Paul Thin", duracion: 250},
    {titulo: "NANANA", artista: "Ruslana", duracion: 234},
    {titulo: "'Til dead do us part", artista: "Nessa Barrett", duracion: 221}
]

//foreach para recorrer el array mostrando titulo y artistas
playlist.forEach(cancion => {
    console.log(`Título: ${cancion.titulo} Artista: ${cancion.artista}`)
});
