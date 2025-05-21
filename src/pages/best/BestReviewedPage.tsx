import "./BestReviewedPage.css";

type JuegoRanking = {
  nombre: string;
  plataformas: string[];
  descripcion: string;
  imagen: string;
  score: number;
};


const juegosRanking: JuegoRanking[] = [
  {
    nombre: "The Legend of Zelda: Breath of the Wild",
    plataformas: ["Switch"],
    descripcion: "The Legend of Zelda: Breath of the Wild es mucho más que un videojuego: es una oda a la libertad, la exploración y la belleza del descubrimiento. En la piel de Link, despiertas tras cien años de letargo con la memoria rota y la carga de haber caído cuando más se te necesitaba. El Gran Cataclismo destruyó reinos, separó vidas y dejó a Zelda atrapada en una lucha eterna, sosteniendo sola lo que tú no pudiste. Tu misión no es solo derrotar al mal, sino recomponer lo que quedó: los recuerdos, las promesas, las ruinas que susurran lo que fue. Desarrollado por Nintendo, este título revolucionario te transporta a un Hyrule vasto y abierto, donde cada montaña puede escalarse y cada decisión lleva a una nueva aventura. Pero más allá de su inmenso mapa y sus ingeniosas mecánicas, Breath of the Wild es una experiencia profundamente emocional. Cada atardecer, cada melodía suave, cada encuentro inesperado te envuelve en una atmósfera casi mágica. No juegas solo para completar una misión, sino para enfrentar lo que quedó pendiente. Es un viaje que no solo desafía tu habilidad, sino que toca tu corazón. Terminarlo no es solo alcanzar el final: es mirar atrás, comprender el dolor de un mundo roto… y decidir si aún puede salvarse. ",
    imagen: "https://gaming-cdn.com/images/products/2616/616x353/the-legend-of-zelda-breath-of-the-wild-switch-game-nintendo-eshop-europe-cover.jpg?v=1730381682",
    score: 10,
  },  
  {
    nombre: "Minecraft",
    plataformas: ["PC", "XBOne", "PS5"],
    descripcion: "Minecraft es mucho más que un videojuego: es un universo infinito de creatividad, exploración y posibilidades. Desarrollado por Mojang Studios, este fenómeno global te sumerge en un mundo hecho de bloques donde cada rincón puede ser transformado por tus propias manos. Puedes construir imperios, adentrarte en cavernas misteriosas, enfrentarte a criaturas o simplemente perderte en la tranquilidad de crear. Pero lo que hace único a Minecraft no es solo su libertad, sino cómo despierta algo profundo en quien juega. No hay una historia escrita: tú la creas. Es un juego que evoluciona contigo, que se adapta a tu imaginación, que te acompaña desde la infancia hasta la adultez como un refugio inagotable. Ya sea en soledad o en compañía, su mundo pixelado se convierte en un lienzo emocional, donde cada bloque colocado guarda un recuerdo, un sueño o una aventura vivida. Terminarlo no existe, porque Minecraft nunca se acaba: vive mientras tú sigas soñando.",
    imagen: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/05/minecraft-new-spin-off-genres.jpg",
    score: 9.8,
  },
  {
    nombre: "OneShot",
    plataformas: ["PC"],
    descripcion: "Hay juegos que te entretienen y juegos que te transforman. OneShot pertenece a los segundos. Con una estética minimalista y una narrativa profundamente íntima, te pone al lado de Niko, una criatura inocente con una misión imposible: devolverle la luz a un mundo que se está apagando. Pero aquí no juegas como Niko… él sabe que tú estás ahí. Y confía en ti. El mundo que recorres está lleno de belleza marchita: máquinas olvidadas, pueblos silentes, paisajes cubiertos de niebla y nostalgia. Cada rincón parece un susurro de algo que alguna vez fue. La historia no se impone; se revela con sutileza, obligándote a detenerte, observar y sentir. Lo que realmente distingue a OneShot es su habilidad para romper las barreras entre juego y jugador. No con trucos vacíos, sino con sensibilidad. Lo que empieza como una simple aventura termina convirtiéndose en un lazo emocional que no esperabas formar. Al cerrar el juego, no lo haces con la sensación de victoria, sino con la certeza de que conociste a alguien... y lo dejaste ir.",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/420530/header.jpg?t=1747673318",
    score: 9.5,
  },
    {
    nombre: "The Legend of Zelda: Tears of the Kingdom",
    plataformas: ["Switch"],
    descripcion: "The Legend of Zelda: Tears of the Kingdom es una evolución ambiciosa que expande todo lo que Breath of the Wild hizo inolvidable. Hyrule ha cambiado: ahora se abre hacia el cielo y se hunde en las profundidades, revelando un mundo más vasto y misterioso, donde cada rincón guarda secretos antiguos y desafíos inesperados. En medio de esa transformación, Link debe enfrentarse a una nueva amenaza que altera el equilibrio del reino y separa su destino del de Zelda una vez más. Pero lo más asombroso es cómo el juego te da las herramientas para alterar tu entorno, resolver obstáculos de formas impredecibles y crear soluciones únicas que reflejan tu forma de jugar. Aquí, el mundo reacciona a tu ingenio. No hay un solo camino, ni una sola respuesta. Tears of the Kingdom no solo amplía la historia de Hyrule, la vuelve más profunda y viva. Es una aventura donde imaginación y exploración van de la mano, y donde cada descubrimiento nace de lo que tú decides construir.",
    imagen: "https://zelda.nintendo.com/tears-of-the-kingdom/images/share-fb.jpg",
    score: 9.4,
  },
    {
    nombre: "Red Dead Redemption 2",
    plataformas: ["PC"],
    descripcion: "Red Dead Redemption 2 es una obra monumental que lleva el concepto de mundo abierto a otro nivel. Ambientado en los últimos días del lejano oeste, encarnas a Arthur Morgan, un forajido atrapado entre la lealtad a su banda y una sociedad que cambia demasiado rápido. El juego destaca por su nivel de detalle impresionante: cada ciudad, bosque y sendero está cuidadosamente construido para sentirse vivo. Las misiones principales se mezclan de forma natural con actividades cotidianas como cazar, pescar o conversar con extraños, y todo contribuye a construir una narrativa sólida y madura. El sistema de decisiones impacta el desarrollo del personaje y el final de la historia, haciendo que cada partida se sienta personal. Red Dead Redemption 2 no solo es técnicamente sobresaliente, también es una experiencia narrativa profunda y bien construida que representa uno de los puntos más altos en la historia de Rockstar Games.",
    imagen: "https://gaming-cdn.com/images/products/1744/orig/red-dead-redemption-2-xbox-one-game-microsoft-store-europe-cover.jpg?v=1730908051",
    score: 9.2,
  },
    {
    nombre: "Undertale",
    plataformas: ["PC", "PS5"],
    descripcion: "Undertale no te pide que salves el mundo. Solo te pide que lo entiendas. Desde el momento en que caes al subsuelo, rodeado de criaturas que deberían ser enemigos, todo lo que creías saber sobre los RPG se desarma. Aquí, pelear no es obligatorio. Matar no es la única salida. Y cada elección que tomas pesa… incluso cuando el juego finge que no. La magia de Undertale no está en sus gráficos ni en su sistema de combate: está en sus silencios incómodos, en los chistes que esconden tristeza, en los personajes que te recuerdan que incluso los “monstruos” tienen corazón. No hay una historia universal, porque cada jugador escribe la suya. Hay partidas que terminan con risas, otras con lágrimas… y algunas con preguntas difíciles de olvidar. Es un juego que te conoce. Que rompe las reglas para hablarte directamente. Que te desafía a mirar hacia adentro. Y cuando se apaga la pantalla, lo hace dejándote una última duda: ¿hiciste lo correcto… o solo lo fácil?",
    imagen: "https://undertale.com/assets/images/social-logo.png",
    score: 9,
  },

];

// ✅ Diccionario para asociar clase correcta con cada plataforma
const clasePlataforma: { [key: string]: string } = {
  PC: 'pc',
  PS5: 'ps5',
  Switch: 'switch',
  XBOne: 'xbox',
};

export default function BestReviewedPage() {
  return (
    <div className="best-reviewed-page">

      <div className="page-header">
        <h1>LOS MEJOR VALORADOS</h1>
        <p>Los juegos mejor puntuados por los usuarios y la crítica de JuegosXD </p>
      </div>

      <div className="ranking-page">
        {juegosRanking.map((juego, index) => (

          <div key={index} className="ranking-container">
            <div className="score-circle">{juego.score}</div>
            <img className={`game-cover`} src={juego.imagen} alt={juego.nombre} />
            <div className="game-info">
              <div className="game-header">

                <span className="title-text">{juego.nombre}</span>
                <span className="platform">
                  {juego.plataformas.map((plat, i) => (
                    <span key={i} className={`tag-plataforma ${clasePlataforma[plat] || ''}`}>
                      {plat}
                    </span>
                  ))}
                </span>

              </div>

              <p className="description">{juego.descripcion}</p>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
}
