import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Building2,
  ClipboardList,
  Calculator,
  Database,
  FileText,
  Plus,
  Trash2,
  ChevronDown,
  Send,
  Save,
  Download,
  X,
  Settings2,
  Layers,
  Wrench,
  Zap,
  Droplets,
  PaintBucket,
  DoorOpen,
  Boxes,
  Loader2,
  RefreshCw,
  History,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Ruler,
  AlertTriangle,
  CheckCircle2,
  FolderOpen,
  HardHat,
} from 'lucide-react';

/* =========================================================================
   PRISMA ARQUITECTURA — PARAMÉTRICO
   Cotizador de campo y Análisis de Precios Unitarios (APU)
   ========================================================================= */

const uid = () => Math.random().toString(36).slice(2, 10);

const MARCAS = [
  'Comex',
  'Helvex',
  'Crest',
  'Cemex',
  'Panel Rey',
  'USG',
  'The Home Depot',
  'Ferretería La Siete',
  'El Surtidor',
  'Eléctrica Santiago',
];

const DEFAULT_MATERIALES = [
  {
    id: 'tabique',
    codigo: 'MAT-01',
    descripcion: 'Tabique Rojo Recocido',
    unidad: 'pza',
    precio: 7.5,
    marca: 'Ferretería La Siete',
  },
  {
    id: 'mortero',
    codigo: 'MAT-02',
    descripcion: 'Mortero Cemento-Arena (junteo)',
    unidad: 'm3',
    precio: 2800,
    marca: 'Cemex',
  },
  {
    id: 'cemento_arena_aplanado',
    codigo: 'MAT-03',
    descripcion: 'Cemento-Arena p/Aplanado',
    unidad: 'm2',
    precio: 45,
    marca: 'Cemex',
  },
  {
    id: 'yeso',
    codigo: 'MAT-04',
    descripcion: 'Yeso p/Aplanado',
    unidad: 'm2',
    precio: 38,
    marca: 'USG',
  },
  {
    id: 'estuco',
    codigo: 'MAT-05',
    descripcion: 'Estuco Acabado Fino',
    unidad: 'm2',
    precio: 65,
    marca: 'Crest',
  },
  {
    id: 'azulejo_kit',
    codigo: 'MAT-06',
    descripcion: 'Azulejo + Adhesivo + Boquilla',
    unidad: 'm2',
    precio: 240,
    marca: 'El Surtidor',
  },
  {
    id: 'sellador_aparente',
    codigo: 'MAT-07',
    descripcion: 'Sellador Block Aparente',
    unidad: 'm2',
    precio: 12,
    marca: 'Comex',
  },
  {
    id: 'concreto_200',
    codigo: 'MAT-08',
    descripcion: "Concreto f'c=200 kg/cm2 (firme)",
    unidad: 'm2',
    precio: 210,
    marca: 'Cemex',
  },
  {
    id: 'malla_electrosoldada',
    codigo: 'MAT-09',
    descripcion: 'Malla Electrosoldada',
    unidad: 'm2',
    precio: 35,
    marca: 'Cemex',
  },
  {
    id: 'concreto_250',
    codigo: 'MAT-10',
    descripcion: "Concreto Premezclado f'c=250",
    unidad: 'm3',
    precio: 2450,
    marca: 'Cemex',
  },
  {
    id: 'acero_varilla',
    codigo: 'MAT-11',
    descripcion: 'Acero de Refuerzo Habilitado fy=4200',
    unidad: 'kg',
    precio: 24,
    marca: 'Ferretería La Siete',
  },
  {
    id: 'cimbra_madera',
    codigo: 'MAT-12',
    descripcion: 'Cimbra de Madera (contacto)',
    unidad: 'm2',
    precio: 180,
    marca: 'Ferretería La Siete',
  },
  {
    id: 'pintura_vinilica',
    codigo: 'MAT-13',
    descripcion: 'Pintura Vinílica (2 manos)',
    unidad: 'm2',
    precio: 28,
    marca: 'Comex',
  },
  {
    id: 'pasta_texturizada',
    codigo: 'MAT-14',
    descripcion: 'Pasta Texturizada',
    unidad: 'm2',
    precio: 55,
    marca: 'Comex',
  },
  {
    id: 'piso_ceramico',
    codigo: 'MAT-15',
    descripcion: 'Piso Cerámico + Adhesivo',
    unidad: 'm2',
    precio: 220,
    marca: 'The Home Depot',
  },
  {
    id: 'piso_porcelanato',
    codigo: 'MAT-16',
    descripcion: 'Piso Porcelanato + Adhesivo',
    unidad: 'm2',
    precio: 380,
    marca: 'The Home Depot',
  },
  {
    id: 'concreto_pulido_insumo',
    codigo: 'MAT-17',
    descripcion: 'Insumos Concreto Pulido (sellador/endurecedor)',
    unidad: 'm2',
    precio: 180,
    marca: 'Cemex',
  },
  {
    id: 'terrazzo',
    codigo: 'MAT-18',
    descripcion: 'Terrazzo',
    unidad: 'm2',
    precio: 450,
    marca: 'El Surtidor',
  },
  {
    id: 'duela_laminada',
    codigo: 'MAT-19',
    descripcion: 'Duela Laminada',
    unidad: 'm2',
    precio: 320,
    marca: 'The Home Depot',
  },
  {
    id: 'duela_vinilica',
    codigo: 'MAT-20',
    descripcion: 'Duela Vinílica tipo SPC / LVT',
    unidad: 'm2',
    precio: 280,
    marca: 'The Home Depot',
  },
  {
    id: 'aluminio_2',
    codigo: 'MAT-21',
    descripcion: 'Perfil Aluminio 2" + Cristal',
    unidad: 'm2',
    precio: 2200,
    marca: 'El Surtidor',
  },
  {
    id: 'aluminio_3',
    codigo: 'MAT-22',
    descripcion: 'Perfil Aluminio 3" + Cristal',
    unidad: 'm2',
    precio: 2600,
    marca: 'El Surtidor',
  },
  {
    id: 'aluminio_nacional',
    codigo: 'MAT-23',
    descripcion: 'Perfil Aluminio Línea Nacional + Cristal',
    unidad: 'm2',
    precio: 1600,
    marca: 'El Surtidor',
  },
  {
    id: 'herreria_estructural',
    codigo: 'MAT-24',
    descripcion: 'Herrería Estructural + Cristal/Malla',
    unidad: 'm2',
    precio: 1400,
    marca: 'Ferretería La Siete',
  },
  {
    id: 'kit_salida_electrica',
    codigo: 'MAT-25',
    descripcion: 'Kit Salida Eléctrica (caja, cable, placa) hasta 3m',
    unidad: 'pza',
    precio: 380,
    marca: 'Eléctrica Santiago',
  },
  {
    id: 'ml_cable_adicional',
    codigo: 'MAT-26',
    descripcion: 'Cable + Canalización Adicional',
    unidad: 'ml',
    precio: 45,
    marca: 'Eléctrica Santiago',
  },
  {
    id: 'kit_salida_hidraulica',
    codigo: 'MAT-27',
    descripcion: 'Kit Salida Hidrosanitaria',
    unidad: 'pza',
    precio: 520,
    marca: 'Helvex',
  },
  {
    id: 'cal_trazo',
    codigo: 'MAT-28',
    descripcion: 'Cal p/Trazo y Nivelación',
    unidad: 'm2',
    precio: 2,
    marca: 'Ferretería La Siete',
  },
  {
    id: 'flete_pesado',
    codigo: 'MAT-29',
    descripcion: 'Acarreo/Retiro Escombro (mampostería)',
    unidad: 'm2',
    precio: 25,
    marca: 'Ferretería La Siete',
  },
  {
    id: 'flete_ligero',
    codigo: 'MAT-30',
    descripcion: 'Acarreo/Retiro Escombro (panel ligero)',
    unidad: 'm2',
    precio: 15,
    marca: 'Ferretería La Siete',
  },
  {
    id: 'bastidor_metalico_muro',
    codigo: 'MAT-31',
    descripcion: 'Bastidor Metálico p/Muro (postes 2 1/2" + canales, cal. 26)',
    unidad: 'm2',
    precio: 92,
    marca: 'Panel Rey',
  },
  {
    id: 'panel_tablaroca_estandar',
    codigo: 'MAT-32',
    descripcion: 'Panel Tablaroca Estándar 1/2" (2 caras, con desperdicio)',
    unidad: 'm2',
    precio: 138,
    marca: 'USG',
  },
  {
    id: 'panel_tablaroca_rh',
    codigo: 'MAT-33',
    descripcion: 'Panel Tablaroca RH 1/2" Resistente a Humedad (2 caras)',
    unidad: 'm2',
    precio: 176,
    marca: 'USG',
  },
  {
    id: 'panel_durock_muro',
    codigo: 'MAT-34',
    descripcion: 'Panel Durock (Cemento) 12.7mm (2 caras)',
    unidad: 'm2',
    precio: 262,
    marca: 'USG',
  },
  {
    id: 'fijaciones_muro_ligero',
    codigo: 'MAT-35',
    descripcion: 'Tornillería y Fijaciones p/Muro Ligero',
    unidad: 'm2',
    precio: 18,
    marca: 'Panel Rey',
  },
  {
    id: 'juntas_tablaroca',
    codigo: 'MAT-36',
    descripcion: 'Tratamiento de Juntas (Redimix + Cinta Perfacinta)',
    unidad: 'm2',
    precio: 26,
    marca: 'USG',
  },
  {
    id: 'juntas_durock',
    codigo: 'MAT-37',
    descripcion: 'Tratamiento de Juntas (Basecoat + Malla Fibra de Vidrio)',
    unidad: 'm2',
    precio: 48,
    marca: 'USG',
  },
  {
    id: 'suspension_plafon',
    codigo: 'MAT-38',
    descripcion:
      'Estructura de Suspensión (Canal Listón + Canaleta + Colgantes)',
    unidad: 'm2',
    precio: 72,
    marca: 'Panel Rey',
  },
  {
    id: 'panel_plafon_tablaroca',
    codigo: 'MAT-39',
    descripcion: 'Panel Tablaroca p/Plafón 1/2" (con desperdicio)',
    unidad: 'm2',
    precio: 96,
    marca: 'USG',
  },
  {
    id: 'panel_plafon_durock',
    codigo: 'MAT-40',
    descripcion: 'Panel Durock p/Plafón 12.7mm (con desperdicio)',
    unidad: 'm2',
    precio: 152,
    marca: 'USG',
  },
  {
    id: 'kit_plafon_reticular',
    codigo: 'MAT-41',
    descripcion:
      'Kit Plafón Reticular/Modular 61x61 (perfilería T + panel mineral)',
    unidad: 'm2',
    precio: 225,
    marca: 'USG',
  },
];

const DEFAULT_MANO_OBRA = [
  {
    id: 'MO-01',
    codigo: 'MO-01',
    descripcion: 'Cuadrilla Albañilería (Oficial Albañil + Peón)',
    integrantes: 2,
    unidad: 'jornada',
    precio: 1100,
  },
  {
    id: 'MO-02',
    codigo: 'MO-02',
    descripcion: 'Cuadrilla Tablaroquero (Oficial + Ayudante)',
    integrantes: 2,
    unidad: 'jornada',
    precio: 950,
  },
  {
    id: 'MO-03',
    codigo: 'MO-03',
    descripcion: 'Cuadrilla Pintor (Oficial Pintor + Peón)',
    integrantes: 2,
    unidad: 'jornada',
    precio: 850,
  },
  {
    id: 'MO-04',
    codigo: 'MO-04',
    descripcion: 'Cuadrilla Electricista / Plomero (Oficial + Ayudante)',
    integrantes: 2,
    unidad: 'jornada',
    precio: 1050,
  },
  {
    id: 'MO-05',
    codigo: 'MO-05',
    descripcion: 'Cuadrilla Fierrero / Estructurista',
    integrantes: 2,
    unidad: 'jornada',
    precio: 1200,
  },
];

const DEFAULT_EQUIPO = [
  {
    id: 'EQ-01',
    codigo: 'EQ-01',
    descripcion: 'Andamios',
    unidad: 'día',
    precio: 150,
  },
  {
    id: 'EQ-02',
    codigo: 'EQ-02',
    descripcion: 'Revolvedora',
    unidad: 'día',
    precio: 450,
  },
  {
    id: 'EQ-03',
    codigo: 'EQ-03',
    descripcion: 'Bailarina (Aplanadora de Concreto)',
    unidad: 'día',
    precio: 600,
  },
  {
    id: 'EQ-04',
    codigo: 'EQ-04',
    descripcion: 'Herramienta Mayor (varios)',
    unidad: 'día',
    precio: 300,
  },
];

