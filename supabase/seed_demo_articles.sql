insert into public.articles (
  slug,
  title,
  excerpt,
  category,
  read_time,
  author,
  published_at,
  updated_at,
  featured,
  image,
  tags,
  hero_note,
  body,
  takeaways,
  cta_label,
  seo_title,
  seo_description,
  comparison_table,
  status
)
values
  (
    'como-preparar-tu-casa-para-la-llegada-de-un-cachorro-sin-estres',
    'Cómo preparar tu casa para la llegada de un cachorro sin estrés',
    'Ordena espacios, rutinas y expectativas para que la llegada de tu cachorro se sienta más simple desde el primer día.',
    'perros',
    '6 min',
    'Equipo Vida Mascotera',
    '2026-03-26T09:00:00Z',
    '2026-03-26T09:00:00Z',
    true,
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
    array['cachorros', 'hogar', 'rutinas'],
    'Una llegada más tranquila reduce errores comunes y ayuda a que toda la casa se adapte mejor.',
    '[
      {
        "title": "Define una base simple antes de comprar de más",
        "paragraphs": [
          "Una zona de descanso, un rincón para comer y una rutina básica valen más que una lista enorme de objetos.",
          "Cuando el entorno se ve claro desde el inicio, tu cachorro entiende mejor qué esperar."
        ]
      },
      {
        "title": "Piensa en seguridad cotidiana",
        "paragraphs": [
          "Cables, plantas delicadas, productos de limpieza y objetos pequeños conviene resolverlos antes de su llegada.",
          "Eso evita correcciones constantes y hace más fácil que explore sin ponerse en riesgo."
        ]
      },
      {
        "title": "Empieza con expectativas realistas",
        "paragraphs": [
          "Los primeros días no suelen ser perfectos. Hay adaptación, accidentes y momentos de sobreestimulación.",
          "Si la meta es construir una rutina amable, el proceso se vuelve mucho más llevadero."
        ]
      }
    ]'::jsonb,
    array[
      'La prioridad inicial es el orden, no acumular accesorios.',
      'Un entorno más predecible ayuda a que el cachorro descanse mejor.',
      'La paciencia de la primera semana evita muchos errores después.'
    ],
    'Leer guía completa',
    'Cómo preparar tu casa para un cachorro | Vida Mascotera',
    'Guía práctica para ordenar el hogar y recibir a un cachorro con más calma y menos estrés.',
    null,
    'published'
  ),
  (
    'ideas-claras-para-ordenar-la-rutina-de-tu-gato-en-casa',
    'Ideas claras para ordenar la rutina de tu gato en casa',
    'Pequeños cambios de espacio, descanso y juego para que la vida diaria se sienta más estable y amable.',
    'gatos',
    '5 min',
    'Lucía Ferrer',
    '2026-03-24T09:00:00Z',
    '2026-03-24T09:00:00Z',
    false,
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80',
    array['gatos', 'hogar', 'bienestar'],
    'Los gatos suelen agradecer más los pequeños ajustes coherentes que los cambios grandes e improvisados.',
    '[
      {
        "title": "Ubica mejor sus recursos",
        "paragraphs": [
          "Separar comida, agua, descanso y arenero ayuda a que cada hábito tenga más sentido.",
          "No hace falta una casa enorme: basta con una distribución más pensada."
        ]
      },
      {
        "title": "Suma altura y refugio",
        "paragraphs": [
          "Una repisa estable, una cama junto a una ventana o un escondite tranquilo cambian mucho la experiencia diaria.",
          "La combinación de observación y retiro suele dar más seguridad."
        ]
      },
      {
        "title": "Haz espacio para el juego breve",
        "paragraphs": [
          "Unos minutos dos veces al día suelen tener más impacto que una sesión larga ocasional.",
          "Ese ritmo ordena energía, atención y convivencia."
        ]
      }
    ]'::jsonb,
    array[
      'La rutina felina mejora con espacios mejor definidos.',
      'Altura, refugio y juego breve son una base muy útil.',
      'Los cambios más pequeños a veces generan las mejoras más visibles.'
    ],
    'Ver ideas para gatos',
    'Rutina más clara para tu gato en casa | Vida Mascotera',
    'Consejos prácticos para mejorar la rutina y el bienestar diario de un gato de interior.',
    null,
    'published'
  ),
  (
    'como-armar-una-rutina-de-comida-mas-ordenada-y-tranquila',
    'Cómo armar una rutina de comida más ordenada y tranquila',
    'Horarios, contexto y observación para que la alimentación se sienta más clara y sostenible.',
    'alimentacion',
    '6 min',
    'Dra. Paula Segura',
    '2026-03-22T09:00:00Z',
    '2026-03-22T09:00:00Z',
    false,
    'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=80',
    array['alimentación', 'rutinas', 'bienestar'],
    'Una buena rutina de comida no depende solo del alimento, también del contexto en el que se ofrece.',
    '[
      {
        "title": "Empieza por horarios consistentes",
        "paragraphs": [
          "Mantener momentos parecidos para comer ayuda a ordenar expectativa, apetito y convivencia.",
          "No tiene que ser exacto al minuto, pero sí suficientemente estable."
        ]
      },
      {
        "title": "Revisa el entorno",
        "paragraphs": [
          "Ruido, interrupciones o recipientes incómodos pueden alterar una rutina que en teoría estaba bien planteada.",
          "A veces mejorar el ambiente resuelve más que cambiar de marca."
        ]
      },
      {
        "title": "Observa antes de ajustar",
        "paragraphs": [
          "Velocidad al comer, apetito, digestión y energía dan pistas mejores que una compra impulsiva.",
          "Los cambios graduales suelen ser más seguros y sostenibles."
        ]
      }
    ]'::jsonb,
    array[
      'La rutina importa tanto como el alimento.',
      'El contexto de la comida cambia mucho la experiencia.',
      'Conviene observar unos días antes de hacer cambios grandes.'
    ],
    'Seguir leyendo',
    'Rutina de comida más ordenada para tu mascota | Vida Mascotera',
    'Aprende a ordenar horarios, contexto y observación para mejorar la rutina de comida de tu mascota.',
    null,
    'published'
  ),
  (
    'habitos-simples-para-cuidar-piel-patas-y-oidos-despues-del-paseo',
    'Hábitos simples para cuidar piel, patas y oídos después del paseo',
    'Una revisión breve y amable para detectar molestias temprano sin volver tensa la rutina diaria.',
    'salud',
    '4 min',
    'Dr. Marcelo Vidal',
    '2026-03-20T09:00:00Z',
    '2026-03-20T09:00:00Z',
    false,
    'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80',
    array['salud', 'prevención', 'paseo'],
    'Cinco minutos de revisión tranquila pueden evitar pequeñas molestias que luego se vuelven más incómodas.',
    '[
      {
        "title": "Las patas suelen dar la primera pista",
        "paragraphs": [
          "Mirar almohadillas y espacios entre dedos ayuda a detectar irritaciones, suciedad o cuerpos extraños.",
          "Una revisión con buena luz suele ser suficiente."
        ]
      },
      {
        "title": "Observa antes de limpiar",
        "paragraphs": [
          "Mal olor, enrojecimiento o sensibilidad son señales más útiles que limpiar por costumbre.",
          "La idea es prevenir, no sobreintervenir."
        ]
      },
      {
        "title": "Hazlo parte de una rutina amable",
        "paragraphs": [
          "Premios, voz tranquila y movimientos suaves ayudan a que tu mascota colabore más.",
          "Cuando ese momento no genera tensión, resulta mucho más fácil sostenerlo."
        ]
      }
    ]'::jsonb,
    array[
      'La revisión breve suele prevenir mejor que la reacción tardía.',
      'Mirar con calma es más útil que limpiar en exceso.',
      'La prevención diaria funciona mejor cuando no se vuelve una lucha.'
    ],
    'Ver cuidados diarios',
    'Cuidado de patas, piel y oídos después del paseo | Vida Mascotera',
    'Rutina breve y clara para revisar a tu mascota después del paseo y detectar molestias a tiempo.',
    null,
    'published'
  ),
  (
    'guia-clara-para-elegir-un-rascador-que-tu-gato-si-use',
    'Guía clara para elegir un rascador que tu gato sí use',
    'Altura, firmeza y ubicación pesan mucho más que el tamaño del accesorio o su precio.',
    'accesorios',
    '5 min',
    'Valeria Montes',
    '2026-03-18T09:00:00Z',
    '2026-03-18T09:00:00Z',
    false,
    'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1200&q=80',
    array['gatos', 'rascador', 'hogar'],
    'El mejor rascador no es el más vistoso: es el que responde a cómo y dónde le gusta rascar a tu gato.',
    '[
      {
        "title": "Observa el hábito actual",
        "paragraphs": [
          "Si tu gato rasca esquinas, superficies horizontales o apoyos verticales, esa pista ya orienta el formato correcto.",
          "Comprar sin observar suele terminar en un accesorio ignorado."
        ]
      },
      {
        "title": "La estabilidad cambia todo",
        "paragraphs": [
          "Muchos gatos rechazan estructuras que se mueven o resultan demasiado blandas.",
          "Una base firme transmite seguridad y favorece el uso espontáneo."
        ]
      },
      {
        "title": "Ubícalo cerca del hábito",
        "paragraphs": [
          "Acercarlo a la zona donde ya rasca suele funcionar mejor que esconderlo para mantener la casa impecable.",
          "Primero conviene consolidar el uso y luego afinar el lugar."
        ]
      }
    ]'::jsonb,
    array[
      'La observación previa evita compras innecesarias.',
      'La firmeza del rascador influye mucho en su uso.',
      'La ubicación correcta vale tanto como el accesorio mismo.'
    ],
    'Explorar guía',
    'Cómo elegir un rascador para gatos | Vida Mascotera',
    'Consejos prácticos para comprar un rascador que tu gato use de verdad y se adapte mejor a tu casa.',
    null,
    'published'
  ),
  (
    'comedero-lento-vs-plato-amplio-cual-ayuda-mas-segun-tu-caso',
    'Comedero lento vs plato amplio: cuál ayuda más según tu caso',
    'Una comparativa breve para elegir según velocidad al comer, tipo de mascota y rutina de la casa.',
    'comparativas',
    '7 min',
    'Equipo Vida Mascotera',
    '2026-03-16T09:00:00Z',
    '2026-03-16T09:00:00Z',
    false,
    'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80',
    array['comparativas', 'alimentación', 'accesorios'],
    'No todos los problemas al comer se resuelven con el mismo accesorio: el contexto cambia mucho la respuesta.',
    '[
      {
        "title": "Primero identifica el problema real",
        "paragraphs": [
          "No es lo mismo una mascota que come con ansiedad que una que evita el plato por incomodidad.",
          "Elegir bien empieza por mirar mejor qué está pasando."
        ]
      },
      {
        "title": "Cada formato tiene un escenario",
        "paragraphs": [
          "El comedero lento suele ayudar más cuando el ritmo de comida es excesivo.",
          "El plato amplio puede ser más amable con ciertos gatos sensibles al contacto."
        ]
      },
      {
        "title": "La practicidad también pesa",
        "paragraphs": [
          "Si un accesorio termina guardado por incómodo o difícil de limpiar, deja de ser una solución real.",
          "La mejor compra es la que se sostiene sin esfuerzo excesivo."
        ]
      }
    ]'::jsonb,
    array[
      'Primero conviene entender la causa del problema al comer.',
      'No todos los accesorios sirven para el mismo contexto.',
      'La practicidad diaria importa tanto como la intención de compra.'
    ],
    'Ver comparativa',
    'Comedero lento vs plato amplio | Vida Mascotera',
    'Comparativa simple para decidir entre comedero lento y plato amplio según la necesidad real de tu mascota.',
    '{
      "title": "Comparativa práctica",
      "optionALabel": "Comedero lento",
      "optionBLabel": "Plato amplio",
      "rows": [
        {
          "criteria": "Velocidad al comer",
          "optionA": "Ayuda a reducir ansiedad en algunos casos",
          "optionB": "No cambia mucho el ritmo",
          "recommendation": "Si el problema es comer demasiado rápido, el comedero lento suele ayudar más."
        },
        {
          "criteria": "Comodidad para gatos sensibles",
          "optionA": "Puede resultar incómodo",
          "optionB": "Suele ser más amable",
          "recommendation": "En felinos sensibles, el plato amplio suele funcionar mejor."
        },
        {
          "criteria": "Limpieza diaria",
          "optionA": "A veces requiere más detalle",
          "optionB": "Suele ser más simple",
          "recommendation": "El plato amplio gana en practicidad de mantenimiento."
        }
      ]
    }'::jsonb,
    'published'
  ),
  (
    'como-lograr-paseos-mas-tranquilos-y-con-menos-prisa',
    'Cómo lograr paseos más tranquilos y con menos prisa',
    'Cambios simples para que el paseo deje de sentirse caótico y se convierta en un momento más amable.',
    'perros',
    '6 min',
    'Camila Núñez',
    '2026-03-14T09:00:00Z',
    '2026-03-14T09:00:00Z',
    false,
    'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80',
    array['paseo', 'rutinas', 'convivencia'],
    'Un buen paseo no se mide solo por distancia, sino por calma, atención y calidad de experiencia.',
    '[
      {
        "title": "Todo empieza antes de abrir la puerta",
        "paragraphs": [
          "Preparar correa y salida sin apuro ayuda a que el tono del paseo empiece más bajo y más claro.",
          "No se trata de perfección, sino de bajar un poco la carga del inicio."
        ]
      },
      {
        "title": "Olfatear también cuenta",
        "paragraphs": [
          "Para muchos perros, pausar y explorar con la nariz forma parte del bienestar del paseo.",
          "Cuando todo es avanzar sin espacio de lectura del entorno, se pierde una parte importante."
        ]
      },
      {
        "title": "La consistencia hace el cambio",
        "paragraphs": [
          "Pequeños ajustes repetidos funcionan mejor que una salida ideal cada tanto.",
          "La rutina tranquila suele construirse por repetición."
        ]
      }
    ]'::jsonb,
    array[
      'Salir con menos prisa cambia mucho el inicio del paseo.',
      'El olfato ayuda a regular la experiencia.',
      'La consistencia vale más que una salida perfecta aislada.'
    ],
    'Leer artículo',
    'Paseos más tranquilos para tu perro | Vida Mascotera',
    'Consejos simples para bajar el caos del paseo y mejorar la rutina diaria con tu perro.',
    null,
    'published'
  ),
  (
    'ventanas-seguras-y-rincones-de-sol-para-gatos-de-interior',
    'Ventanas seguras y rincones de sol para gatos de interior',
    'Cómo crear un punto de observación atractivo sin comprometer seguridad ni orden visual.',
    'gatos',
    '5 min',
    'Lucía Ferrer',
    '2026-03-12T09:00:00Z',
    '2026-03-12T09:00:00Z',
    false,
    'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=80',
    array['gatos', 'ventanas', 'hogar'],
    'Mirar hacia afuera y descansar al sol son pequeños lujos diarios que muchos gatos valoran muchísimo.',
    '[
      {
        "title": "La seguridad va primero",
        "paragraphs": [
          "Mallas, redes o soluciones firmes son imprescindibles si tu gato tiene acceso frecuente a una ventana.",
          "Con esa base, luego sí puedes pensar en confort y diseño."
        ]
      },
      {
        "title": "El confort mejora el uso",
        "paragraphs": [
          "Una repisa estable, una manta o una base amable convierten ese borde en un rincón realmente habitable.",
          "Ese pequeño ajuste hace que el lugar se use más y mejor."
        ]
      },
      {
        "title": "Observación y descanso pueden convivir",
        "paragraphs": [
          "Muchos gatos alternan vigilancia suave con siestas breves al sol.",
          "Diseñar ese punto para ambas cosas mejora mucho su valor diario."
        ]
      }
    ]'::jsonb,
    array[
      'La seguridad de ventanas siempre va primero.',
      'Un rincón cómodo aumenta el uso real del espacio.',
      'No hace falta una instalación enorme para mejorar mucho la experiencia.'
    ],
    'Ver guía felina',
    'Ventanas seguras para gatos de interior | Vida Mascotera',
    'Aprende a crear un punto de observación seguro, cómodo y útil para gatos de interior.',
    null,
    'published'
  ),
  (
    'como-leer-la-etiqueta-de-un-alimento-con-mas-calma-y-criterio',
    'Cómo leer la etiqueta de un alimento con más calma y criterio',
    'Una guía breve para entender ingredientes, orden de lista y mensajes de marketing sin perderte.',
    'alimentacion',
    '6 min',
    'Dra. Ana Reátegui',
    '2026-03-10T09:00:00Z',
    '2026-03-10T09:00:00Z',
    false,
    'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=1200&q=80',
    array['alimentación', 'etiquetas', 'compras'],
    'No hace falta memorizar toda una tabla técnica para comprar con algo más de criterio.',
    '[
      {
        "title": "Empieza por lo más visible",
        "paragraphs": [
          "La lista de ingredientes y el análisis garantizado suelen dar información suficiente para una comparación básica.",
          "No hace falta entrar en tecnicismos extremos para detectar diferencias útiles."
        ]
      },
      {
        "title": "No todo lo que suena premium lo es",
        "paragraphs": [
          "Mensajes grandes en el empaque pueden ayudar a vender, pero no reemplazan una lectura mínima del producto.",
          "Conviene mirar el conjunto y no dejarse llevar solo por el diseño."
        ]
      },
      {
        "title": "Compara desde tu contexto",
        "paragraphs": [
          "Edad, rutina, presupuesto y respuesta digestiva cambian mucho la decisión correcta.",
          "La mejor opción es la que encaja con necesidades reales y puede sostenerse."
        ]
      }
    ]'::jsonb,
    array[
      'La lista de ingredientes cuenta una parte importante de la historia.',
      'El marketing del envase no reemplaza una lectura básica.',
      'Conviene comparar opciones desde el contexto real de tu mascota.'
    ],
    'Seguir leyendo',
    'Cómo leer la etiqueta de un alimento para mascotas | Vida Mascotera',
    'Claves simples para interpretar mejor la etiqueta de un alimento y comprar con más criterio.',
    null,
    'published'
  )
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  category = excluded.category,
  read_time = excluded.read_time,
  author = excluded.author,
  published_at = excluded.published_at,
  updated_at = excluded.updated_at,
  featured = excluded.featured,
  image = excluded.image,
  tags = excluded.tags,
  hero_note = excluded.hero_note,
  body = excluded.body,
  takeaways = excluded.takeaways,
  cta_label = excluded.cta_label,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  comparison_table = excluded.comparison_table,
  status = excluded.status;
