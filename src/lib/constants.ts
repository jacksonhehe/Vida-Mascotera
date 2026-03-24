import type { CategoryHighlight, NavItem, PetCategory, StarterTip } from '@/types/content'

export const navigationItems: NavItem[] = [
  { label: 'Inicio', path: '/', category: 'inicio', description: 'Portada editorial con recursos destacados.' },
  { label: 'Perros', path: '/perros', category: 'perros', description: 'Rutinas, comportamiento, juegos y bienestar canino.' },
  { label: 'Gatos', path: '/gatos', category: 'gatos', description: 'Enriquecimiento felino, salud y convivencia.' },
  { label: 'Alimentacion', path: '/alimentacion', category: 'alimentacion', description: 'Guías de nutrición, ingredientes y formatos de comida.' },
  { label: 'Salud y Cuidados', path: '/salud-cuidados', category: 'salud', description: 'Prevención, higiene, revisiones y primeros cuidados.' },
  { label: 'Accesorios', path: '/accesorios', category: 'accesorios', description: 'Selección curada de productos útiles y duraderos.' },
  { label: 'Comparativas', path: '/comparativas', category: 'comparativas', description: 'Análisis claros para decidir mejor antes de comprar.' },
  { label: 'Blog', path: '/blog', category: 'blog', description: 'Artículos, tendencias y recomendaciones editoriales.' },
  { label: 'Contacto', path: '/contacto', category: 'contacto', description: 'Consultas, alianzas y propuestas de colaboración.' },
]

export const categoryCopy: Record<Exclude<PetCategory, 'inicio' | 'contacto'>, { title: string; intro: string; emphasis: string }> = {
  perros: {
    title: 'Perros felices, activos y equilibrados',
    intro: 'Recursos para entender mejor su comportamiento, mejorar rutinas y elegir productos que realmente aporten valor.',
    emphasis: 'Desde cachorros hasta perros senior, con enfoque práctico y confiable.',
  },
  gatos: {
    title: 'Bienestar felino con una mirada serena y actual',
    intro: 'Ideas de enriquecimiento, salud preventiva y convivencia para hogares que quieren respetar la naturaleza del gato.',
    emphasis: 'Contenido pensado para espacios pequeños y necesidades reales.',
  },
  alimentacion: {
    title: 'Nutrición informada para cada etapa',
    intro: 'Comparativas, raciones, tipos de alimento y criterios claros para tomar mejores decisiones todos los días.',
    emphasis: 'Explicamos lo esencial sin caer en ruido ni tecnicismos innecesarios.',
  },
  salud: {
    title: 'Prevención y cuidados diarios',
    intro: 'Higiene, vacunas, señales de alerta y buenas prácticas para sostener bienestar a largo plazo.',
    emphasis: 'Base editorial lista para crecer con fichas, checklists y recursos descargables.',
  },
  accesorios: {
    title: 'Productos útiles con enfoque premium',
    intro: 'Selección de accesorios funcionales y duraderos para paseo, descanso, juego, viaje y organización en casa.',
    emphasis: 'Preparado para evolucionar hacia un modelo de afiliación y recomendación comercial.',
  },
  comparativas: {
    title: 'Comparativas honestas y accionables',
    intro: 'Tablas claras, criterios consistentes y lectura rápida para elegir entre opciones sin perder tiempo.',
    emphasis: 'Ideal para futuras integraciones de catálogos y monetización editorial.',
  },
  blog: {
    title: 'Historias, recursos y actualidad para tutores',
    intro: 'Una capa editorial flexible donde publicar guías evergreen, notas breves, entrevistas y contenido de comunidad.',
    emphasis: 'Diseñado para escalar con CMS, SEO y contenido dinámico desde Supabase.',
  },
}

export const featuredCategories: CategoryHighlight[] = [
  {
    id: 'dog-routines',
    title: 'Rutinas saludables para perros',
    description: 'Paseos, descanso, juego y hábitos que reducen estrés y mejoran conducta.',
    path: '/perros',
    accent: 'brand',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cat-home',
    title: 'Espacios ideales para gatos',
    description: 'Enriquecimiento vertical, seguridad en casa y bienestar felino diario.',
    path: '/gatos',
    accent: 'mint',
    image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'smart-feeding',
    title: 'Alimentación con criterio',
    description: 'Cómo leer etiquetas, ajustar por etapa y comparar formatos sin confusión.',
    path: '/alimentacion',
    accent: 'cream',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=80',
  },
]

export const starterTips: StarterTip[] = [
  { id: 'vet', title: 'Agenda una primera revisión veterinaria', body: 'Centraliza vacunas, desparasitación y una línea base de salud desde el inicio.' },
  { id: 'space', title: 'Prepara un espacio seguro y predecible', body: 'Cama, agua, zona de descanso y rutinas simples reducen ansiedad y aceleran adaptación.' },
  { id: 'feeding', title: 'No improvises con la alimentación', body: 'Mantén horarios y una transición gradual si cambias de alimento o formato.' },
]

