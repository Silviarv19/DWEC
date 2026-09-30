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

//.filter con canciones de +180s
const playlistLargas = playlist.filter((playlist) => playlist.duracion>180)

//.map para mostrar las canciones de +180
playlistLargas.map(canciones=> console.log(`La canción ${canciones.titulo} de ${canciones.artista} dura ${canciones.duracion} segundos`))