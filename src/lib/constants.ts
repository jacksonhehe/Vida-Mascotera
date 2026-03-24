import type { CategoryHighlight, NavItem, PetCategory, StarterTip } from '@/types/content'

export const navigationItems: NavItem[] = [
  { label: 'Inicio', path: '/', category: 'inicio', description: 'Ideas, guías y recomendaciones para cuidar mejor a tu mascota.' },
  { label: 'Perros', path: '/perros', category: 'perros', description: 'Rutinas, conducta, paseo, descanso y vida diaria con perros.' },
  { label: 'Gatos', path: '/gatos', category: 'gatos', description: 'Enriquecimiento, descanso, juego y bienestar felino en casa.' },
  { label: 'Alimentación', path: '/alimentacion', category: 'alimentacion', description: 'Consejos para elegir mejor según etapa, rutina y necesidades reales.' },
  { label: 'Salud y cuidados', path: '/salud-cuidados', category: 'salud', description: 'Prevención cotidiana, higiene y señales a las que conviene prestar atención.' },
  { label: 'Accesorios', path: '/accesorios', category: 'accesorios', description: 'Selecciones útiles para comprar con criterio y evitar gastos innecesarios.' },
  { label: 'Comparativas', path: '/comparativas', category: 'comparativas', description: 'Análisis claros para decidir entre opciones antes de comprar.' },
  { label: 'Blog', path: '/blog', category: 'blog', description: 'Lecturas prácticas y cercanas para acompañarte en el día a día.' },
  { label: 'Contacto', path: '/contacto', category: 'contacto', description: 'Consultas, colaboraciones y conversaciones de marca.' },
]

export const categoryCopy: Record<
  Exclude<PetCategory, 'inicio' | 'contacto'>,
  { title: string; intro: string; emphasis: string }
> = {
  perros: {
    title: 'Vida más tranquila y feliz para tu perro',
    intro: 'Guías prácticas sobre rutinas, paseo, conducta, descanso y decisiones del día a día para convivir mejor.',
    emphasis: 'Contenido pensado para tutores que buscan orientación clara, cálida y realista.',
  },
  gatos: {
    title: 'Bienestar felino con sensibilidad y criterio',
    intro: 'Ideas para crear un hogar más amable para tu gato, con juego, calma, observación y cuidado diario.',
    emphasis: 'Desde enriquecimiento en departamentos hasta hábitos que reducen estrés.',
  },
  alimentacion: {
    title: 'Elegir mejor también es una forma de cuidar',
    intro: 'Comparativas, recomendaciones y explicaciones simples para entender formatos, rutinas y compras más inteligentes.',
    emphasis: 'Menos ruido, más claridad para tomar decisiones con confianza.',
  },
  salud: {
    title: 'Pequeños cuidados que hacen una gran diferencia',
    intro: 'Rutinas breves, señales a observar y hábitos preventivos para acompañar el bienestar de tu mascota sin dramatismos.',
    emphasis: 'Una base clara para construir hábitos sostenibles en casa.',
  },
  accesorios: {
    title: 'Accesorios bonitos, útiles y realmente durables',
    intro: 'Selecciones curadas para paseo, descanso, comida y hogar, con foco en comodidad, diseño y funcionalidad.',
    emphasis: 'Recomendaciones hechas para comprar una vez y comprar mejor.',
  },
  comparativas: {
    title: 'Comparativas honestas para decidir sin complicarte',
    intro: 'Analizamos ventajas, límites y escenarios de uso para que elijas lo que encaja con tu rutina real.',
    emphasis: 'Ideal para personas que quieren claridad antes de invertir.',
  },
  blog: {
    title: 'Lecturas que acompañan la vida con tu mascota',
    intro: 'Artículos cercanos, prácticos y bien aterrizados para cuidar, entender y disfrutar más cada etapa.',
    emphasis: 'Una biblioteca editorial preparada para crecer contigo.',
  },
}

export const featuredCategories: CategoryHighlight[] = [
  {
    id: 'dog-routines',
    title: 'Rutinas que hacen más fácil convivir con tu perro',
    description: 'Paseo, descanso, hábitos y señales simples para una vida cotidiana más serena.',
    path: '/perros',
    accent: 'brand',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-home',
    title: 'Un hogar pensado también para tu gato',
    description: 'Enriquecimiento, juego y espacios que cuidan su calma sin romper la estética de tu casa.',
    path: '/gatos',
    accent: 'mint',
    image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'smart-feeding',
    title: 'Alimentación clara, sin mitos ni confusión',
    description: 'Comparativas simples para elegir formatos, rutinas y accesorios que sí aportan valor.',
    path: '/alimentacion',
    accent: 'cream',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=80',
  },
]

export const starterTips: StarterTip[] = [
  {
    id: 'vet',
    title: 'Agenda una revisión veterinaria temprana',
    body: 'Te dará una línea de base clara para vacunas, desparasitación, alimentación y señales a observar desde el inicio.',
  },
  {
    id: 'space',
    title: 'Prepara un espacio propio y predecible',
    body: 'Una cama, agua fresca, calma y una rutina simple ayudan a que la adaptación sea mucho más llevadera.',
  },
  {
    id: 'feeding',
    title: 'Evita improvisar la alimentación',
    body: 'Mantener horarios y hacer cambios graduales reduce molestias digestivas y te da más claridad sobre cómo responde tu mascota.',
  },
]
