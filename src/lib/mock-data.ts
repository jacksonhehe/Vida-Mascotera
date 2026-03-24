import type { Article, ProductRecommendation } from '@/types/content'

export const mockArticles: Article[] = [
  {
    id: 'a1',
    slug: 'checklist-realista-para-recibir-a-un-cachorro',
    title: 'Checklist realista para recibir a un cachorro en casa',
    excerpt:
      'Lo esencial para preparar espacio, rutinas y primeras compras sin agobiarte ni gastar de más.',
    category: 'perros',
    readTime: '6 min',
    author: 'Equipo Vida Mascotera',
    publishedAt: '2026-03-12',
    featured: true,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80',
    tags: ['cachorros', 'rutinas', 'hogar'],
    heroNote: 'Una llegada tranquila cambia por completo la adaptación de tu cachorro durante las primeras semanas.',
    takeaways: [
      'Prioriza orden, descanso y horarios estables antes que comprar demasiadas cosas.',
      'Haz una primera visita veterinaria temprana para tener una hoja de ruta clara.',
      'Reduce estímulos y presenta cada espacio de la casa de forma progresiva.',
    ],
    ctaLabel: 'Ver esenciales para el día a día',
    seoTitle: 'Checklist para recibir a un cachorro en casa | Vida Mascotera',
    seoDescription:
      'Guía práctica para preparar tu hogar, definir rutinas y acompañar a tu cachorro con calma desde el primer día.',
    body: [
      {
        title: 'Empieza por el ambiente, no por las compras',
        paragraphs: [
          'Un cachorro no necesita una casa perfecta, necesita un entorno predecible. Define una zona de descanso, un lugar fijo para comer y una rutina simple para sus primeros días.',
          'Cuando todo cambia al mismo tiempo, la adaptación se vuelve más difícil. Menos ruido, menos visitas y más calma suelen dar mejores resultados que una bienvenida llena de estímulos.',
        ],
      },
      {
        title: 'Crea una rutina amable desde el primer día',
        paragraphs: [
          'Los horarios de comida, sueño, paseo y juego ayudan a que el cachorro entienda qué esperar. Eso reduce ansiedad, accidentes en casa y despertares más caóticos.',
          'No hace falta hacerlo perfecto. Lo importante es repetir una estructura simple para que poco a poco empiece a sentirse seguro.',
        ],
      },
      {
        title: 'Compra lo que vas a usar de verdad',
        paragraphs: [
          'Cama lavable, comedero fácil de limpiar, arnés cómodo, placas de identificación y juguetes resistentes suelen ser una mejor inversión que accesorios improvisados.',
          'Antes de comprar por impulso, piensa si ese producto mejora bienestar, seguridad o convivencia diaria. Si no cumple una de esas tres funciones, puede esperar.',
        ],
      },
    ],
  },
  {
    id: 'a2',
    slug: 'como-enriquecer-un-departamento-para-un-gato-indoor',
    title: 'Cómo enriquecer un departamento para un gato indoor',
    excerpt:
      'Ideas concretas para sumar altura, juego y descanso sin saturar el espacio ni romper la armonía de tu hogar.',
    category: 'gatos',
    readTime: '5 min',
    author: 'Marta Cifuentes',
    publishedAt: '2026-03-09',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80',
    tags: ['indoor', 'hogar', 'bienestar'],
    heroNote: 'Un gato que puede observar, esconderse, rascar y jugar a diario suele vivir más tranquilo y más estimulado.',
    takeaways: [
      'La verticalidad importa tanto como el espacio horizontal.',
      'Es mejor tener pocos recursos bien ubicados que muchos elementos dispersos.',
      'El juego corto y frecuente suele funcionar mejor que una sesión larga ocasional.',
    ],
    ctaLabel: 'Explorar ideas para espacios felinos',
    seoTitle: 'Cómo enriquecer un departamento para un gato indoor | Vida Mascotera',
    seoDescription:
      'Descubre cómo crear un espacio seguro, estimulante y armonioso para un gato de interior.',
    body: [
      {
        title: 'La altura es parte del bienestar felino',
        paragraphs: [
          'Los gatos de interior necesitan puntos altos para observar el entorno, descansar y sentirse seguros. Estantes, rascadores altos o muebles junto a una ventana pueden cambiar mucho su rutina.',
          'No se trata de llenar la casa de estructuras. Basta con crear uno o dos recorridos bien pensados que les permitan subir, parar y mirar con calma.',
        ],
      },
      {
        title: 'Escondites y zonas de descanso reducen el estrés',
        paragraphs: [
          'Una caja, una cama tipo cueva o una manta en un rincón tranquilo pueden ser suficientes para que tu gato tenga un refugio propio.',
          'Cuando los gatos sienten que siempre tienen dónde retirarse, suelen mostrarse más confiados y más abiertos al juego y al contacto.',
        ],
      },
      {
        title: 'Jugar también es una forma de cuidar',
        paragraphs: [
          'El juego estimula, previene aburrimiento y ayuda a canalizar energía. Varitas, pelotas ligeras y pequeños circuitos de búsqueda suelen dar buen resultado.',
          'Reserva unos minutos dos o tres veces al día. Esa frecuencia suele ser más efectiva que esperar al fin de semana para compensar.',
        ],
      },
    ],
  },
  {
    id: 'a3',
    slug: 'pienso-humedo-o-mixto-como-elegir-segun-tu-mascota',
    title: 'Pienso, húmedo o mixto: cómo elegir según tu mascota',
    excerpt:
      'Una guía sencilla para entender ventajas, límites y cuándo conviene combinar formatos sin complicarte.',
    category: 'alimentacion',
    readTime: '7 min',
    author: 'Dra. Ana Reátegui',
    publishedAt: '2026-03-04',
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=1200&q=80',
    tags: ['nutricion', 'comparativa', 'guia'],
    heroNote: 'No existe un único formato ideal para todos: la mejor elección depende de hidratación, rutina, presupuesto y tolerancia digestiva.',
    takeaways: [
      'Observa energía, digestión, hidratación y apetito, no solo el precio del alimento.',
      'El formato mixto puede ser útil cuando quieres equilibrio entre practicidad y palatabilidad.',
      'Cualquier cambio debe hacerse de forma gradual durante varios días.',
    ],
    ctaLabel: 'Ver selección para la hora de comer',
    seoTitle: 'Pienso, húmedo o mixto: cómo elegir mejor | Vida Mascotera',
    seoDescription:
      'Comparativa clara entre alimento seco, húmedo y mixto para decidir según las necesidades reales de tu mascota.',
    body: [
      {
        title: 'El alimento seco destaca por practicidad',
        paragraphs: [
          'Suele ser cómodo de almacenar, fácil de racionar y más estable una vez abierto. Para muchas familias esto facilita mantener horarios regulares.',
          'Aun así, conviene vigilar que tu mascota beba suficiente agua y revisar siempre la calidad de ingredientes y la tolerancia digestiva.',
        ],
      },
      {
        title: 'El formato húmedo suma hidratación y atractivo',
        paragraphs: [
          'Es una opción interesante para mascotas con poco interés por el agua, etapas sensibles o apetito irregular.',
          'Como suele tener otra relación costo-porción, puede funcionar mejor como alimento principal en ciertos casos o como apoyo dentro de una pauta combinada.',
        ],
      },
      {
        title: 'El esquema mixto puede ser el punto medio',
        paragraphs: [
          'Combinar ambos formatos permite sumar hidratación sin renunciar a la practicidad. También ayuda a hacer las comidas más variadas para algunos perros y gatos.',
          'La clave está en mantener porciones claras y evitar improvisar cantidades, porque un sistema mixto mal ajustado puede llevar a excesos sin darte cuenta.',
        ],
      },
    ],
  },
  {
    id: 'a4',
    slug: 'cuidados-basicos-de-piel-oidos-y-patas-despues-del-paseo',
    title: 'Cuidados básicos de piel, oídos y patas después del paseo',
    excerpt:
      'Una rutina breve para detectar molestias a tiempo y mantener higiene diaria sin convertirla en un momento tenso.',
    category: 'salud',
    readTime: '4 min',
    author: 'Equipo Vida Mascotera',
    publishedAt: '2026-02-28',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80',
    tags: ['salud', 'higiene', 'prevencion'],
    heroNote: 'Cinco minutos de revisión suave después del paseo pueden prevenir irritaciones, infecciones y pequeñas molestias acumuladas.',
    takeaways: [
      'Revisa almohadillas, orejas y pliegues con buena luz.',
      'No limpies en exceso si no hay suciedad visible ni indicación veterinaria.',
      'Aprovecha este momento para detectar cambios de olor, color o sensibilidad.',
    ],
    ctaLabel: 'Leer más sobre prevención diaria',
    seoTitle: 'Cuidados de piel, orejas y patas después del paseo | Vida Mascotera',
    seoDescription:
      'Rutina breve y amable para revisar a tu mascota después del paseo y detectar señales tempranas de incomodidad.',
    body: [
      {
        title: 'Las patas suelen contar la historia del paseo',
        paragraphs: [
          'Después de caminar por tierra, pavimento o zonas húmedas, conviene mirar las almohadillas y entre los dedos. Ahí suelen aparecer pequeñas piedras, espigas o irritaciones.',
          'Una toalla suave y una revisión rápida suelen ser suficientes para mantener limpieza sin resecar la piel.',
        ],
      },
      {
        title: 'Orejas y piel merecen una observación tranquila',
        paragraphs: [
          'Más que limpiar por rutina, la idea es observar. Un mal olor, enrojecimiento o sacudidas repetidas pueden ser señales de que algo necesita atención.',
          'Lo mismo ocurre con la piel: tocar con suavidad permite notar zonas calientes, sensibles o más ásperas de lo normal.',
        ],
      },
      {
        title: 'Convierte el cuidado en una experiencia amable',
        paragraphs: [
          'Habla con voz tranquila, premia la colaboración y evita forzar. Si este momento se vuelve desagradable, será más difícil repetirlo con constancia.',
          'La prevención funciona mejor cuando forma parte de la rutina y no aparece solo cuando ya hay una molestia evidente.',
        ],
      },
    ],
  },
  {
    id: 'a5',
    slug: 'que-buscar-en-una-cama-premium-para-perro-o-gato',
    title: 'Qué buscar en una cama premium para perro o gato',
    excerpt:
      'Materiales, soporte y facilidad de limpieza para elegir una cama bonita, cómoda y realmente durable.',
    category: 'accesorios',
    readTime: '5 min',
    author: 'Elena Prado',
    publishedAt: '2026-02-18',
    image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&w=1200&q=80',
    tags: ['accesorios', 'compra', 'hogar'],
    heroNote: 'Una buena cama acompaña descanso, regula temperatura y hace más fácil mantener el orden del hogar.',
    takeaways: [
      'Busca fundas lavables y materiales que mantengan forma con el uso.',
      'El tamaño ideal permite estirarse sin perder sensación de abrigo.',
      'El diseño importa, pero la comodidad real importa más.',
    ],
    ctaLabel: 'Descubrir accesorios que sí valen la pena',
    seoTitle: 'Cómo elegir una cama premium para tu mascota | Vida Mascotera',
    seoDescription:
      'Consejos para comprar una cama cómoda, resistente y fácil de mantener para perros o gatos.',
    body: [
      {
        title: 'Soporte y tamaño van primero',
        paragraphs: [
          'Una cama muy blanda puede deformarse rápido y una demasiado pequeña termina usándose poco. Observa cómo duerme tu mascota y cuánto espacio necesita para estirarse o acurrucarse.',
          'Si tu perro o gato es senior, conviene priorizar soporte uniforme y acceso cómodo antes que volumen visual.',
        ],
      },
      {
        title: 'La limpieza fácil ahorra tiempo y evita frustraciones',
        paragraphs: [
          'Funda removible, tejidos que no atrapen demasiado pelo y materiales que se sequen bien después del lavado ayudan a sostener la rutina sin esfuerzo extra.',
          'Una cama bonita que no puedes limpiar con facilidad termina durando menos y se vuelve una compra poco inteligente.',
        ],
      },
      {
        title: 'La estética también puede jugar a favor',
        paragraphs: [
          'Cuando un accesorio se integra bien con tu casa, es más probable que lo mantengas visible y disponible para tu mascota.',
          'El objetivo ideal es ese punto en el que diseño, descanso y practicidad conviven sin sacrificios innecesarios.',
        ],
      },
    ],
  },
  {
    id: 'a6',
    slug: 'transportadoras-blandas-vs-rigidas-cual-conviene',
    title: 'Transportadoras blandas vs rígidas: cuál conviene más',
    excerpt:
      'Una comparativa clara para elegir según trayectos, seguridad, ventilación y tipo de uso cotidiano.',
    category: 'comparativas',
    readTime: '8 min',
    author: 'Equipo Vida Mascotera',
    publishedAt: '2026-02-10',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80',
    tags: ['comparativas', 'viaje', 'compra'],
    heroNote: 'La mejor transportadora no es la más popular: es la que se adapta a tus trayectos y mantiene a tu mascota segura y calmada.',
    takeaways: [
      'Para uso urbano y trayectos cortos, las blandas suelen ser más cómodas de cargar.',
      'Para viajes largos o contextos más exigentes, las rígidas suelen dar más estructura.',
      'La ventilación y la estabilidad pesan más que el aspecto exterior.',
    ],
    ctaLabel: 'Ver productos para paseo y viaje',
    seoTitle: 'Transportadoras blandas vs rígidas: comparativa real | Vida Mascotera',
    seoDescription:
      'Analizamos ventajas y límites de cada tipo de transportadora para ayudarte a comprar con criterio.',
    comparisonTable: {
      title: 'Comparativa rápida',
      optionALabel: 'Blanda',
      optionBLabel: 'Rígida',
      rows: [
        {
          criteria: 'Comodidad al cargar',
          optionA: 'Ligera y fácil de guardar',
          optionB: 'Más pesada y voluminosa',
          recommendation: 'La blanda gana en ciudad y trayectos cortos.',
        },
        {
          criteria: 'Estructura y protección',
          optionA: 'Depende del material y el uso',
          optionB: 'Mayor estabilidad general',
          recommendation: 'La rígida suele dar más seguridad en traslados largos.',
        },
        {
          criteria: 'Limpieza',
          optionA: 'Puede requerir más cuidado',
          optionB: 'Más fácil de desinfectar',
          recommendation: 'La rígida es más práctica si priorizas limpieza profunda.',
        },
      ],
    },
    body: [
      {
        title: 'La transportadora blanda funciona muy bien para lo cotidiano',
        paragraphs: [
          'Si haces trayectos cortos al veterinario, viajes urbanos o necesitas guardarla sin ocupar demasiado espacio, suele ser una gran aliada.',
          'Eso sí, conviene elegir un modelo con base firme, ventilación generosa y cierres resistentes para que la comodidad no comprometa seguridad.',
        ],
      },
      {
        title: 'La rígida suele transmitir más estabilidad',
        paragraphs: [
          'Para desplazamientos más largos, trayectos en auto o mascotas que necesitan una estructura más definida, la versión rígida suele resultar más sólida.',
          'Además, la limpieza profunda suele ser más simple, algo especialmente útil cuando hay mareos, suciedad o mayor frecuencia de uso.',
        ],
      },
      {
        title: 'La decisión cambia según tu rutina real',
        paragraphs: [
          'No elijas pensando en un escenario ideal, sino en lo que harás la mayor parte del tiempo. Una familia que viaja ocasionalmente no necesita lo mismo que alguien que se mueve varias veces por semana.',
          'Cuando la compra encaja con tu rutina, la transportadora deja de ser un objeto incómodo y se convierte en una herramienta útil de cuidado.',
        ],
      },
    ],
  },
]