const DEFAULT_PRICEBOOK = {
  materiales: DEFAULT_MATERIALES,
  manoObra: DEFAULT_MANO_OBRA,
  equipo: DEFAULT_EQUIPO,
};

const MATRICES = {
  trazo: {
    nombre: 'Trazo y Nivelación',
    unidad: 'm2',
    materiales: [{ id: 'cal_trazo', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 80,
  },
  demol_mamposteria: {
    nombre: 'Demolición Muro Mampostería',
    unidad: 'm2',
    materiales: [{ id: 'flete_pesado', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 12,
  },
  demol_ligero: {
    nombre: 'Demolición Muro Ligero (Panel Yeso/Durock)',
    unidad: 'm2',
    materiales: [{ id: 'flete_ligero', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 20,
  },
  muro_tabique: {
    nombre: 'Muro de Tabique Rojo Recocido',
    unidad: 'm2',
    materiales: [
      { id: 'tabique', cant: 32 },
      { id: 'mortero', cant: 0.03 },
    ],
    cuadrilla: 'MO-01',
    rendimiento: 6,
  },
  acabado_Enjarre: {
    nombre: 'Enjarre o Aplanado Cemento-Arena',
    unidad: 'm2',
    materiales: [{ id: 'cemento_arena_aplanado', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 12,
  },
  acabado_Yeso: {
    nombre: 'Aplanado de Yeso',
    unidad: 'm2',
    materiales: [{ id: 'yeso', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 15,
  },
  acabado_Estuco: {
    nombre: 'Acabado Estuco',
    unidad: 'm2',
    materiales: [{ id: 'estuco', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 8,
  },
  acabado_Azulejo: {
    nombre: 'Recubrimiento de Azulejo',
    unidad: 'm2',
    materiales: [{ id: 'azulejo_kit', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 7,
  },
  acabado_Aparente: {
    nombre: 'Muro Aparente (sellado)',
    unidad: 'm2',
    materiales: [{ id: 'sellador_aparente', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 40,
  },
  firme: {
    nombre: "Firme de Concreto f'c=200",
    unidad: 'm2',
    materiales: [
      { id: 'concreto_200', cant: 1 },
      { id: 'malla_electrosoldada', cant: 1 },
    ],
    cuadrilla: 'MO-01',
    rendimiento: 25,
  },
  pintura_vinilica: {
    nombre: 'Pintura Vinílica (2 manos)',
    unidad: 'm2',
    materiales: [{ id: 'pintura_vinilica', cant: 1 }],
    cuadrilla: 'MO-03',
    rendimiento: 35,
  },
  pasta_texturizada: {
    nombre: 'Pasta Texturizada',
    unidad: 'm2',
    materiales: [{ id: 'pasta_texturizada', cant: 1 }],
    cuadrilla: 'MO-03',
    rendimiento: 20,
  },
  piso_Cerámico: {
    nombre: 'Piso Cerámico',
    unidad: 'm2',
    materiales: [{ id: 'piso_ceramico', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 18,
  },
  piso_Porcelanato: {
    nombre: 'Piso Porcelanato',
    unidad: 'm2',
    materiales: [{ id: 'piso_porcelanato', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 14,
  },
  'piso_Concreto Pulido': {
    nombre: 'Concreto Pulido',
    unidad: 'm2',
    materiales: [{ id: 'concreto_pulido_insumo', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 30,
  },
  piso_Terrazzo: {
    nombre: 'Terrazzo',
    unidad: 'm2',
    materiales: [{ id: 'terrazzo', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 10,
  },
  'piso_Duela Laminada': {
    nombre: 'Duela Laminada',
    unidad: 'm2',
    materiales: [{ id: 'duela_laminada', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 20,
  },
  'piso_Duela Vinílica tipo SPC o LVT': {
    nombre: 'Duela Vinílica SPC/LVT',
    unidad: 'm2',
    materiales: [{ id: 'duela_vinilica', cant: 1 }],
    cuadrilla: 'MO-01',
    rendimiento: 22,
  },
  muro_TablarocaEstandar: {
    nombre: 'Muro Tablaroca Estándar (1/2")',
    unidad: 'm2',
    materiales: [
      { id: 'bastidor_metalico_muro', cant: 1 },
      { id: 'panel_tablaroca_estandar', cant: 1 },
      { id: 'fijaciones_muro_ligero', cant: 1 },
      { id: 'juntas_tablaroca', cant: 1 },
    ],
    cuadrilla: 'MO-02',
    rendimiento: 10,
  },
  muro_TablarocaRH: {
    nombre: 'Muro Tablaroca RH (Resistente a Humedad)',
    unidad: 'm2',
    materiales: [
      { id: 'bastidor_metalico_muro', cant: 1 },
      { id: 'panel_tablaroca_rh', cant: 1 },
      { id: 'fijaciones_muro_ligero', cant: 1 },
      { id: 'juntas_tablaroca', cant: 1 },
    ],
    cuadrilla: 'MO-02',
    rendimiento: 9,
  },
  muro_Durock: {
    nombre: 'Muro Durock (Panel de Cemento 12.7mm)',
    unidad: 'm2',
    materiales: [
      { id: 'bastidor_metalico_muro', cant: 1 },
      { id: 'panel_durock_muro', cant: 1 },
      { id: 'fijaciones_muro_ligero', cant: 1 },
      { id: 'juntas_durock', cant: 1 },
    ],
    cuadrilla: 'MO-02',
    rendimiento: 8,
  },
  plafon_TablarocaCorrido: {
    nombre: 'Plafón Corrido de Tablaroca',
    unidad: 'm2',
    materiales: [
      { id: 'suspension_plafon', cant: 1 },
      { id: 'panel_plafon_tablaroca', cant: 1 },
      { id: 'juntas_tablaroca', cant: 1 },
    ],
    cuadrilla: 'MO-02',
    rendimiento: 9,
  },
  plafon_DurockCorrido: {
    nombre: 'Plafón Corrido de Durock',
    unidad: 'm2',
    materiales: [
      { id: 'suspension_plafon', cant: 1 },
      { id: 'panel_plafon_durock', cant: 1 },
      { id: 'juntas_durock', cant: 1 },
    ],
    cuadrilla: 'MO-02',
    rendimiento: 7,
  },
  plafon_ReticularModular: {
    nombre: 'Plafón Reticular / Modular (61x61 cm)',
    unidad: 'm2',
    materiales: [{ id: 'kit_plafon_reticular', cant: 1 }],
    cuadrilla: 'MO-02',
    rendimiento: 15,
  },
};

const TIPOS_ACABADO_MURO = ['Enjarre', 'Yeso', 'Estuco', 'Azulejo', 'Aparente'];
const TIPOS_PISO = [
  'Cerámico',
  'Porcelanato',
  'Concreto Pulido',
  'Terrazzo',
  'Duela Laminada',
  'Duela Vinílica tipo SPC o LVT',
];
const TIPOS_INMUEBLE = [
  'Local Comercial',
  'Departamento',
  'Casa',
  'Oficina',
  'Nave',
];
const NIVELES_ACABADO = ['Económico', 'Comercial', 'Residencial', 'Lujo'];
const TIPOS_ESTRUCTURA = [
  'Columna',
  'Castillo',
  'Trabe',
  'Dala de Cerramiento',
];
const CUANTIAS_ACERO = {
  Columna: 90,
  Castillo: 60,
  Trabe: 100,
  'Dala de Cerramiento': 55,
};
const MATERIALES_CANCELERIA = {
  'Aluminio (2")': 'aluminio_2',
  'Aluminio (3")': 'aluminio_3',
  'Aluminio Línea Nacional': 'aluminio_nacional',
  'Herrería Estructural': 'herreria_estructural',
};
const TIPOS_SALIDA_ELECTRICA = ['Luminaria', 'Contacto', 'Apagador'];
const TIPOS_SALIDA_HIDRAULICA = ['Lavabo', 'W.C.', 'Regadera', 'Fregadero'];

const SISTEMAS_MURO = [
  { key: 'Tabique', label: 'Tabique Rojo Recocido (Mampostería)' },
  {
    key: 'TablarocaEstandar',
    label: 'Tablaroca Estándar (1/2") — Bastidor metálico, 2 caras',
  },
  {
    key: 'TablarocaRH',
    label: 'Tablaroca RH — Resistente a Humedad (baños/cocinas)',
  },
  {
    key: 'Durock',
    label: 'Durock — Panel de Cemento 12.7mm (fachadas/zonas húmedas)',
  },
];
const SISTEMA_MURO_MATRIZ = {
  TablarocaEstandar: 'muro_TablarocaEstandar',
  TablarocaRH: 'muro_TablarocaRH',
  Durock: 'muro_Durock',
};

const TIPOS_PLAFON = [
  {
    key: 'TablarocaCorrido',
    label: 'Plafón Corrido de Tablaroca — Canaleta y Canal Listón',
  },
  {
    key: 'DurockCorrido',
    label: 'Plafón Corrido de Durock — Exteriores/Zonas Húmedas',
  },
  { key: 'ReticularModular', label: 'Plafón Reticular / Modular (61×61 cm)' },
];
const TIPO_PLAFON_MATRIZ = {
  TablarocaCorrido: 'plafon_TablarocaCorrido',
  DurockCorrido: 'plafon_DurockCorrido',
  ReticularModular: 'plafon_ReticularModular',
};

const CAPITULOS_META = [
  { key: 'preliminares', nombre: '01. Preliminares', icon: HardHat },
  { key: 'albanileria', nombre: '02. Albañilería', icon: Layers },
  { key: 'estructuras', nombre: '03. Estructuras', icon: Boxes },
  { key: 'acabados', nombre: '04. Acabados', icon: PaintBucket },
  { key: 'pisos', nombre: '05. Pisos y Recubrimientos', icon: Ruler },
  { key: 'canceleria', nombre: '06. Cancelería y Herrería', icon: DoorOpen },
  { key: 'instalaciones', nombre: '07. Instalaciones', icon: Zap },
];

function defaultPartidas() {
  return {
    preliminares: {
      aplica: false,
      trazo: { m2: '', puRapido: '' },
      demoliciones: [],
      conceptosExtra: [],
    },
    albanileria: {
      aplica: false,
      muros: {
        m2: '',
        sistema: 'Tabique',
        caraA: 'Aparente',
        caraB: 'Aparente',
        mismoAcabado: true,
      },
      firmes: { m2: '' },
      plafones: { m2: '', tipo: 'TablarocaCorrido' },
    },
    estructuras: { aplica: false, elementos: [] },
    acabados: {
      aplica: false,
      pintura: { m2Muros: '', m2Plafones: '', tipo: 'vinilica' },
    },
    pisos: { aplica: false, tipo: 'Cerámico', m2: '' },
    canceleria: { aplica: false, elementos: [] },
    instalaciones: { aplica: false, electrica: [], hidraulica: [] },
  };
}

const defaultProyecto = () => ({
  cliente: '',
  ubicacion: '',
  tipo: 'Casa',
  superficie: '',
  nivel: 'Residencial',
});
const defaultParams = () => ({
  indirectos: 20,
  herramientaMenor: 5,
  imprevistos: 5,
  equipoSeguridad: 2,
});

const money = (n) =>
  (isFinite(n) ? n : 0).toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  });
const num = (v) => {
  const n = parseFloat(v);
  return isFinite(n) ? n : 0;
};

function findPrecio(priceBook, id) {
  const m = priceBook.materiales.find((x) => x.id === id);
  return m ? m.precio : 0;
}
function findCuadrilla(priceBook, codigo) {
  return (
    priceBook.manoObra.find((x) => x.codigo === codigo) || {
      precio: 0,
      descripcion: '—',
      codigo,
    }
  );
}

function calcUnidadMatriz(matrizKey, priceBook, overrideRendimiento) {
  const mz = MATRICES[matrizKey];
  const matDetalle = mz.materiales.map((m) => {
    const insumo = priceBook.materiales.find((x) => x.id === m.id);
    const precio = insumo ? insumo.precio : 0;
    return {
      id: m.id,
      codigo: insumo?.codigo,
      descripcion: insumo?.descripcion || m.id,
      unidad: insumo?.unidad || '',
      cantidad: m.cant,
      precio,
      importe: precio * m.cant,
    };
  });
  const costoMateriales = matDetalle.reduce((a, b) => a + b.importe, 0);
  const cuadrilla = findCuadrilla(priceBook, mz.cuadrilla);
  const rendimiento = overrideRendimiento || mz.rendimiento;
  const costoMO = rendimiento ? cuadrilla.precio / rendimiento : 0;
  return {
    nombre: mz.nombre,
    unidad: mz.unidad,
    matDetalle,
    costoMateriales,
    cuadrilla,
    rendimiento,
    costoMO,
  };
}

function calcConcepto(
  matrizKey,
  cantidad,
  priceBook,
  params,
  overrideRendimiento
) {
  const base = calcUnidadMatriz(matrizKey, priceBook, overrideRendimiento);
  const herrMenor = base.costoMO * (num(params.herramientaMenor) / 100);
  const eqSeguridad = base.costoMO * (num(params.equipoSeguridad) / 100);
  const puTotal = base.costoMateriales + base.costoMO + herrMenor + eqSeguridad;
  return {
    ...base,
    matrizKey,
    cantidad,
    herrMenor,
    eqSeguridad,
    puTotal,
    total: puTotal * cantidad,
  };
}

function calcPreliminares(p, priceBook, params) {
  const items = [];
  const cantTrazo = num(p.trazo.m2);
  if (cantTrazo > 0) {
    if (p.trazo.puRapido) {
      const pu = num(p.trazo.puRapido);
      items.push({
        id: 'trazo',
        concepto: 'Trazo y Nivelación',
        unidad: 'm2',
        cantidad: cantTrazo,
        puTotal: pu,
        total: pu * cantTrazo,
        manual: true,
      });
    } else {
      items.push({
        id: 'trazo',
        concepto: 'Trazo y Nivelación',
        ...calcConcepto('trazo', cantTrazo, priceBook, params),
      });
    }
  }
  p.demoliciones.forEach((d) => {
    const cant = num(d.m2);
    if (cant <= 0) return;
    const key = d.tipo === 'mamposteria' ? 'demol_mamposteria' : 'demol_ligero';
    items.push({
      id: d.id,
      concepto: `Demolición ${
        d.tipo === 'mamposteria'
          ? 'Muro de Mampostería'
          : 'Muro Ligero (Panel Yeso/Durock)'
      }`,
      ...calcConcepto(key, cant, priceBook, params),
    });
  });
  p.conceptosExtra.forEach((c) => {
    const cant = num(c.cantidad),
      pu = num(c.pu);
    if (cant <= 0) return;
    items.push({
      id: c.id,
      concepto: c.nombre || 'Concepto personalizado',
      unidad: c.unidad || 'pza',
      cantidad: cant,
      puTotal: pu,
      total: pu * cant,
      manual: true,
    });
  });
  return items;
}

function calcAlbanileria(p, priceBook, params) {
  const items = [];
  const cantMuro = num(p.muros.m2);
  const sistema = p.muros.sistema || 'Tabique';
  if (cantMuro > 0) {
    if (sistema === 'Tabique') {
      items.push({
        id: 'muro',
        concepto: 'Muro de Tabique Rojo Recocido (matriz base)',
        ...calcConcepto('muro_tabique', cantMuro, priceBook, params),
      });
      const caraB = p.muros.mismoAcabado ? p.muros.caraA : p.muros.caraB;
      items.push({
        id: 'caraA',
        concepto: `Acabado Cara A: ${p.muros.caraA}`,
        ...calcConcepto(
          `acabado_${p.muros.caraA}`,
          cantMuro,
          priceBook,
          params
        ),
      });
      items.push({
        id: 'caraB',
        concepto: `Acabado Cara B: ${caraB}`,
        ...calcConcepto(`acabado_${caraB}`, cantMuro, priceBook, params),
      });
    } else {
      const matrizKey = SISTEMA_MURO_MATRIZ[sistema];
      const label =
        SISTEMAS_MURO.find((s) => s.key === sistema)?.label || sistema;
      items.push({
        id: 'muro',
        concepto: `Muro Ligero — ${label}`,
        ...calcConcepto(matrizKey, cantMuro, priceBook, params),
      });
    }
  }
  const cantFirme = num(p.firmes.m2);
  if (cantFirme > 0)
    items.push({
      id: 'firme',
      concepto: "Firme de Concreto Interior f'c=200 kg/cm2",
      ...calcConcepto('firme', cantFirme, priceBook, params),
    });

  const cantPlafon = num(p.plafones?.m2);
  if (cantPlafon > 0) {
    const tipoKey = p.plafones.tipo || 'TablarocaCorrido';
    const matrizKey = TIPO_PLAFON_MATRIZ[tipoKey];
    const label = TIPOS_PLAFON.find((t) => t.key === tipoKey)?.label || tipoKey;
    items.push({
      id: 'plafon',
      concepto: `Plafón — ${label}`,
      ...calcConcepto(matrizKey, cantPlafon, priceBook, params),
    });
  }
  return items;
}

function calcEstructuras(p, priceBook, params) {
  return p.elementos.map((el) => {
    const anchoM = num(el.ancho) / 100,
      peralteM = num(el.peralte) / 100,
      longitud = num(el.longitud);
    const volumen = anchoM * peralteM * longitud;
    const cuantia = CUANTIAS_ACERO[el.tipo] || 70;
    const aceroKg = volumen * cuantia;
    const perimetro = 2 * (anchoM + peralteM);
    const cimbraM2 = perimetro * longitud;
    const pConcreto = findPrecio(priceBook, 'concreto_250'),
      pAcero = findPrecio(priceBook, 'acero_varilla'),
      pCimbra = findPrecio(priceBook, 'cimbra_madera');
    const costoConcreto = volumen * pConcreto,
      costoAcero = aceroKg * pAcero,
      costoCimbra = cimbraM2 * pCimbra;
    const costoMateriales = costoConcreto + costoAcero + costoCimbra;
    const cuadrilla = findCuadrilla(priceBook, 'MO-05');
    const rendimiento = 0.8;
    const costoMO =
      volumen > 0 ? (volumen / rendimiento) * cuadrilla.precio : 0;
    const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
    const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
    const total = costoMateriales + costoMO + herrMenor + eqSeguridad;
    return {
      id: el.id,
      concepto: `${el.tipo}: ${el.ancho || 0}×${el.peralte || 0} cm — ${
        el.longitud || 0
      } m`,
      unidad: 'pieza',
      cantidad: 1,
      matDetalle: [
        {
          codigo: 'MAT-10',
          descripcion: "Concreto Premezclado f'c=250",
          unidad: 'm3',
          cantidad: Number(volumen.toFixed(3)),
          precio: pConcreto,
          importe: costoConcreto,
        },
        {
          codigo: 'MAT-11',
          descripcion: `Acero de Refuerzo Mínimo (${cuantia} kg/m3)`,
          unidad: 'kg',
          cantidad: Number(aceroKg.toFixed(1)),
          precio: pAcero,
          importe: costoAcero,
        },
        {
          codigo: 'MAT-12',
          descripcion: 'Cimbra de Madera',
          unidad: 'm2',
          cantidad: Number(cimbraM2.toFixed(2)),
          precio: pCimbra,
          importe: costoCimbra,
        },
      ],
      costoMateriales,
      cuadrilla,
      rendimiento,
      costoMO,
      herrMenor,
      eqSeguridad,
      puTotal: total,
      total,
    };
  });
}

function calcAcabados(p, priceBook, params) {
  const items = [];
  const cant = num(p.pintura.m2Muros) + num(p.pintura.m2Plafones);
  if (cant > 0) {
    const key =
      p.pintura.tipo === 'vinilica' ? 'pintura_vinilica' : 'pasta_texturizada';
    items.push({
      id: 'pintura',
      concepto: `${
        p.pintura.tipo === 'vinilica'
          ? 'Pintura Vinílica (2 manos)'
          : 'Pasta Texturizada'
      } — Muros y Plafones`,
      ...calcConcepto(key, cant, priceBook, params),
    });
  }
  return items;
}

function calcPisos(p, priceBook, params) {
  const cant = num(p.m2);
  if (cant <= 0) return [];
  const key = `piso_${p.tipo}`;
  return [
    {
      id: 'piso',
      concepto: `Piso ${p.tipo}`,
      ...calcConcepto(key, cant, priceBook, params),
    },
  ];
}

function calcCanceleria(p, priceBook, params) {
  return p.elementos.map((el) => {
    const areaBase = (num(el.ancho) / 100) * (num(el.alto) / 100);
    const modulaciones = Math.max(1, num(el.modulaciones) || 1);
    const factorMod = 1 + 0.08 * (modulaciones - 1);
    const area = areaBase * factorMod;
    const matId = MATERIALES_CANCELERIA[el.material] || 'aluminio_nacional';
    const insumo = priceBook.materiales.find((m) => m.id === matId);
    const precioM2 = insumo ? insumo.precio : 0;
    const costoMateriales = area * precioM2;
    const cuadrilla = findCuadrilla(priceBook, 'MO-01');
    const rendimiento = 6;
    const costoMO = (area / rendimiento) * cuadrilla.precio;
    const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
    const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
    const total = costoMateriales + costoMO + herrMenor + eqSeguridad;
    return {
      id: el.id,
      concepto: `${el.elemento} ${el.material} — ${el.apertura} (${
        el.ancho || 0
      }×${el.alto || 0}cm, ${modulaciones} módulo${
        modulaciones > 1 ? 's' : ''
      })`,
      unidad: 'pieza',
      cantidad: 1,
      matDetalle: [
        {
          codigo: insumo?.codigo,
          descripcion: insumo?.descripcion,
          unidad: 'm2',
          cantidad: Number(area.toFixed(2)),
          precio: precioM2,
          importe: costoMateriales,
        },
      ],
      costoMateriales,
      cuadrilla,
      rendimiento,
      costoMO,
      herrMenor,
      eqSeguridad,
      puTotal: total,
      total,
    };
  });
}

function calcInstalaciones(p, priceBook, params) {
  const items = [];
  const gruposE = {};
  p.electrica.forEach((s) => {
    gruposE[s.tipo] = gruposE[s.tipo] || { cantidad: 0, metros: 0 };
    gruposE[s.tipo].cantidad += num(s.cantidad);
    gruposE[s.tipo].metros += num(s.metrosAdicionales) * num(s.cantidad);
  });
  Object.entries(gruposE).forEach(([tipo, g]) => {
    if (g.cantidad <= 0) return;
    const pKit = findPrecio(priceBook, 'kit_salida_electrica'),
      pMl = findPrecio(priceBook, 'ml_cable_adicional');
    const costoMateriales = g.cantidad * pKit + g.metros * pMl;
    const cuadrilla = findCuadrilla(priceBook, 'MO-04');
    const rendimiento = 4;
    const costoMO = (g.cantidad / rendimiento) * cuadrilla.precio;
    const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
    const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
    const total = costoMateriales + costoMO + herrMenor + eqSeguridad;
    items.push({
      id: `elec-${tipo}`,
      concepto: `Salida Eléctrica: ${tipo}${
        g.metros > 0 ? ` (+${g.metros.toFixed(1)} ml)` : ''
      }`,
      unidad: 'salida',
      cantidad: g.cantidad,
      matDetalle: [
        {
          codigo: 'MAT-25',
          descripcion: 'Kit Salida Eléctrica (hasta 3m)',
          unidad: 'pza',
          cantidad: g.cantidad,
          precio: pKit,
          importe: g.cantidad * pKit,
        },
        ...(g.metros > 0
          ? [
              {
                codigo: 'MAT-26',
                descripcion: 'Cable + Canalización Adicional',
                unidad: 'ml',
                cantidad: g.metros,
                precio: pMl,
                importe: g.metros * pMl,
              },
            ]
          : []),
      ],
      costoMateriales,
      cuadrilla,
      rendimiento,
      costoMO,
      herrMenor,
      eqSeguridad,
      puTotal: total / g.cantidad,
      total,
    });
  });
  const gruposH = {};
  p.hidraulica.forEach((s) => {
    gruposH[s.tipo] = (gruposH[s.tipo] || 0) + num(s.cantidad);
  });
  Object.entries(gruposH).forEach(([tipo, cantidad]) => {
    if (cantidad <= 0) return;
    const pKit = findPrecio(priceBook, 'kit_salida_hidraulica');
    const costoMateriales = cantidad * pKit;
    const cuadrilla = findCuadrilla(priceBook, 'MO-04');
    const rendimiento = 3;
    const costoMO = (cantidad / rendimiento) * cuadrilla.precio;
    const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
    const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
    const total = costoMateriales + costoMO + herrMenor + eqSeguridad;
    items.push({
      id: `hid-${tipo}`,
      concepto: `Salida Hidrosanitaria: ${tipo}`,
      unidad: 'salida',
      cantidad,
      matDetalle: [
        {
          codigo: 'MAT-27',
          descripcion: 'Kit Salida Hidrosanitaria',
          unidad: 'pza',
          cantidad,
          precio: pKit,
          importe: costoMateriales,
        },
      ],
      costoMateriales,
      cuadrilla,
      rendimiento,
      costoMO,
      herrMenor,
      eqSeguridad,
      puTotal: total / cantidad,
      total,
    });
  });
  return items;
}

function calcularPresupuesto(partidas, priceBook, params) {
  const calcMap = {
    preliminares: calcPreliminares,
    albanileria: calcAlbanileria,
    estructuras: calcEstructuras,
    acabados: calcAcabados,
    pisos: calcPisos,
    canceleria: calcCanceleria,
    instalaciones: calcInstalaciones,
  };
  const capitulos = CAPITULOS_META.map((meta) => {
    const p = partidas[meta.key];
    const items = p.aplica ? calcMap[meta.key](p, priceBook, params) : [];
    const subtotal = items.reduce((a, b) => a + b.total, 0);
    return { ...meta, aplica: p.aplica, items, subtotal };
  });
  const subtotalDirecto = capitulos.reduce((a, c) => a + c.subtotal, 0);
  const indirectos = subtotalDirecto * (num(params.indirectos) / 100);
  const imprevistos = subtotalDirecto * (num(params.imprevistos) / 100);
  const total = subtotalDirecto + indirectos + imprevistos;
  return { capitulos, subtotalDirecto, indirectos, imprevistos, total };
}

const STORAGE_KEYS = {
  priceBook: 'prisma:pricebook:v1',
  historial: 'prisma:historial:v1',
};

async function storageGet(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}
async function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function DiamondToggle({
  checked,
  onChange,
  labelOn = 'Aplica',
  labelOff = 'No Aplica',
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="group flex items-center gap-2.5 shrink-0 focus:outline-none"
      aria-pressed={checked}
    >
      <span className="relative w-6 h-6 shrink-0">
        <span
          className="absolute inset-0 rotate-45 rounded-[3px] border-2 transition-colors duration-150"
          style={{
            borderColor: checked ? 'var(--pr-green)' : 'var(--pr-line)',
            background: checked ? 'var(--pr-green)' : 'transparent',
          }}
        />
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className="absolute inset-0 w-6 h-6 p-1.5"
            fill="none"
            stroke="#0B1210"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="5,13 10,18 19,7" />
          </svg>
        )}
      </span>
      <span
        className="text-[11px] font-bold tracking-wide uppercase"
        style={{ color: checked ? 'var(--pr-green-ink)' : 'var(--pr-muted)' }}
      >
        {checked ? labelOn : labelOff}
      </span>
    </button>
  );
}

function Field({ label, children, hint, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)] mb-1.5">
          {label}
        </span>
      )}
      {children}
      {hint && (
        <span className="block text-[11px] text-[color:var(--pr-muted)] mt-1">
          {hint}
        </span>
      )}
    </label>
  );
}

const inputCls =
  'w-full rounded-md border border-[color:var(--pr-line)] bg-white px-3 py-2 text-[14px] text-[color:var(--pr-ink)] placeholder:text-[color:var(--pr-muted)]/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--pr-green)] focus:border-[color:var(--pr-green)] transition-shadow';

function TextInput(props) {
  return (
    <input {...props} className={`${inputCls} ${props.className || ''}`} />
  );
}
function NumberInput(props) {
  return (
    <input
      type="number"
      inputMode="decimal"
      {...props}
      className={`${inputCls} tabular-nums ${props.className || ''}`}
    />
  );
}
function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${inputCls} appearance-none pr-9 ${props.className || ''}`}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--pr-muted)]"
      />
    </div>
  );
}

function IconBtn({
  onClick,
  children,
  tone = 'ghost',
  type = 'button',
  className = '',
  title,
}) {
  const tones = {
    ghost:
      'text-[color:var(--pr-muted)] hover:text-[color:var(--pr-ink)] hover:bg-black/5',
    danger: 'text-[#B3392E] hover:bg-[#B3392E]/10',
    primary: 'text-white bg-[color:var(--pr-ink)] hover:bg-black',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${tones[tone]} ${className}`}
    >
      {children}
    </button>
  );
}

function Btn({
  children,
  onClick,
  variant = 'solid',
  className = '',
  type = 'button',
  disabled,
}) {
  const variants = {
    solid:
      'bg-[color:var(--pr-green)] text-[#0B1210] hover:brightness-95 shadow-sm',
    dark: 'bg-[color:var(--pr-ink)] text-white hover:bg-black',
    outline:
      'border border-[color:var(--pr-line)] text-[color:var(--pr-ink)] hover:bg-black/5 bg-white',
    ghost: 'text-[color:var(--pr-ink)] hover:bg-black/5',
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-bold uppercase tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  right,
  children,
  accent = false,
}) {
  return (
    <div
      className={`rounded-xl bg-white border ${
        accent
          ? 'border-[color:var(--pr-green)]'
          : 'border-[color:var(--pr-line)]'
      } overflow-hidden`}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[color:var(--pr-line)]">
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <span
              className="w-9 h-9 rounded-[8px] rotate-45 flex items-center justify-center shrink-0"
              style={{ background: 'var(--pr-ink)' }}
            >
              <Icon
                size={16}
                className="-rotate-45 text-[color:var(--pr-green)]"
              />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="font-display text-[15px] tracking-wide text-[color:var(--pr-ink)] truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[12px] text-[color:var(--pr-muted)] truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function BlueprintTexture({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 w-full h-full opacity-[0.05] ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="bp-grid"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M28 0 L0 0 0 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-grid)" />
    </svg>
  );
}

function PrismaMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <g transform="translate(20 20)">
        {[0, 90, 180, 270].map((r, i) => (
          <rect
            key={i}
            x="-9"
            y="-9"
            width="16"
            height="16"
            rx="1.5"
            transform={`rotate(${45 + r}) translate(6 6)`}
            fill="none"
            stroke="#22C55E"
            strokeWidth="1.2"
            opacity={i === 0 ? 1 : 0.55}
          />
        ))}
        <rect
          x="-7"
          y="-7"
          width="14"
          height="14"
          rx="1.5"
          transform="rotate(45)"
          fill="#22C55E"
        />
      </g>
    </svg>
  );
}

const STEPS = [
  { n: 1, label: 'Proyecto', icon: Building2 },
  { n: 2, label: 'Partidas', icon: ClipboardList },
  { n: 3, label: 'APU', icon: Calculator },
  { n: 4, label: 'Tarifario', icon: Database },
  { n: 5, label: 'Resumen', icon: FileText },
];

function Header({ screen, setScreen, cliente }) {
  return (
    <header
      className="no-print sticky top-0 z-30 text-white"
      style={{ background: 'var(--pr-ink)' }}
    >
      <div className="relative overflow-hidden">
        <BlueprintTexture className="text-[color:var(--pr-green)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <PrismaMark />
            <div className="min-w-0 leading-none">
              <div className="font-display text-[17px] tracking-[0.08em]">
                PRISMA{' '}
                <span className="text-[color:var(--pr-green)]">
                  ARQUITECTURA
                </span>
              </div>
              <div className="text-[10.5px] text-white/50 tracking-wide uppercase mt-0.5 truncate">
                Paramétrico — {cliente ? cliente : 'Nuevo presupuesto'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 flex items-stretch overflow-x-auto">
          {STEPS.map((s) => {
            const active = screen === s.n;
            const done = screen > s.n;
            return (
              <button
                key={s.n}
                onClick={() => setScreen(s.n)}
                className="relative flex items-center gap-2 px-3.5 sm:px-4 py-3 shrink-0 group"
              >
                <span
                  className="w-5 h-5 rotate-45 rounded-[3px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    borderColor:
                      active || done
                        ? 'var(--pr-green)'
                        : 'rgba(255,255,255,0.25)',
                    background: active
                      ? 'var(--pr-green)'
                      : done
                      ? 'rgba(34,197,94,0.15)'
                      : 'transparent',
                  }}
                >
                  <span
                    className="-rotate-45 text-[10px] font-bold"
                    style={{
                      color: active
                        ? '#0B1210'
                        : done
                        ? 'var(--pr-green)'
                        : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {s.n}
                  </span>
                </span>
                <span
                  className={`text-[12px] font-bold uppercase tracking-wide whitespace-nowrap transition-colors ${
                    active
                      ? 'text-white'
                      : done
                      ? 'text-white/70'
                      : 'text-white/40'
                  }`}
                >
                  {s.label}
                </span>
                {active && (
                  <span className="absolute left-3.5 right-3.5 sm:left-4 sm:right-4 -bottom-px h-[2.5px] bg-[color:var(--pr-green)] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

function Screen1({ proyecto, setProyecto, params, setParams, onNext }) {
  const set = (k, v) => setProyecto((p) => ({ ...p, [k]: v }));
  return (
    <div className="space-y-5">
      <SectionCard
        icon={Building2}
        title="Registro de Proyecto y Cliente"
        subtitle="Información base para el presupuesto paramétrico"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nombre del Cliente">
            <TextInput
              value={proyecto.cliente}
              onChange={(e) => set('cliente', e.target.value)}
              placeholder="Ej. Familia Torres Domínguez"
            />
          </Field>
          <Field label="Ubicación / Dirección">
            <div className="relative">
              <MapPin
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--pr-muted)]"
              />
              <TextInput
                value={proyecto.ubicacion}
                onChange={(e) => set('ubicacion', e.target.value)}
                placeholder="Calle, colonia, ciudad"
                className="pl-9"
              />
            </div>
          </Field>
          <Field label="Tipo de Inmueble">
            <Select
              value={proyecto.tipo}
              onChange={(e) => set('tipo', e.target.value)}
            >
              {TIPOS_INMUEBLE.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Superficie a Intervenir (m²)">
            <div className="relative">
              <Ruler
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--pr-muted)]"
              />
              <NumberInput
                value={proyecto.superficie}
                onChange={(e) => set('superficie', e.target.value)}
                placeholder="0"
                className="pl-9"
                min="0"
              />
            </div>
          </Field>
        </div>
        <Field label="Nivel de Acabado Objetivo" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {NIVELES_ACABADO.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set('nivel', n)}
                className={`rounded-lg border px-3 py-3 text-[13px] font-bold uppercase tracking-wide transition-colors ${
                  proyecto.nivel === n
                    ? 'border-[color:var(--pr-green)] bg-[color:var(--pr-green)]/10 text-[color:var(--pr-green-ink)]'
                    : 'border-[color:var(--pr-line)] text-[color:var(--pr-muted)] hover:border-[color:var(--pr-ink)]/30'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </Field>
      </SectionCard>

      <SectionCard
        icon={Settings2}
        title="Parámetros Generales del Proyecto"
        subtitle="Editables por cotización — moneda MXN ($)"
      >
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            ['indirectos', 'Indirectos y Utilidad', '%'],
            ['herramientaMenor', 'Herramienta Menor (s/ M.O.)', '%'],
            ['imprevistos', 'Imprevistos / Contingencias', '%'],
            ['equipoSeguridad', 'Equipo de Seguridad (s/ M.O.)', '%'],
          ].map(([key, label]) => (
            <Field key={key} label={label}>
              <div className="relative">
                <NumberInput
                  value={params[key]}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, [key]: e.target.value }))
                  }
                  min="0"
                  step="0.5"
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[color:var(--pr-muted)]">
                  %
                </span>
              </div>
            </Field>
          ))}
        </div>
        <p className="text-[12px] text-[color:var(--pr-muted)] mt-4">
          Marcas y proveedores predeterminados: {MARCAS.join(' · ')}.
        </p>
      </SectionCard>

      <div className="flex justify-end">
        <Btn onClick={onNext}>
          Continuar a Partidas <ArrowRight size={15} />
        </Btn>
      </div>
    </div>
  );
}

function CapituloShell({
  meta,
  aplica,
  onToggle,
  subtotal,
  children,
  defaultOpen,
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  useEffect(() => {
    if (aplica) setOpen(true);
  }, [aplica]);
  const Icon = meta.icon;
  return (
    <div className="rounded-xl bg-white border border-[color:var(--pr-line)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4">
        <button
          onClick={() => aplica && setOpen((o) => !o)}
          className="flex items-center gap-3 min-w-0 text-left flex-1"
        >
          <span
            className="w-9 h-9 rounded-[8px] rotate-45 flex items-center justify-center shrink-0"
            style={{ background: aplica ? 'var(--pr-ink)' : '#EDEDE8' }}
          >
            <Icon
              size={16}
              className="-rotate-45"
              style={{ color: aplica ? 'var(--pr-green)' : 'var(--pr-muted)' }}
            />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[14.5px] tracking-wide text-[color:var(--pr-ink)] truncate">
              {meta.nombre}
            </span>
            {aplica && subtotal > 0 && (
              <span className="block text-[12px] text-[color:var(--pr-muted)] tabular-nums">
                {money(subtotal)}
              </span>
            )}
          </span>
        </button>
        <div className="flex items-center gap-3 shrink-0">
          <DiamondToggle checked={aplica} onChange={onToggle} />
          {aplica && (
            <ChevronDown
              size={18}
              className={`text-[color:var(--pr-muted)] transition-transform ${
                open ? 'rotate-180' : ''
              }`}
              onClick={() => setOpen((o) => !o)}
            />
          )}
        </div>
      </div>
      {aplica && open && (
        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[color:var(--pr-line)]">
          {children}
        </div>
      )}
    </div>
  );
}

function RowList({ children, onAdd, addLabel }) {
  return (
    <div className="space-y-2.5">
      {children}
      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-[color:var(--pr-line)] py-2.5 text-[12.5px] font-bold uppercase tracking-wide text-[color:var(--pr-muted)] hover:border-[color:var(--pr-green)] hover:text-[color:var(--pr-green-ink)] transition-colors"
      >
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  );
}

function Screen2({ partidas, setPartidas, priceBook, params }) {
  const update = (key, fn) =>
    setPartidas((prev) => ({ ...prev, [key]: fn(prev[key]) }));
  const preview = useMemo(
    () => calcularPresupuesto(partidas, priceBook, params),
    [partidas, priceBook, params]
  );
  const subtotalOf = (key) =>
    preview.capitulos.find((c) => c.key === key)?.subtotal || 0;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-dashed border-[color:var(--pr-line)] bg-white/60 px-4 py-3 text-[12.5px] text-[color:var(--pr-muted)]">
        Activa cada partida con el interruptor. Las partidas en <b>No Aplica</b>{' '}
        se ocultan y no se incluyen en el resumen ni en el PDF.
      </div>

      <CapituloShell
        meta={CAPITULOS_META[0]}
        aplica={partidas.preliminares.aplica}
        subtotal={subtotalOf('preliminares')}
        onToggle={(v) => update('preliminares', (p) => ({ ...p, aplica: v }))}
      >
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Trazo y Nivelación (m²)">
              <NumberInput
                value={partidas.preliminares.trazo.m2}
                onChange={(e) =>
                  update('preliminares', (p) => ({
                    ...p,
                    trazo: { ...p.trazo, m2: e.target.value },
                  }))
                }
                placeholder="0"
                min="0"
              />
            </Field>
            <Field
              label="Precio Unitario Rápido (opcional)"
              hint="Si se deja vacío, aplica la matriz base de la app."
            >
              <NumberInput
                value={partidas.preliminares.trazo.puRapido}
                onChange={(e) =>
                  update('preliminares', (p) => ({
                    ...p,
                    trazo: { ...p.trazo, puRapido: e.target.value },
                  }))
                }
                placeholder="$/m²"
                min="0"
              />
            </Field>
          </div>

          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)] mb-2">
              Módulo de Demoliciones
            </span>
            <RowList
              addLabel="Agregar Demolición"
              onAdd={() =>
                update('preliminares', (p) => ({
                  ...p,
                  demoliciones: [
                    ...p.demoliciones,
                    { id: uid(), tipo: 'mamposteria', m2: '' },
                  ],
                }))
              }
            >
              {partidas.preliminares.demoliciones.map((d) => (
                <div key={d.id} className="flex items-center gap-2">
                  <Select
                    value={d.tipo}
                    onChange={(e) =>
                      update('preliminares', (p) => ({
                        ...p,
                        demoliciones: p.demoliciones.map((x) =>
                          x.id === d.id ? { ...x, tipo: e.target.value } : x
                        ),
                      }))
                    }
                    className="flex-1"
                  >
                    <option value="mamposteria">Muro de Mampostería</option>
                    <option value="ligero">
                      Muro Ligero (Panel de Yeso/Durock)
                    </option>
                  </Select>
                  <NumberInput
                    value={d.m2}
                    onChange={(e) =>
                      update('preliminares', (p) => ({
                        ...p,
                        demoliciones: p.demoliciones.map((x) =>
                          x.id === d.id ? { ...x, m2: e.target.value } : x
                        ),
                      }))
                    }
                    placeholder="m²"
                    className="w-28"
                    min="0"
                  />
                  <IconBtn
                    tone="danger"
                    onClick={() =>
                      update('preliminares', (p) => ({
                        ...p,
                        demoliciones: p.demoliciones.filter(
                          (x) => x.id !== d.id
                        ),
                      }))
                    }
                  >
                    <Trash2 size={15} />
                  </IconBtn>
                </div>
              ))}
            </RowList>
          </div>

          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)] mb-2">
              Conceptos Personalizados
            </span>
            <RowList
              addLabel="Agregar Concepto"
              onAdd={() =>
                update('preliminares', (p) => ({
                  ...p,
                  conceptosExtra: [
                    ...p.conceptosExtra,
                    {
                      id: uid(),
                      nombre: '',
                      cantidad: '',
                      unidad: 'pza',
                      pu: '',
                    },
                  ],
                }))
              }
            >
              {partidas.preliminares.conceptosExtra.map((c) => (
                <div
                  key={c.id}
                  className="grid grid-cols-[1fr_70px_70px_90px_auto] gap-2 items-center"
                >
                  <TextInput
                    value={c.nombre}
                    onChange={(e) =>
                      update('preliminares', (p) => ({
                        ...p,
                        conceptosExtra: p.conceptosExtra.map((x) =>
                          x.id === c.id ? { ...x, nombre: e.target.value } : x
                        ),
                      }))
                    }
                    placeholder="Descripción del concepto"
                  />
                  <NumberInput
                    value={c.cantidad}
                    onChange={(e) =>
                      update('preliminares', (p) => ({
                        ...p,
                        conceptosExtra: p.conceptosExtra.map((x) =>
                          x.id === c.id ? { ...x, cantidad: e.target.value } : x
                        ),
                      }))
                    }
                    placeholder="Cant."
                    min="0"
                  />
                  <TextInput
                    value={c.unidad}
                    onChange={(e) =>
                      update('preliminares', (p) => ({
                        ...p,
                        conceptosExtra: p.conceptosExtra.map((x) =>
                          x.id === c.id ? { ...x, unidad: e.target.value } : x
                        ),
                      }))
                    }
                    placeholder="Und."
                  />
                  <NumberInput
                    value={c.pu}
                    onChange={(e) =>
                      update('preliminares', (p) => ({
                        ...p,
                        conceptosExtra: p.conceptosExtra.map((x) =>
                          x.id === c.id ? { ...x, pu: e.target.value } : x
                        ),
                      }))
                    }
                    placeholder="P.U. $"
                    min="0"
                  />
                  <IconBtn
                    tone="danger"
                    onClick={() =>
                      update('preliminares', (p) => ({
                        ...p,
                        conceptosExtra: p.conceptosExtra.filter(
                          (x) => x.id !== c.id
                        ),
                      }))
                    }
                  >
                    <Trash2 size={15} />
                  </IconBtn>
                </div>
              ))}
            </RowList>
          </div>
        </div>
      </CapituloShell>

      <CapituloShell
        meta={CAPITULOS_META[1]}
        aplica={partidas.albanileria.aplica}
        subtotal={subtotalOf('albanileria')}
        onToggle={(v) => update('albanileria', (p) => ({ ...p, aplica: v }))}
      >
        <div className="space-y-5">
          <Field label="Sistema de Muro">
            <Select
              value={partidas.albanileria.muros.sistema || 'Tabique'}
              onChange={(e) =>
                update('albanileria', (p) => ({
                  ...p,
                  muros: { ...p.muros, sistema: e.target.value },
                }))
              }
            >
              {SISTEMAS_MURO.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label={
              partidas.albanileria.muros.sistema === 'Tabique'
                ? 'Muros de Mampostería — Tabique Rojo Recocido (m²)'
                : 'Muro Ligero — Superficie (m²)'
            }
            hint={
              partidas.albanileria.muros.sistema === 'Tabique'
                ? 'Matriz base conservadora estandarizada para blindar el margen financiero paramétrico.'
                : 'El costo por m² ya incluye bastidor metálico, panel en ambas caras, fijaciones y tratamiento de juntas.'
            }
          >
            <NumberInput
              value={partidas.albanileria.muros.m2}
              onChange={(e) =>
                update('albanileria', (p) => ({
                  ...p,
                  muros: { ...p.muros, m2: e.target.value },
                }))
              }
              placeholder="0"
              min="0"
            />
          </Field>

          {partidas.albanileria.muros.sistema === 'Tabique' && (
            <div className="rounded-lg border border-[color:var(--pr-line)] p-4 space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)]">
                  Configuración de Caras
                </span>
                <button
                  type="button"
                  onClick={() =>
                    update('albanileria', (p) => ({
                      ...p,
                      muros: {
                        ...p.muros,
                        mismoAcabado: !p.muros.mismoAcabado,
                        caraB: p.muros.caraA,
                      },
                    }))
                  }
                  className={`text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors ${
                    partidas.albanileria.muros.mismoAcabado
                      ? 'border-[color:var(--pr-green)] bg-[color:var(--pr-green)]/10 text-[color:var(--pr-green-ink)]'
                      : 'border-[color:var(--pr-line)] text-[color:var(--pr-muted)]'
                  }`}
                >
                  Ambas Caras con el Mismo Acabado
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Cara A">
                  <Select
                    value={partidas.albanileria.muros.caraA}
                    onChange={(e) =>
                      update('albanileria', (p) => ({
                        ...p,
                        muros: {
                          ...p.muros,
                          caraA: e.target.value,
                          caraB: p.muros.mismoAcabado
                            ? e.target.value
                            : p.muros.caraB,
                        },
                      }))
                    }
                  >
                    {TIPOS_ACABADO_MURO.map((t) => (
                      <option key={t} value={t}>
                        {t === 'Enjarre'
                          ? 'Enjarre o Aplanado Cemento-Arena'
                          : t}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Cara B">
                  <Select
                    disabled={partidas.albanileria.muros.mismoAcabado}
                    value={
                      partidas.albanileria.muros.mismoAcabado
                        ? partidas.albanileria.muros.caraA
                        : partidas.albanileria.muros.caraB
                    }
                    onChange={(e) =>
                      update('albanileria', (p) => ({
                        ...p,
                        muros: { ...p.muros, caraB: e.target.value },
                      }))
                    }
                    className={
                      partidas.albanileria.muros.mismoAcabado
                        ? 'opacity-60'
                        : ''
                    }
                  >
                    {TIPOS_ACABADO_MURO.map((t) => (
                      <option key={t} value={t}>
                        {t === 'Enjarre'
                          ? 'Enjarre o Aplanado Cemento-Arena'
                          : t}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            </div>
          )}

          <Field label="Firmes Interiores — Concreto f'c=200 kg/cm² (m²)">
            <NumberInput
              value={partidas.albanileria.firmes.m2}
              onChange={(e) =>
                update('albanileria', (p) => ({
                  ...p,
                  firmes: { m2: e.target.value },
                }))
              }
              placeholder="0"
              min="0"
            />
          </Field>

          <div className="rounded-lg border border-[color:var(--pr-line)] p-4 space-y-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)]">
              Plafones
            </span>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Tipo de Plafón">
                <Select
                  value={
                    partidas.albanileria.plafones?.tipo || 'TablarocaCorrido'
                  }
                  onChange={(e) =>
                    update('albanileria', (p) => ({
                      ...p,
                      plafones: { ...p.plafones, tipo: e.target.value },
                    }))
                  }
                >
                  {TIPOS_PLAFON.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Superficie (m²)">
                <NumberInput
                  value={partidas.albanileria.plafones?.m2 || ''}
                  onChange={(e) =>
                    update('albanileria', (p) => ({
                      ...p,
                      plafones: { ...p.plafones, m2: e.target.value },
                    }))
                  }
                  placeholder="0"
                  min="0"
                />
              </Field>
            </div>
            <p className="text-[11px] text-[color:var(--pr-muted)]">
              Incluye estructura de suspensión, panel y tratamiento de juntas (o
              kit completo en el sistema reticular).
            </p>
          </div>
        </div>
      </CapituloShell>

      <CapituloShell
        meta={CAPITULOS_META[2]}
        aplica={partidas.estructuras.aplica}
        subtotal={subtotalOf('estructuras')}
        onToggle={(v) => update('estructuras', (p) => ({ ...p, aplica: v }))}
      >
        <RowList
          addLabel="Agregar Elemento Estructural"
          onAdd={() =>
            update('estructuras', (p) => ({
              ...p,
              elementos: [
                ...p.elementos,
                {
                  id: uid(),
                  tipo: 'Columna',
                  ancho: '',
                  peralte: '',
                  longitud: '',
                },
              ],
            }))
          }
        >
          {partidas.estructuras.elementos.map((el) => (
            <div
              key={el.id}
              className="rounded-lg border border-[color:var(--pr-line)] p-3.5"
            >
              <div className="grid sm:grid-cols-[1.3fr_1fr_1fr_1fr_auto] gap-2.5 items-end">
                <Field label="Elemento">
                  <Select
                    value={el.tipo}
                    onChange={(e) =>
                      update('estructuras', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id ? { ...x, tipo: e.target.value } : x
                        ),
                      }))
                    }
                  >
                    {TIPOS_ESTRUCTURA.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Ancho (cm)">
                  <NumberInput
                    value={el.ancho}
                    onChange={(e) =>
                      update('estructuras', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id ? { ...x, ancho: e.target.value } : x
                        ),
                      }))
                    }
                    min="0"
                  />
                </Field>
                <Field label="Peralte (cm)">
                  <NumberInput
                    value={el.peralte}
                    onChange={(e) =>
                      update('estructuras', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id ? { ...x, peralte: e.target.value } : x
                        ),
                      }))
                    }
                    min="0"
                  />
                </Field>
                <Field label="Altura / Long. (m)">
                  <NumberInput
                    value={el.longitud}
                    onChange={(e) =>
                      update('estructuras', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id
                            ? { ...x, longitud: e.target.value }
                            : x
                        ),
                      }))
                    }
                    min="0"
                  />
                </Field>
                <IconBtn
                  tone="danger"
                  onClick={() =>
                    update('estructuras', (p) => ({
                      ...p,
                      elementos: p.elementos.filter((x) => x.id !== el.id),
                    }))
                  }
                >
                  <Trash2 size={15} />
                </IconBtn>
              </div>
            </div>
          ))}
        </RowList>
        <p className="text-[11px] text-[color:var(--pr-muted)] mt-3">
          Cálculo de armado mínimo automático con f'y=4200 kg/cm²
          (estribos/anillos incluidos en cuantía), concreto y cimbra. Ver
          desglose en Pantalla 3 — Módulo APU.
        </p>
      </CapituloShell>

      <CapituloShell
        meta={CAPITULOS_META[3]}
        aplica={partidas.acabados.aplica}
        subtotal={subtotalOf('acabados')}
        onToggle={(v) => update('acabados', (p) => ({ ...p, aplica: v }))}
      >
        <div className="space-y-4">
          <Field label="Tipo de Aplicación">
            <div className="grid grid-cols-2 gap-2.5">
              {[
                ['vinilica', 'Pintura Vinílica (2 manos)'],
                ['pasta', 'Pasta Texturizada'],
              ].map(([v, l]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() =>
                    update('acabados', (p) => ({
                      ...p,
                      pintura: { ...p.pintura, tipo: v },
                    }))
                  }
                  className={`rounded-lg border px-3 py-2.5 text-[12.5px] font-bold text-left transition-colors ${
                    partidas.acabados.pintura.tipo === v
                      ? 'border-[color:var(--pr-green)] bg-[color:var(--pr-green)]/10 text-[color:var(--pr-green-ink)]'
                      : 'border-[color:var(--pr-line)] text-[color:var(--pr-muted)]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Muros (m²)">
              <NumberInput
                value={partidas.acabados.pintura.m2Muros}
                onChange={(e) =>
                  update('acabados', (p) => ({
                    ...p,
                    pintura: { ...p.pintura, m2Muros: e.target.value },
                  }))
                }
                placeholder="0"
                min="0"
              />
            </Field>
            <Field label="Plafones (m²)">
              <NumberInput
                value={partidas.acabados.pintura.m2Plafones}
                onChange={(e) =>
                  update('acabados', (p) => ({
                    ...p,
                    pintura: { ...p.pintura, m2Plafones: e.target.value },
                  }))
                }
                placeholder="0"
                min="0"
              />
            </Field>
          </div>
        </div>
      </CapituloShell>

      <CapituloShell
        meta={CAPITULOS_META[4]}
        aplica={partidas.pisos.aplica}
        subtotal={subtotalOf('pisos')}
        onToggle={(v) => update('pisos', (p) => ({ ...p, aplica: v }))}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Selector de Tipo">
            <Select
              value={partidas.pisos.tipo}
              onChange={(e) =>
                update('pisos', (p) => ({ ...p, tipo: e.target.value }))
              }
            >
              {TIPOS_PISO.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Superficie (m²)">
            <NumberInput
              value={partidas.pisos.m2}
              onChange={(e) =>
                update('pisos', (p) => ({ ...p, m2: e.target.value }))
              }
              placeholder="0"
              min="0"
            />
          </Field>
        </div>
        <p className="text-[11px] text-[color:var(--pr-muted)] mt-3">
          Incluye automáticamente matriz de adhesivo / bajo-piso y mano de obra
          por m².
        </p>
      </CapituloShell>

      <CapituloShell
        meta={CAPITULOS_META[5]}
        aplica={partidas.canceleria.aplica}
        subtotal={subtotalOf('canceleria')}
        onToggle={(v) => update('canceleria', (p) => ({ ...p, aplica: v }))}
      >
        <RowList
          addLabel="Agregar Vano (Puerta / Ventana)"
          onAdd={() =>
            update('canceleria', (p) => ({
              ...p,
              elementos: [
                ...p.elementos,
                {
                  id: uid(),
                  material: 'Aluminio (2")',
                  elemento: 'Ventana',
                  apertura: 'Corrediza',
                  ancho: '',
                  alto: '',
                  modulaciones: 1,
                },
              ],
            }))
          }
        >
          {partidas.canceleria.elementos.map((el) => (
            <div
              key={el.id}
              className="rounded-lg border border-[color:var(--pr-line)] p-3.5 space-y-2.5"
            >
              <div className="grid sm:grid-cols-3 gap-2.5">
                <Field label="Material">
                  <Select
                    value={el.material}
                    onChange={(e) =>
                      update('canceleria', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id
                            ? { ...x, material: e.target.value }
                            : x
                        ),
                      }))
                    }
                  >
                    {Object.keys(MATERIALES_CANCELERIA).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                    <option value="Herrería Estructural">
                      Herrería Estructural
                    </option>
                  </Select>
                </Field>
                <Field label="Elemento">
                  <Select
                    value={el.elemento}
                    onChange={(e) =>
                      update('canceleria', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id
                            ? { ...x, elemento: e.target.value }
                            : x
                        ),
                      }))
                    }
                  >
                    <option value="Puerta">Puerta</option>
                    <option value="Ventana">Ventana</option>
                  </Select>
                </Field>
                <Field label="Apertura">
                  <Select
                    value={el.apertura}
                    onChange={(e) =>
                      update('canceleria', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id
                            ? { ...x, apertura: e.target.value }
                            : x
                        ),
                      }))
                    }
                  >
                    <option>Fijo</option>
                    <option>Corrediza</option>
                    <option>Abatible</option>
                  </Select>
                </Field>
              </div>
              <div className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-2.5 items-end">
                <Field label="Ancho (cm)">
                  <NumberInput
                    value={el.ancho}
                    onChange={(e) =>
                      update('canceleria', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id ? { ...x, ancho: e.target.value } : x
                        ),
                      }))
                    }
                    min="0"
                  />
                </Field>
                <Field label="Alto (cm)">
                  <NumberInput
                    value={el.alto}
                    onChange={(e) =>
                      update('canceleria', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id ? { ...x, alto: e.target.value } : x
                        ),
                      }))
                    }
                    min="0"
                  />
                </Field>
                <Field label="Modulaciones">
                  <NumberInput
                    value={el.modulaciones}
                    onChange={(e) =>
                      update('canceleria', (p) => ({
                        ...p,
                        elementos: p.elementos.map((x) =>
                          x.id === el.id
                            ? { ...x, modulaciones: e.target.value }
                            : x
                        ),
                      }))
                    }
                    min="1"
                  />
                </Field>
                <IconBtn
                  tone="danger"
                  onClick={() =>
                    update('canceleria', (p) => ({
                      ...p,
                      elementos: p.elementos.filter((x) => x.id !== el.id),
                    }))
                  }
                >
                  <Trash2 size={15} />
                </IconBtn>
              </div>
            </div>
          ))}
        </RowList>
      </CapituloShell>

      <CapituloShell
        meta={CAPITULOS_META[6]}
        aplica={partidas.instalaciones.aplica}
        subtotal={subtotalOf('instalaciones')}
        onToggle={(v) => update('instalaciones', (p) => ({ ...p, aplica: v }))}
      >
        <div className="space-y-5">
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)] mb-2">
              <Zap size={13} /> Eléctrica — Cotización por Salida
            </span>
            <p className="text-[11px] text-[color:var(--pr-muted)] mb-2.5">
              Regla de 3 Metros: la matriz base incluye hasta 3.00 m de
              canalización y cableado desde el centro de carga.
            </p>
            <RowList
              addLabel="Agregar Salida Eléctrica"
              onAdd={() =>
                update('instalaciones', (p) => ({
                  ...p,
                  electrica: [
                    ...p.electrica,
                    {
                      id: uid(),
                      tipo: 'Contacto',
                      cantidad: '',
                      metrosAdicionales: '',
                    },
                  ],
                }))
              }
            >
              {partidas.instalaciones.electrica.map((s) => (
                <div
                  key={s.id}
                  className="grid grid-cols-[1.2fr_80px_110px_auto] gap-2 items-center"
                >
                  <Select
                    value={s.tipo}
                    onChange={(e) =>
                      update('instalaciones', (p) => ({
                        ...p,
                        electrica: p.electrica.map((x) =>
                          x.id === s.id ? { ...x, tipo: e.target.value } : x
                        ),
                      }))
                    }
                  >
                    {TIPOS_SALIDA_ELECTRICA.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                  <NumberInput
                    value={s.cantidad}
                    onChange={(e) =>
                      update('instalaciones', (p) => ({
                        ...p,
                        electrica: p.electrica.map((x) =>
                          x.id === s.id ? { ...x, cantidad: e.target.value } : x
                        ),
                      }))
                    }
                    placeholder="Cant."
                    min="0"
                  />
                  <NumberInput
                    value={s.metrosAdicionales}
                    onChange={(e) =>
                      update('instalaciones', (p) => ({
                        ...p,
                        electrica: p.electrica.map((x) =>
                          x.id === s.id
                            ? { ...x, metrosAdicionales: e.target.value }
                            : x
                        ),
                      }))
                    }
                    placeholder="+ ml c/u"
                    min="0"
                  />
                  <IconBtn
                    tone="danger"
                    onClick={() =>
                      update('instalaciones', (p) => ({
                        ...p,
                        electrica: p.electrica.filter((x) => x.id !== s.id),
                      }))
                    }
                  >
                    <Trash2 size={15} />
                  </IconBtn>
                </div>
              ))}
            </RowList>
          </div>
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)] mb-2">
              <Droplets size={13} /> Hidráulica y Sanitaria — Cotización por
              Salida
            </span>
            <RowList
              addLabel="Agregar Salida Hidrosanitaria"
              onAdd={() =>
                update('instalaciones', (p) => ({
                  ...p,
                  hidraulica: [
                    ...p.hidraulica,
                    { id: uid(), tipo: 'Lavabo', cantidad: '' },
                  ],
                }))
              }
            >
              {partidas.instalaciones.hidraulica.map((s) => (
                <div
                  key={s.id}
                  className="grid grid-cols-[1.2fr_80px_auto] gap-2 items-center"
                >
                  <Select
                    value={s.tipo}
                    onChange={(e) =>
                      update('instalaciones', (p) => ({
                        ...p,
                        hidraulica: p.hidraulica.map((x) =>
                          x.id === s.id ? { ...x, tipo: e.target.value } : x
                        ),
                      }))
                    }
                  >
                    {TIPOS_SALIDA_HIDRAULICA.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                  <NumberInput
                    value={s.cantidad}
                    onChange={(e) =>
                      update('instalaciones', (p) => ({
                        ...p,
                        hidraulica: p.hidraulica.map((x) =>
                          x.id === s.id ? { ...x, cantidad: e.target.value } : x
                        ),
                      }))
                    }
                    placeholder="Cant."
                    min="0"
                  />
                  <IconBtn
                    tone="danger"
                    onClick={() =>
                      update('instalaciones', (p) => ({
                        ...p,
                        hidraulica: p.hidraulica.filter((x) => x.id !== s.id),
                      }))
                    }
                  >
                    <Trash2 size={15} />
                  </IconBtn>
                </div>
              ))}
            </RowList>
          </div>
        </div>
      </CapituloShell>
    </div>
  );
}

function APUItemCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-[color:var(--pr-line)] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-black/[0.02] transition-colors"
      >
        <div className="min-w-0">
          <div className="text-[13.5px] font-semibold text-[color:var(--pr-ink)] truncate">
            {item.concepto}
          </div>
          <div className="text-[11.5px] text-[color:var(--pr-muted)] tabular-nums">
            {item.cantidad} {item.unidad} × {money(item.puTotal)}{' '}
            {item.manual && '(precio manual)'}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-display text-[14px] tabular-nums text-[color:var(--pr-ink)]">
            {money(item.total)}
          </span>
          <ChevronDown
            size={16}
            className={`text-[color:var(--pr-muted)] transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-[color:var(--pr-line)] bg-[color:var(--pr-canvas)]/40">
          {item.manual ? (
            <p className="text-[12px] text-[color:var(--pr-muted)] pt-3">
              Concepto con precio unitario capturado manualmente — no usa matriz
              de la app.
            </p>
          ) : (
            <div className="pt-3 space-y-3 text-[12.5px]">
              {item.matDetalle?.length > 0 && (
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-wide text-[color:var(--pr-muted)] mb-1.5">
                    Insumos / Materiales
                  </div>
                  <div className="space-y-1">
                    {item.matDetalle.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-2 tabular-nums"
                      >
                        <span className="flex items-center gap-1.5 text-[color:var(--pr-ink)] truncate">
                          {m.codigo && (
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/5 text-[color:var(--pr-muted)] shrink-0">
                              {m.codigo}
                            </span>
                          )}
                          <span className="truncate">{m.descripcion}</span>
                        </span>
                        <span className="text-[color:var(--pr-muted)] shrink-0">
                          {m.cantidad} {m.unidad} × {money(m.precio)} ={' '}
                          <b className="text-[color:var(--pr-ink)]">
                            {money(m.importe)}
                          </b>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="text-[10.5px] font-bold uppercase tracking-wide text-[color:var(--pr-muted)] mb-1.5">
                  Mano de Obra
                </div>
                <div className="flex items-center justify-between tabular-nums">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/5 text-[color:var(--pr-muted)] shrink-0">
                      {item.cuadrilla?.codigo}
                    </span>
                    <span className="truncate">
                      {item.cuadrilla?.descripcion}
                    </span>
                  </span>
                  <span className="text-[color:var(--pr-muted)] shrink-0">
                    Rend. {item.rendimiento} / jornada →{' '}
                    <b className="text-[color:var(--pr-ink)]">
                      {money(item.costoMO)}
                    </b>
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[10.5px] font-bold uppercase tracking-wide text-[color:var(--pr-muted)] mb-1.5">
                  Cargos Adicionales
                </div>
                <div className="flex items-center justify-between tabular-nums">
                  <span>Herramienta Menor</span>
                  <b className="text-[color:var(--pr-ink)]">
                    {money(item.herrMenor)}
                  </b>
                </div>
                <div className="flex items-center justify-between tabular-nums">
                  <span>Equipo de Seguridad</span>
                  <b className="text-[color:var(--pr-ink)]">
                    {money(item.eqSeguridad)}
                  </b>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Screen3({ partidas, priceBook, params }) {
  const presupuesto = useMemo(
    () => calcularPresupuesto(partidas, priceBook, params),
    [partidas, priceBook, params]
  );
  const activos = presupuesto.capitulos.filter(
    (c) => c.aplica && c.items.length > 0
  );

  if (activos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[color:var(--pr-line)] bg-white p-10 text-center">
        <Calculator
          size={28}
          className="mx-auto text-[color:var(--pr-muted)] mb-3"
        />
        <p className="text-[14px] font-semibold text-[color:var(--pr-ink)]">
          Aún no hay conceptos capturados
        </p>
        <p className="text-[13px] text-[color:var(--pr-muted)] mt-1">
          Activa partidas y captura cantidades en la Pantalla 2 para ver aquí el
          desglose de precios unitarios.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-dashed border-[color:var(--pr-line)] bg-white/60 px-4 py-3 text-[12.5px] text-[color:var(--pr-muted)]">
        Desglose dinámico de cada concepto: insumos, rendimiento de cuadrilla y
        cargos adicionales. Ajusta precios y rendimientos en la Pantalla 4 —
        Tarifario.
      </div>
      {activos.map((cap) => (
        <SectionCard
          key={cap.key}
          icon={cap.icon}
          title={cap.nombre}
          subtitle={`${cap.items.length} concepto${
            cap.items.length > 1 ? 's' : ''
          }`}
          right={
            <span className="font-display text-[15px] tabular-nums text-[color:var(--pr-ink)]">
              {money(cap.subtotal)}
            </span>
          }
        >
          <div className="space-y-2">
            {cap.items.map((it) => (
              <APUItemCard key={it.id} item={it} />
            ))}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

const TAB_CONFIG = {
  materiales: {
    label: 'Materiales',
    cols: [
      ['codigo', 'Código', 90],
      ['descripcion', 'Descripción', null],
      ['unidad', 'Unidad', 90],
      ['marca', 'Marca', 150],
      ['precio', 'Precio', 120],
    ],
  },
  manoObra: {
    label: 'Mano de Obra (Cuadrillas)',
    cols: [
      ['codigo', 'Código', 90],
      ['descripcion', 'Cuadrilla', null],
      ['integrantes', 'Integrantes', 100],
      ['unidad', 'Unidad', 90],
      ['precio', 'Precio Jornada', 130],
    ],
  },
  equipo: {
    label: 'Equipo y Maquinaria',
    cols: [
      ['codigo', 'Código', 90],
      ['descripcion', 'Descripción', null],
      ['unidad', 'Unidad', 90],
      ['precio', 'Precio', 120],
    ],
  },
};

function Screen4({ priceBook, setPriceBook, saving }) {
  const [tab, setTab] = useState('materiales');
  const cfg = TAB_CONFIG[tab];
  const rows = priceBook[tab];

  const updateRow = (id, field, value) => {
    setPriceBook((pb) => ({
      ...pb,
      [tab]: pb[tab].map((r) =>
        r.id === id
          ? {
              ...r,
              [field]:
                field === 'precio' || field === 'integrantes' ? value : value,
            }
          : r
      ),
    }));
  };
  const removeRow = (id) =>
    setPriceBook((pb) => ({
      ...pb,
      [tab]: pb[tab].filter((r) => r.id !== id),
    }));
  const addRow = () => {
    const prefix =
      tab === 'materiales' ? 'MAT' : tab === 'manoObra' ? 'MO' : 'EQ';
    const n = rows.length + 1;
    const codigo = `${prefix}-${String(n).padStart(2, '0')}-N`;
    const base = {
      id: uid(),
      codigo,
      descripcion: '',
      unidad: tab === 'manoObra' ? 'jornada' : 'm2',
      precio: 0,
    };
    if (tab === 'manoObra') base.integrantes = 2;
    if (tab === 'materiales') base.marca = '';
    setPriceBook((pb) => ({ ...pb, [tab]: [...pb[tab], base] }));
  };

  return (
    <div className="space-y-4">
      <SectionCard
        icon={Database}
        title="Tarifario y Base de Datos Dinámica"
        subtitle="Registros ilimitados — sincronizados de inmediato con el Módulo APU"
        right={
          saving && (
            <span className="flex items-center gap-1.5 text-[11px] text-[color:var(--pr-muted)]">
              <Loader2 size={13} className="animate-spin" /> Guardando…
            </span>
          )
        }
      >
        <div className="flex gap-2 mb-4 border-b border-[color:var(--pr-line)] -mt-1 pb-3 overflow-x-auto">
          {Object.entries(TAB_CONFIG).map(([k, c]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-3.5 py-2 rounded-lg text-[12.5px] font-bold uppercase tracking-wide whitespace-nowrap transition-colors ${
                tab === k
                  ? 'bg-[color:var(--pr-ink)] text-white'
                  : 'text-[color:var(--pr-muted)] hover:bg-black/5'
              }`}
            >
              {c.label}{' '}
              <span className="opacity-60">({priceBook[k].length})</span>
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-[13px] border-collapse min-w-[640px]">
            <thead>
              <tr className="text-[10.5px] font-bold uppercase tracking-wide text-[color:var(--pr-muted)]">
                {cfg.cols.map(([key, label, w]) => (
                  <th
                    key={key}
                    style={{ width: w || undefined }}
                    className="text-left px-2 py-2 border-b border-[color:var(--pr-line)]"
                  >
                    {label}
                  </th>
                ))}
                <th className="w-10 border-b border-[color:var(--pr-line)]"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-[color:var(--pr-line)]/60 hover:bg-black/[0.015]"
                >
                  {cfg.cols.map(([key]) => (
                    <td key={key} className="px-2 py-1.5">
                      {key === 'precio' ? (
                        <NumberInput
                          value={r.precio}
                          onChange={(e) =>
                            updateRow(
                              r.id,
                              'precio',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          min="0"
                          step="0.01"
                          className="py-1.5 text-right tabular-nums"
                        />
                      ) : key === 'marca' ? (
                        <Select
                          value={r.marca || ''}
                          onChange={(e) =>
                            updateRow(r.id, 'marca', e.target.value)
                          }
                          className="py-1.5"
                        >
                          <option value="">—</option>
                          {MARCAS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </Select>
                      ) : key === 'integrantes' ? (
                        <NumberInput
                          value={r.integrantes}
                          onChange={(e) =>
                            updateRow(
                              r.id,
                              'integrantes',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          min="1"
                          className="py-1.5"
                        />
                      ) : (
                        <TextInput
                          value={r[key] || ''}
                          onChange={(e) => updateRow(r.id, key, e.target.value)}
                          className="py-1.5 font-mono text-[12px]"
                          disabled={key === 'codigo'}
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-1">
                    <IconBtn tone="danger" onClick={() => removeRow(r.id)}>
                      <Trash2 size={14} />
                    </IconBtn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addRow}
          className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-[color:var(--pr-line)] py-2.5 text-[12.5px] font-bold uppercase tracking-wide text-[color:var(--pr-muted)] hover:border-[color:var(--pr-green)] hover:text-[color:var(--pr-green-ink)] transition-colors"
        >
          <Plus size={14} /> Agregar Nuevo Insumo / Cuadrilla
        </button>
      </SectionCard>
    </div>
  );
}

function LineaResumen({ label, value, bold, accent, big }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        big ? 'py-3' : 'py-2'
      }`}
    >
      <span
        className={`${bold ? 'font-bold' : ''} ${
          big ? 'font-display text-[15px] tracking-wide' : 'text-[13.5px]'
        }`}
        style={{ color: accent ? 'var(--pr-green-ink)' : 'var(--pr-ink)' }}
      >
        {label}
      </span>
      <span
        className={`tabular-nums ${bold ? 'font-bold' : ''} ${
          big ? 'font-display text-[22px]' : 'text-[13.5px]'
        }`}
        style={{ color: accent ? 'var(--pr-green-ink)' : 'var(--pr-ink)' }}
      >
        {value}
      </span>
    </div>
  );
}

function PrintReport({ proyecto, presupuesto, params }) {
  const activos = presupuesto.capitulos.filter(
    (c) => c.aplica && c.items.length > 0
  );
  const fecha = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="print-only hidden">
      <div className="p-10 text-[#14181B] text-[12px]">
        <div className="flex items-center justify-between border-b-2 border-[#14181B] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <PrismaMark size={36} />
            <div>
              <div className="font-display text-[20px] tracking-wide">
                PRISMA ARQUITECTURA
              </div>
              <div className="text-[11px] text-[#5B6560]">
                Presupuesto Paramétrico de Obra
              </div>
            </div>
          </div>
          <div className="text-right text-[11px] text-[#5B6560]">
            <div>Fecha: {fecha}</div>
            <div>Moneda: MXN ($)</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-[12px]">
          <div>
            <span className="font-bold">Cliente:</span>{' '}
            {proyecto.cliente || '—'}
          </div>
          <div>
            <span className="font-bold">Ubicación:</span>{' '}
            {proyecto.ubicacion || '—'}
          </div>
          <div>
            <span className="font-bold">Tipo de Inmueble:</span> {proyecto.tipo}
          </div>
          <div>
            <span className="font-bold">Superficie:</span>{' '}
            {proyecto.superficie || 0} m²
          </div>
          <div>
            <span className="font-bold">Nivel de Acabado:</span>{' '}
            {proyecto.nivel}
          </div>
        </div>

        {activos.map((cap) => (
          <div key={cap.key} className="mb-4 break-inside-avoid">
            <div className="font-display text-[13px] bg-black/5 px-2 py-1.5 mb-1">
              {cap.nombre}
            </div>
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="text-left text-[#5B6560]">
                  <th className="py-1">Concepto</th>
                  <th className="py-1 w-20">Cant.</th>
                  <th className="py-1 w-16">Und.</th>
                  <th className="py-1 w-24 text-right">P.U.</th>
                  <th className="py-1 w-28 text-right">Importe</th>
                </tr>
              </thead>
              <tbody>
                {cap.items.map((it) => (
                  <tr key={it.id} className="border-t border-black/10">
                    <td className="py-1 pr-2">{it.concepto}</td>
                    <td className="py-1 tabular-nums">{it.cantidad}</td>
                    <td className="py-1">{it.unidad}</td>
                    <td className="py-1 text-right tabular-nums">
                      {money(it.puTotal)}
                    </td>
                    <td className="py-1 text-right tabular-nums font-bold">
                      {money(it.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right text-[11.5px] font-bold mt-1">
              Subtotal: {money(cap.subtotal)}
            </div>
          </div>
        ))}

        <div className="mt-6 border-t-2 border-[#14181B] pt-3 ml-auto w-72 text-[12px]">
          <div className="flex justify-between py-0.5">
            <span>Subtotal Directo de Obra</span>
            <span className="tabular-nums">
              {money(presupuesto.subtotalDirecto)}
            </span>
          </div>
          <div className="flex justify-between py-0.5">
            <span>(+) Indirectos y Utilidad ({params.indirectos}%)</span>
            <span className="tabular-nums">
              {money(presupuesto.indirectos)}
            </span>
          </div>
          <div className="flex justify-between py-0.5">
            <span>(+) Reserva para Imprevistos ({params.imprevistos}%)</span>
            <span className="tabular-nums">
              {money(presupuesto.imprevistos)}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-t border-black/20 mt-1 font-bold text-[14px]">
            <span>Costo Total Paramétrico</span>
            <span className="tabular-nums">{money(presupuesto.total)}</span>
          </div>
          {num(proyecto.superficie) > 0 && (
            <div className="flex justify-between text-[11px] text-[#5B6560]">
              <span>Costo Paramétrico por m²</span>
              <span className="tabular-nums">
                {money(presupuesto.total / num(proyecto.superficie))} / m²
              </span>
            </div>
          )}
        </div>

        <div className="mt-10 pt-4 border-t border-black/10 text-[10px] text-[#5B6560] flex justify-between">
          <span>
            Prisma Arquitectura · Presupuesto paramétrico de referencia, sujeto
            a levantamiento y proyecto ejecutivo.
          </span>
          <span>contacto@prismaarquitectura.mx</span>
        </div>
      </div>
    </div>
  );
}

function Screen5({
  proyecto,
  presupuesto,
  params,
  onSave,
  historial,
  onLoadHistorial,
  onDeleteHistorial,
  savingHistorial,
}) {
  const porM2 =
    num(proyecto.superficie) > 0
      ? presupuesto.total / num(proyecto.superficie)
      : 0;
  const activos = presupuesto.capitulos.filter(
    (c) => c.aplica && c.items.length > 0
  );

  const resumenTexto = () => {
    let t = `*Presupuesto Paramétrico — Prisma Arquitectura*\nCliente: ${
      proyecto.cliente || '—'
    }\nUbicación: ${proyecto.ubicacion || '—'}\nSuperficie: ${
      proyecto.superficie || 0
    } m²\n\n`;
    activos.forEach((c) => {
      t += `${c.nombre}: ${money(c.subtotal)}\n`;
    });
    t += `\nSubtotal Directo: ${money(
      presupuesto.subtotalDirecto
    )}\nIndirectos y Utilidad (${params.indirectos}%): ${money(
      presupuesto.indirectos
    )}\nImprevistos (${params.imprevistos}%): ${money(
      presupuesto.imprevistos
    )}\n*Costo Total: ${money(presupuesto.total)}*`;
    return t;
  };

  const handleWhatsApp = () =>
    window.open(
      `https://wa.me/?text=${encodeURIComponent(resumenTexto())}`,
      '_blank'
    );
  const handleEmail = () =>
    window.open(
      `mailto:?subject=${encodeURIComponent(
        `Presupuesto Paramétrico — ${proyecto.cliente || 'Proyecto'}`
      )}&body=${encodeURIComponent(resumenTexto())}`,
      '_blank'
    );
  const handlePrint = () => window.print();

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <SectionCard icon={FileText} title="Resumen Paramétrico por Capítulo">
            {activos.length === 0 ? (
              <p className="text-[13px] text-[color:var(--pr-muted)]">
                No hay partidas activas. Regresa a la Pantalla 2 para capturar
                conceptos.
              </p>
            ) : (
              <div className="space-y-1 divide-y divide-[color:var(--pr-line)]/70">
                {activos.map((c) => (
                  <LineaResumen
                    key={c.key}
                    label={c.nombre}
                    value={money(c.subtotal)}
                  />
                ))}
              </div>
            )}
          </SectionCard>

          {historial.length > 0 && (
            <SectionCard
              icon={History}
              title="Historial de Presupuestos"
              subtitle={`${historial.length} guardado${
                historial.length > 1 ? 's' : ''
              }`}
            >
              <div className="space-y-2">
                {historial
                  .slice()
                  .reverse()
                  .map((h) => (
                    <div
                      key={h.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-[color:var(--pr-line)] px-3.5 py-2.5"
                    >
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold truncate">
                          {h.cliente || 'Sin nombre'}
                        </div>
                        <div className="text-[11px] text-[color:var(--pr-muted)]">
                          {h.fecha} · {money(h.total)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <IconBtn
                          onClick={() => onLoadHistorial(h)}
                          title="Cargar"
                        >
                          <FolderOpen size={14} />
                        </IconBtn>
                        <IconBtn
                          tone="danger"
                          onClick={() => onDeleteHistorial(h.id)}
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </IconBtn>
                      </div>
                    </div>
                  ))}
              </div>
            </SectionCard>
          )}
        </div>

        <div className="space-y-4">
          <div
            className="rounded-xl overflow-hidden border border-[color:var(--pr-line)]"
            style={{ background: 'var(--pr-ink)' }}
          >
            <div className="relative px-5 py-5">
              <BlueprintTexture className="text-[color:var(--pr-green)]" />
              <div className="relative divide-y divide-white/10 text-white">
                <div className="pb-2.5">
                  <LineaResumen
                    label="Subtotal Directo de Obra"
                    value={money(presupuesto.subtotalDirecto)}
                  />
                </div>
                <div className="py-2.5">
                  <LineaResumen
                    label={`(+) Indirectos y Utilidad (${params.indirectos}%)`}
                    value={money(presupuesto.indirectos)}
                  />
                </div>
                <div className="py-2.5">
                  <LineaResumen
                    label={`(+) Reserva para Imprevistos (${params.imprevistos}%)`}
                    value={money(presupuesto.imprevistos)}
                  />
                </div>
                <div className="pt-3">
                  <div className="text-[11px] uppercase tracking-wide text-[color:var(--pr-green)] font-bold mb-1">
                    Costo Total Paramétrico
                  </div>
                  <div className="font-display text-[30px] tabular-nums leading-none">
                    {money(presupuesto.total)}
                  </div>
                  {porM2 > 0 && (
                    <div className="text-[12px] text-white/50 mt-1.5 tabular-nums">
                      {money(porM2)} / m²
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <Btn onClick={handlePrint} className="w-full">
              <Download size={15} /> Generar y Exportar PDF Membretado
            </Btn>
            <div className="grid grid-cols-2 gap-2.5">
              <Btn variant="outline" onClick={handleWhatsApp}>
                <Send size={14} /> WhatsApp
              </Btn>
              <Btn variant="outline" onClick={handleEmail}>
                <Send size={14} /> Correo
              </Btn>
            </div>
            <Btn
              variant="dark"
              onClick={onSave}
              className="w-full"
              disabled={savingHistorial}
            >
              {savingHistorial ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}{' '}
              Guardar Presupuesto en Historial
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrismaApp() {
  const [screen, setScreen] = useState(1);
  const [proyecto, setProyecto] = useState(defaultProyecto());
  const [params, setParams] = useState(defaultParams());
  const [partidas, setPartidas] = useState(defaultPartidas());
  const [priceBook, setPriceBook] = useState(DEFAULT_PRICEBOOK);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingPB, setSavingPB] = useState(false);
  const [savingHist, setSavingHist] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      const [pb, hist] = await Promise.all([
        storageGet(STORAGE_KEYS.priceBook),
        storageGet(STORAGE_KEYS.historial),
      ]);
      if (pb) setPriceBook(pb);
      else await storageSet(STORAGE_KEYS.priceBook, DEFAULT_PRICEBOOK);
      if (hist) setHistorial(hist);
      setLoading(false);
    })();
  }, []);

  const firstPB = React.useRef(true);
  useEffect(() => {
    if (firstPB.current) {
      firstPB.current = false;
      return;
    }
    setSavingPB(true);
    const t = setTimeout(async () => {
      await storageSet(STORAGE_KEYS.priceBook, priceBook);
      setSavingPB(false);
    }, 500);
    return () => clearTimeout(t);
  }, [priceBook]);

  const presupuesto = useMemo(
    () => calcularPresupuesto(partidas, priceBook, params),
    [partidas, priceBook, params]
  );

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const handleGuardarHistorial = useCallback(async () => {
    setSavingHist(true);
    const entry = {
      id: uid(),
      fecha: new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      cliente: proyecto.cliente,
      total: presupuesto.total,
      proyecto,
      partidas,
      params,
    };
    const next = [...historial, entry];
    setHistorial(next);
    await storageSet(STORAGE_KEYS.historial, next);
    setSavingHist(false);
    showToast('Presupuesto guardado en historial');
  }, [historial, proyecto, partidas, params, presupuesto.total]);

  const handleCargarHistorial = (h) => {
    setProyecto(h.proyecto);
    setPartidas(h.partidas);
    setParams(h.params);
    setScreen(5);
    showToast('Presupuesto cargado');
  };

  const handleEliminarHistorial = async (id) => {
    const next = historial.filter((h) => h.id !== id);
    setHistorial(next);
    await storageSet(STORAGE_KEYS.historial, next);
  };

  const handleNuevo = () => {
    if (
      !confirm(
        '¿Iniciar un nuevo presupuesto? Se perderán los datos no guardados en historial.'
      )
    )
      return;
    setProyecto(defaultProyecto());
    setPartidas(defaultPartidas());
    setParams(defaultParams());
    setScreen(1);
  };

  if (loading) {
    return (
      <div
        className="min-h-[520px] flex items-center justify-center"
        style={{ background: 'var(--pr-canvas)' }}
      >
        <div className="flex flex-col items-center gap-3 text-[color:var(--pr-muted)]">
          <Loader2 size={26} className="animate-spin" />
          <span className="text-[13px] font-medium">Cargando tarifario…</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        '--pr-canvas': '#EEF0EC',
        '--pr-ink': '#14181B',
        '--pr-green': '#22C55E',
        '--pr-green-ink': '#15803D',
        '--pr-line': '#DDDFD8',
        '--pr-muted': '#697068',
      }}
      className="min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500&display=swap');
        .font-display { font-family: 'Archivo Black', 'Inter', sans-serif; }
        * { font-family: 'Inter', system-ui, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        .print-only { display: none; }
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; }
        }
      `}</style>
      <div
        style={{ background: 'var(--pr-canvas)', color: 'var(--pr-ink)' }}
        className="min-h-screen"
      >
        <Header
          screen={screen}
          setScreen={setScreen}
          cliente={proyecto.cliente}
        />

        <main className="no-print max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-16">
          {screen === 1 && (
            <Screen1
              proyecto={proyecto}
              setProyecto={setProyecto}
              params={params}
              setParams={setParams}
              onNext={() => setScreen(2)}
            />
          )}
          {screen === 2 && (
            <Screen2
              partidas={partidas}
              setPartidas={setPartidas}
              priceBook={priceBook}
              params={params}
            />
          )}
          {screen === 3 && (
            <Screen3
              partidas={partidas}
              priceBook={priceBook}
              params={params}
            />
          )}
          {screen === 4 && (
            <Screen4
              priceBook={priceBook}
              setPriceBook={setPriceBook}
              saving={savingPB}
            />
          )}
          {screen === 5 && (
            <Screen5
              proyecto={proyecto}
              presupuesto={presupuesto}
              params={params}
              onSave={handleGuardarHistorial}
              historial={historial}
              onLoadHistorial={handleCargarHistorial}
              onDeleteHistorial={handleEliminarHistorial}
              savingHistorial={savingHist}
            />
          )}

          {screen > 1 && (
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-[color:var(--pr-line)]">
              <Btn
                variant="ghost"
                onClick={() => setScreen((s) => Math.max(1, s - 1))}
              >
                <ArrowLeft size={15} /> Anterior
              </Btn>
              <div className="flex items-center gap-2.5">
                <Btn variant="outline" onClick={handleNuevo}>
                  <RefreshCw size={14} /> Nuevo Presupuesto
                </Btn>
                {screen < 5 && (
                  <Btn onClick={() => setScreen((s) => Math.min(5, s + 1))}>
                    Siguiente <ArrowRight size={15} />
                  </Btn>
                )}
              </div>
            </div>
          )}
        </main>

        <PrintReport
          proyecto={proyecto}
          presupuesto={presupuesto}
          params={params}
        />

        {toast && (
          <div className="no-print fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full bg-[color:var(--pr-ink)] text-white px-4 py-2.5 text-[13px] font-medium shadow-lg">
            <CheckCircle2 size={15} className="text-[color:var(--pr-green)]" />{' '}
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
