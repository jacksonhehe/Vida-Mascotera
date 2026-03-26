import type { CategoryHighlight, NavItem, PetCategory, StarterTip } from '@/types/content'

export const navigationItems: NavItem[] = [
  { label: 'Inicio', path: '/', category: 'inicio', description: 'Ideas, guias y recomendaciones para cuidar mejor a tu mascota.' },
  { label: 'Perros', path: '/perros', category: 'perros', description: 'Rutinas, conducta, paseo, descanso y vida diaria con perros.' },
  { label: 'Gatos', path: '/gatos', category: 'gatos', description: 'Enriquecimiento, descanso, juego y bienestar felino en casa.' },
  { label: 'Alimentacion', path: '/alimentacion', category: 'alimentacion', description: 'Consejos para elegir mejor segun etapa, rutina y necesidades reales.' },
  { label: 'Salud y cuidados', path: '/salud-cuidados', category: 'salud', description: 'Prevencion cotidiana, higiene y senales a las que conviene prestar atencion.' },
  { label: 'Guias de compra', path: '/accesorios', category: 'accesorios', description: 'Selecciones y comparativas para elegir mejor antes de comprar.' },
  { label: 'Comparativas', path: '/comparativas', category: 'comparativas', description: 'Analisis claros para decidir entre opciones antes de comprar.' },
  { label: 'Blog', path: '/blog', category: 'blog', description: 'Lecturas practicas y cercanas para acompanarte en el dia a dia.' },
  { label: 'Contacto', path: '/contacto', category: 'contacto', description: 'Consultas, colaboraciones y conversaciones de marca.' },
]

export const categoryCopy: Record<
  Exclude<PetCategory, 'inicio' | 'contacto'>,
  { title: string; intro: string; emphasis: string }
> = {
  perros: {
    title: 'Vida mas tranquila y feliz para tu perro',
    intro: 'Guias practicas sobre rutinas, paseo, conducta, descanso y decisiones del dia a dia para convivir mejor.',
    emphasis: 'Contenido pensado para tutores que buscan orientacion clara, calida y realista.',
  },
  gatos: {
    title: 'Bienestar felino con sensibilidad y criterio',
    intro: 'Ideas para crear un hogar mas amable para tu gato, con juego, calma, observacion y cuidado diario.',
    emphasis: 'Desde enriquecimiento en departamentos hasta habitos que reducen estres.',
  },
  alimentacion: {
    title: 'Elegir mejor tambien es una forma de cuidar',
    intro: 'Comparativas, recomendaciones y explicaciones simples para entender formatos, rutinas y compras mas inteligentes.',
    emphasis: 'Menos ruido, mas claridad para tomar decisiones con confianza.',
  },
  salud: {
    title: 'Pequenos cuidados que hacen una gran diferencia',
    intro: 'Rutinas breves, senales a observar y habitos preventivos para acompanar el bienestar de tu mascota sin dramatismos.',
    emphasis: 'Una base clara para construir habitos sostenibles en casa.',
  },
  accesorios: {
    title: 'Guias de compra para elegir con mas criterio',
    intro: 'Recomendaciones, selecciones y comparativas para paseo, descanso, comida y hogar, con foco en utilidad real.',
    emphasis: 'Contenido pensado para ayudarte a comprar mejor, no a comprar mas.',
  },
  comparativas: {
    title: 'Comparativas honestas para decidir sin complicarte',
    intro: 'Analizamos ventajas, limites y escenarios de uso para que elijas lo que encaja con tu rutina real.',
    emphasis: 'Ideal para personas que quieren claridad antes de invertir.',
  },
  blog: {
    title: 'Lecturas que acompanan la vida con tu mascota',
    intro: 'Articulos cercanos, practicos y bien aterrizados para cuidar, entender y disfrutar mas cada etapa.',
    emphasis: 'Una biblioteca editorial preparada para crecer contigo.',
  },
}

export const featuredCategories: CategoryHighlight[] = [
  {
    id: 'dog-routines',
    title: 'Rutinas que hacen mas facil convivir con tu perro',
    description: 'Paseo, descanso, habitos y senales simples para una vida cotidiana mas serena.',
    path: '/perros',
    accent: 'brand',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-home',
    title: 'Un hogar pensado tambien para tu gato',
    description: 'Enriquecimiento, juego y espacios que cuidan su calma sin romper la estetica de tu casa.',
    path: '/gatos',
    accent: 'mint',
    image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'smart-feeding',
    title: 'Alimentacion clara, sin mitos ni confusion',
    description: 'Comparativas simples para elegir formatos, rutinas y productos que si aportan valor.',
    path: '/alimentacion',
    accent: 'cream',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=80',
  },
]

export const starterTips: StarterTip[] = [
  {
    id: 'vet',
    title: 'Agenda una revision veterinaria temprana',
    body: 'Te dara una linea de base clara para vacunas, desparasitacion, alimentacion y senales a observar desde el inicio.',
  },
  {
    id: 'space',
    title: 'Prepara un espacio propio y predecible',
    body: 'Una cama, agua fresca, calma y una rutina simple ayudan a que la adaptacion sea mucho mas llevadera.',
  },
  {
    id: 'feeding',
    title: 'Evita improvisar la alimentacion',
    body: 'Mantener horarios y hacer cambios graduales reduce molestias digestivas y te da mas claridad sobre como responde tu mascota.',
  },
]