export const mockProducts: ProductRecommendation[] = [
  {
    id: 'p1',
    name: 'Arnés ergonómico de paseo diario',
    category: 'perros',
    description: 'Cómodo, seguro y pensado para paseos que suman control sin restar libertad de movimiento.',
    rating: 4.8,
    priceLabel: 'Gama media premium',
    affiliateHint: 'Ideal para perros activos y tutores que buscan un ajuste firme sin rigidez excesiva.',
    image: 'https://images.unsplash.com/photo-1598137261397-1f358d1f6b89?auto=format&fit=crop&w=1200&q=80',
    badge: 'Favorito para paseo',
    ctaLabel: 'Ver recomendación',
  },
  {
    id: 'p2',
    name: 'Fuente silenciosa para gatos',
    category: 'gatos',
    description: 'Favorece hidratación diaria y se integra bien en hogares donde el ruido importa.',
    rating: 4.7,
    priceLabel: 'Selección recomendada',
    affiliateHint: 'Muy útil para gatos de interior que necesitan un pequeño estímulo extra para beber agua.',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=80',
    badge: 'Bienestar diario',
    ctaLabel: 'Descubrir por qué gusta',
  },
  {
    id: 'p3',
    name: 'Comedero elevado de cerámica',
    category: 'alimentacion',
    description: 'Limpio, estable y fácil de incorporar a una rutina de alimentación más ordenada.',
    rating: 4.6,
    priceLabel: 'Premium accesible',
    affiliateHint: 'Buena opción para hogares que valoran funcionalidad, higiene y una estética serena.',
    image: 'https://images.unsplash.com/photo-1583512603806-077998240c7a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Compra inteligente',
    ctaLabel: 'Ver detalle editorial',
  },
  {
    id: 'p4',
    name: 'Cama envolvente con funda lavable',
    category: 'accesorios',
    description: 'Aporta descanso real, se mantiene mejor con el tiempo y ayuda a que cada rincón se vea más ordenado.',
    rating: 4.9,
    priceLabel: 'Descanso premium',
    affiliateHint: 'Especialmente útil para mascotas que buscan apoyo y sensación de refugio al dormir.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    badge: 'Muy recomendada',
    ctaLabel: 'Explorar ventajas',
  },
]
