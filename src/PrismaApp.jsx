import React, { useState, useEffect, useMemo } from "react";
import {
  Building2, ClipboardList, Calculator, Database, FileText, Plus, Trash2,
  ChevronDown, Send, Save, Download, Settings2, Layers, Zap,
  Droplets, PaintBucket, DoorOpen, Boxes, History,
  ArrowLeft, ArrowRight, MapPin, Ruler, CheckCircle2,
  FolderOpen, HardHat, ShieldAlert, Sparkles
} from "lucide-react";

/* =========================================================================
   PRISMA ARQUITECTURA — PARAMÉTRICO (v5.2 Clean Fixed for Vite)
   Cotizador de campo y Análisis de Precios Unitarios (APU)
   ========================================================================= */

const uid = () => Math.random().toString(36).slice(2, 10);

const DEFAULT_MATERIALES = [
  { id: "tabique", codigo: "MAT-01", descripcion: "Tabique Rojo Recocido", unidad: "pza", precio: 8.5, marca: "Ferretería La Siete" },
  { id: "mortero", codigo: "MAT-02", descripcion: "Mortero Cemento-Arena (junteo)", unidad: "m3", precio: 3100, marca: "Cemex" },
  { id: "cemento_arena_aplanado", codigo: "MAT-03", descripcion: "Cemento-Arena p/Aplanado", unidad: "m2", precio: 55, marca: "Cemex" },
  { id: "yeso", codigo: "MAT-04", descripcion: "Yeso p/Aplanado", unidad: "m2", precio: 48, marca: "USG" },
  { id: "estuco", codigo: "MAT-05", descripcion: "Estuco Acabado Fino", unidad: "m2", precio: 78, marca: "Crest" },
  { id: "azulejo_kit", codigo: "MAT-06", descripcion: "Azulejo + Adhesivo + Boquilla (Mercado CDMX)", unidad: "m2", precio: 380, marca: "El Surtidor" },
  { id: "sellador_aparente", codigo: "MAT-07", descripcion: "Sellador Block Aparente", unidad: "m2", precio: 18, marca: "Comex" },
  { id: "concreto_200", codigo: "MAT-08", descripcion: "Concreto f'c=200 kg/cm2 (firme)", unidad: "m2", precio: 260, marca: "Cemex" },
  { id: "malla_electrosoldada", codigo: "MAT-09", descripcion: "Malla Electrosoldada", unidad: "m2", precio: 45, marca: "Cemex" },
  { id: "concreto_250", codigo: "MAT-10", descripcion: "Concreto Premezclado f'c=250", unidad: "m3", precio: 2850, marca: "Cemex" },
  { id: "acero_varilla", codigo: "MAT-11", descripcion: "Acero de Refuerzo Habilitado fy=4200", unidad: "kg", precio: 32, marca: "Ferretería La Siete" },
  { id: "cimbra_madera", codigo: "MAT-12", descripcion: "Cimbra de Madera (contacto)", unidad: "m2", precio: 220, marca: "Ferretería La Siete" },
  { id: "pintura_vinilica", codigo: "MAT-13", descripcion: "Pintura Vinílica (2 manos)", unidad: "m2", precio: 38, marca: "Comex" },
  { id: "pasta_texturizada", codigo: "MAT-14", descripcion: "Pasta Texturizada", unidad: "m2", precio: 75, marca: "Comex" },
  { id: "piso_ceramico", codigo: "MAT-15", descripcion: "Piso Cerámico + Adhesivo", unidad: "m2", precio: 380, marca: "The Home Depot" },
  { id: "piso_porcelanato", codigo: "MAT-16", descripcion: "Piso Porcelanato + Adhesivo", unidad: "m2", precio: 520, marca: "The Home Depot" },
  { id: "concreto_pulido_insumo", codigo: "MAT-17", descripcion: "Insumos Concreto Pulido (sellador/endurecedor)", unidad: "m2", precio: 240, marca: "Cemex" },
  { id: "terrazzo", codigo: "MAT-18", descripcion: "Terrazzo", unidad: "m2", precio: 580, marca: "El Surtidor" },
  { id: "duela_laminada", codigo: "MAT-19", descripcion: "Duela Laminada", unidad: "m2", precio: 420, marca: "The Home Depot" },
  { id: "duela_vinilica", codigo: "MAT-20", descripcion: "Duela Vinílica tipo SPC / LVT", unidad: "m2", precio: 390, marca: "The Home Depot" },
  { id: "aluminio_2", codigo: "MAT-21", descripcion: "Perfil Aluminio 2\" + Cristal", unidad: "m2", precio: 2600, marca: "El Surtidor" },
  { id: "aluminio_3", codigo: "MAT-22", descripcion: "Perfil Aluminio 3\" + Cristal", unidad: "m2", precio: 3100, marca: "El Surtidor" },
  { id: "aluminio_nacional", codigo: "MAT-23", descripcion: "Perfil Aluminio Línea Nacional + Cristal", unidad: "m2", precio: 1950, marca: "El Surtidor" },
  { id: "herreria_estructural", codigo: "MAT-24", descripcion: "Herrería Estructural + Cristal/Malla", unidad: "m2", precio: 1800, marca: "Ferretería La Siete" },
  { id: "kit_salida_electrica", codigo: "MAT-25", descripcion: "Kit Salida Eléctrica (caja, cable, placa) hasta 3m", unidad: "pza", precio: 450, marca: "Eléctrica Santiago" },
  { id: "ml_cable_adicional", codigo: "MAT-26", descripcion: "Cable + Canalización Adicional", unidad: "ml", precio: 55, marca: "Eléctrica Santiago" },
  { id: "kit_salida_hidraulica", codigo: "MAT-27", descripcion: "Kit Salida Hidrosanitaria", unidad: "pza", precio: 680, marca: "Helvex" },
  { id: "cal_trazo", codigo: "MAT-28", descripcion: "Cal p/Trazo y Nivelación", unidad: "m2", precio: 4, marca: "Ferretería La Siete" },
  { id: "flete_pesado", codigo: "MAT-29", descripcion: "Acarreo/Retiro Escombro (mampostería)", unidad: "m2", precio: 35, marca: "Ferretería La Siete" },
  { id: "flete_ligero", codigo: "MAT-30", descripcion: "Acarreo/Retiro Escombro (panel ligero)", unidad: "m2", precio: 22, marca: "Ferretería La Siete" },
  { id: "flete_piso", codigo: "MAT-31", descripcion: "Acarreo/Retiro Escombro (piso/recubrimiento)", unidad: "m2", precio: 28, marca: "Ferretería La Siete" },
  { id: "flete_carpinteria", codigo: "MAT-32", descripcion: "Acarreo/Retiro Puertas y Ventanas", unidad: "m2", precio: 20, marca: "Ferretería La Siete" },
  { id: "fijaciones_reubicacion", codigo: "MAT-33", descripcion: "Consumibles de Reubicación (Taquetes, pijas, sellador)", unidad: "pza", precio: 120, marca: "Ferretería La Siete" },
  { id: "tablaroca_st_insumo", codigo: "MAT-34", descripcion: "Panel Tablaroca ST 1/2\" + Estructura y Redimix", unidad: "m2", precio: 145, marca: "USG" },
  { id: "tablaroca_rh_insumo", codigo: "MAT-35", descripcion: "Panel Tablaroca RH (Humedad) 1/2\" + Estructura", unidad: "m2", precio: 195, marca: "USG" },
  { id: "durock_insumo", codigo: "MAT-36", descripcion: "Panel Durock 1/2\" + Estructura, Cinta MESH y Basecoat", unidad: "m2", precio: 380, marca: "USG" },
  { id: "adhesivo_mortero", codigo: "MAT-37", descripcion: "Adhesivo para Unir Mortero Nuevo a Viejo (Festerbond)", unidad: "ml", precio: 18, marca: "Fester" },
  { id: "mortero_resane", codigo: "MAT-38", descripcion: "Mortero / Yeso / Pasta para Resane y Emboquillado", unidad: "ml", precio: 25, marca: "Cemex" },
];

const DEFAULT_MANO_OBRA = [
  { id: "MO-01", codigo: "MO-01", descripcion: "Cuadrilla Albañilería (Oficial Albañil + Peón)", integrantes: 2, unidad: "jornada", precio: 1350 },
  { id: "MO-02", codigo: "MO-02", descripcion: "Cuadrilla Tablaroquero (Oficial + Ayudante)", integrantes: 2, unidad: "jornada", precio: 1200 },
  { id: "MO-03", codigo: "MO-03", descripcion: "Cuadrilla Pintor (Oficial Pintor + Peón)", integrantes: 2, unidad: "jornada", precio: 1100 },
  { id: "MO-04", codigo: "MO-04", descripcion: "Cuadrilla Electricista / Plomero (Oficial + Ayudante)", integrantes: 2, unidad: "jornada", precio: 1300 },
  { id: "MO-05", codigo: "MO-05", descripcion: "Cuadrilla Fierrero / Estructurista", integrantes: 2, unidad: "jornada", precio: 1450 },
  { id: "MO-06", codigo: "MO-06", descripcion: "Cuadrilla Aluminero / Cancelero (Oficial + Ayudante)", integrantes: 2, unidad: "jornada", precio: 1350 },
];

const DEFAULT_EQUIPO = [
  { id: "EQ-01", codigo: "EQ-01", descripcion: "Andamios", unidad: "día", precio: 180 },
  { id: "EQ-02", codigo: "EQ-02", descripcion: "Revolvedora", unidad: "día", precio: 550 },
  { id: "EQ-03", codigo: "EQ-03", descripcion: "Bailarina (Aplanadora de Concreto)", unidad: "día", precio: 750 },
  { id: "EQ-04", codigo: "EQ-04", descripcion: "Herramienta Mayor (varios)", unidad: "día", precio: 350 },
];

const DEFAULT_PRICEBOOK = { materiales: DEFAULT_MATERIALES, manoObra: DEFAULT_MANO_OBRA, equipo: DEFAULT_EQUIPO };

const MATRICES = {
  trazo: { nombre: "Trazo y Nivelación", unidad: "m2", materiales: [{ id: "cal_trazo", cant: 1 }], cuadrilla: "MO-01", rendimiento: 80 },
  demol_mamposteria: { nombre: "Demolición Muro Mampostería", unidad: "m2", materiales: [{ id: "flete_pesado", cant: 1 }], cuadrilla: "MO-01", rendimiento: 12 },
  demol_ligero: { nombre: "Demolición Muro Ligero (Panel Yeso/Durock)", unidad: "m2", materiales: [{ id: "flete_ligero", cant: 1 }], cuadrilla: "MO-01", rendimiento: 20 },
  demol_piso: { nombre: "Demolición / Levantamiento de Piso o Acabado Cerámico/Porcelanato", unidad: "m2", materiales: [{ id: "flete_piso", cant: 1 }], cuadrilla: "MO-01", rendimiento: 15 },
  demol_vano: { nombre: "Retiro / Desmantelamiento de Puertas y Ventanas (Carpintería / Aluminio / Herrería)", unidad: "m2", materiales: [{ id: "flete_carpinteria", cant: 1 }], cuadrilla: "MO-06", rendimiento: 25 },
  muro_tabique: { nombre: "Muro de Tabique Rojo Recocido", unidad: "m2", materiales: [{ id: "tabique", cant: 32 }, { id: "mortero", cant: 0.03 }], cuadrilla: "MO-01", rendimiento: 6 },
  
  muro_tablaroca_st_1c: { nombre: "Muro Ligero Tablaroca Normal (1 cara)", unidad: "m2", materiales: [{ id: "tablaroca_st_insumo", cant: 1 }], cuadrilla: "MO-02", rendimiento: 20 },
  muro_tablaroca_st_2c: { nombre: "Muro Ligero Tablaroca Normal (2 caras)", unidad: "m2", materiales: [{ id: "tablaroca_st_insumo", cant: 1.85 }], cuadrilla: "MO-02", rendimiento: 14 },
  muro_tablaroca_rh_1c: { nombre: "Muro Ligero Tablaroca RH Zonas Húmedas (1 cara)", unidad: "m2", materiales: [{ id: "tablaroca_rh_insumo", cant: 1 }], cuadrilla: "MO-02", rendimiento: 18 },
  muro_tablaroca_rh_2c: { nombre: "Muro Ligero Tablaroca RH Zonas Húmedas (2 caras)", unidad: "m2", materiales: [{ id: "tablaroca_rh_insumo", cant: 1.85 }], cuadrilla: "MO-02", rendimiento: 12 },
  muro_durock_1c: { nombre: "Muro Ligero Durock / Cemento (1 cara)", unidad: "m2", materiales: [{ id: "durock_insumo", cant: 1 }], cuadrilla: "MO-02", rendimiento: 12 },
  muro_durock_2c: { nombre: "Muro Ligero Durock / Cemento (2 caras)", unidad: "m2", materiales: [{ id: "durock_insumo", cant: 1.85 }], cuadrilla: "MO-02", rendimiento: 8 },

  resane_emboquillado: { nombre: "Emboquillado y Perfilado en Vano (hasta 30 cm ancho)", unidad: "ml", materiales: [{ id: "mortero_resane", cant: 1 }], cuadrilla: "MO-01", rendimiento: 15 },
  resane_huella: { nombre: "Resane / Cierre de Huella por Demolición de Muro (hasta 30 cm ancho)", unidad: "ml", materiales: [{ id: "mortero_resane", cant: 1 }, { id: "adhesivo_mortero", cant: 1 }], cuadrilla: "MO-01", rendimiento: 12 },
  resane_rozas: { nombre: "Resane y Cierre de Rozas / Ranuras de Instalación (hasta 30 cm ancho)", unidad: "ml", materiales: [{ id: "mortero_resane", cant: 1 }], cuadrilla: "MO-01", rendimiento: 18 },

  acabado_Enjarre: { nombre: "Enjarre o Aplanado Cemento-Arena", unidad: "m2", materiales: [{ id: "cemento_arena_aplanado", cant: 1 }], cuadrilla: "MO-01", rendimiento: 12 },
  acabado_Yeso: { nombre: "Aplanado de Yeso", unidad: "m2", materiales: [{ id: "yeso", cant: 1 }], cuadrilla: "MO-01", rendimiento: 15 },
  acabado_Estuco: { nombre: "Acabado Estuco", unidad: "m2", materiales: [{ id: "estuco", cant: 1 }], cuadrilla: "MO-01", rendimiento: 8 },
  acabado_Azulejo: { nombre: "Recubrimiento de Azulejo", unidad: "m2", materiales: [{ id: "azulejo_kit", cant: 1 }], cuadrilla: "MO-01", rendimiento: 7 },
  acabado_Aparente: { nombre: "Muro Aparente (sellado)", unidad: "m2", materiales: [{ id: "sellador_aparente", cant: 1 }], cuadrilla: "MO-01", rendimiento: 40 },
  firme: { nombre: "Firme de Concreto Interior f'c=200", unidad: "m2", materiales: [{ id: "concreto_200", cant: 1 }, { id: "malla_electrosoldada", cant: 1 }], cuadrilla: "MO-01", rendimiento: 25 },
  pintura_vinilica: { nombre: "Pintura Vinílica (2 manos)", unidad: "m2", materiales: [{ id: "pintura_vinilica", cant: 1 }], cuadrilla: "MO-03", rendimiento: 35 },
  pasta_texturizada: { nombre: "Pasta Texturizada", unidad: "m2", materiales: [{ id: "pasta_texturizada", cant: 1 }], cuadrilla: "MO-03", rendimiento: 20 },
  
  piso_ceramico_mat: { nombre: "Piso Cerámico", unidad: "m2", materiales: [{ id: "piso_ceramico", cant: 1 }], cuadrilla: "MO-01", rendimiento: 18 },
  piso_porcelanato_mat: { nombre: "Piso Porcelanato", unidad: "m2", materiales: [{ id: "piso_porcelanato", cant: 1 }], cuadrilla: "MO-01", rendimiento: 14 },
  piso_concreto_pulido_mat: { nombre: "Concreto Pulido", unidad: "m2", materiales: [{ id: "concreto_pulido_insumo", cant: 1 }], cuadrilla: "MO-01", rendimiento: 30 },
  piso_terrazzo_mat: { nombre: "Terrazzo", unidad: "m2", materiales: [{ id: "terrazzo", cant: 1 }], cuadrilla: "MO-01", rendimiento: 10 },
  piso_duela_laminada_mat: { nombre: "Duela Laminada", unidad: "m2", materiales: [{ id: "duela_laminada", cant: 1 }], cuadrilla: "MO-01", rendimiento: 20 },
  piso_duela_vinilica_mat: { nombre: "Duela Vinílica SPC/LVT", unidad: "m2", materiales: [{ id: "duela_vinilica", cant: 1 }], cuadrilla: "MO-01", rendimiento: 22 },
};

const MAPA_PISOS_MATRIZ = {
  "Cerámico": "piso_ceramico_mat",
  "Porcelanato": "piso_porcelanato_mat",
  "Concreto Pulido": "piso_concreto_pulido_mat",
  "Terrazzo": "piso_terrazzo_mat",
  "Duela Laminada": "piso_duela_laminada_mat",
  "Duela Vinílica tipo SPC o LVT": "piso_duela_vinilica_mat"
};

const TIPOS_ACABADO_MURO = ["Enjarre", "Yeso", "Estuco", "Azulejo", "Aparente"];
const TIPOS_PISO = ["Cerámico", "Porcelanato", "Concreto Pulido", "Terrazzo", "Duela Laminada", "Duela Vinílica tipo SPC o LVT"];
const TIPOS_INMUEBLE = ["Local Comercial", "Departamento", "Casa", "Oficina", "Nave"];
const NIVELES_ACABADO = ["Económico", "Comercial", "Residencial", "Lujo"];
const TIPOS_ESTRUCTURA = ["Columna", "Castillo", "Trabe", "Dala de Cerramiento", "Zapata Aislada (1.20x1.20m)", "Zapata Corrida c/Contratrabe"];
const CUANTIAS_ACERO = { Columna: 90, Castillo: 60, Trabe: 100, "Dala de Cerramiento": 55 };
const MATERIALES_CANCELERIA = { 'Aluminio (2")': "aluminio_2", 'Aluminio (3")': "aluminio_3", "Aluminio Línea Nacional": "aluminio_nacional", "Herrería Estructural": "herreria_estructural" };
const TIPOS_SALIDA_ELECTRICA = ["Luminaria", "Contacto", "Apagador"];
const TIPOS_SALIDA_HIDRAULICA = ["Lavabo", "W.C.", "Regadera", "Fregadero"];

const CAPITULOS_META = [
  { key: "preliminares", nombre: "01. Preliminares", icon: HardHat },
  { key: "albanileria", nombre: "02. Albañilería y Muros", icon: Layers },
  { key: "estructuras", nombre: "03. Estructuras", icon: Boxes },
  { key: "acabados", nombre: "04. Acabados", icon: PaintBucket },
  { key: "pisos", nombre: "05. Pisos y Recubrimientos", icon: Ruler },
  { key: "canceleria", nombre: "06. Cancelería y Herrería", icon: DoorOpen },
  { key: "instalaciones", nombre: "07. Instalaciones", icon: Zap },
  { key: "extraordinarios", nombre: "08. Trabajos Extraordinarios y Especialidades", icon: Sparkles },
];

function defaultPartidas() {
  return {
    preliminares: { aplica: false, trazo: { m2: "", puRapido: "" }, demoliciones: [], conceptosExtra: [] },
    albanileria: { aplica: false, muros: { m2: "", caraA: "Aparente", caraB: "Aparente", mismoAcabado: true }, murosLigeros: [], resanes: [], firmes: { m2: "" } },
    estructuras: { aplica: false, elementos: [] },
    acabados: { aplica: false, pintura: { m2Muros: "", m2Plafones: "", tipo: "vinilica" } },
    pisos: { aplica: false, tipo: "Cerámico", m2: "" },
    canceleria: { aplica: false, elementos: [] },
    instalaciones: { aplica: false, electrica: [], hidraulica: [] },
    extraordinarios: { aplica: false, conceptos: [] },
  };
}

const defaultProyecto = () => ({ cliente: "", ubicacion: "", tipo: "Casa", superficie: "", nivel: "Residencial" });
const defaultParams = () => ({ indirectos: 20, herramientaMenor: 5, imprevistos: 5, equipoSeguridad: 2, umbralMinimoM2: 15 });

const money = (n) => (isFinite(n) ? n : 0).toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
const num = (v) => { const n = parseFloat(v); return isFinite(n) ? n : 0; };

function numeroALetras(monto) {
  const n = Math.abs(num(monto));
  const entero = Math.floor(n);
  const centavos = Math.round((n - entero) * 100);
  const centavosStr = centavos < 10 ? `0${centavos}` : `${centavos}`;

  function Unidades(num) {
    switch (num) {
      case 1: return "UN"; case 2: return "DOS"; case 3: return "TRES"; case 4: return "CUATRO";
      case 5: return "CINCO"; case 6: return "SEIS"; case 7: return "SIETE"; case 8: return "OCHO"; case 9: return "NUEVE";
      default: return "";
    }
  }

  function Decenas(num) {
    const decena = Math.floor(num / 10);
    const unidad = num - (decena * 10);
    switch (decena) {
      case 1:
        switch (unidad) {
          case 0: return "DIEZ"; case 1: return "ONCE"; case 2: return "DOCE"; case 3: return "TRECE";
          case 4: return "CATORCE"; case 5: return "QUINCE";
          default: return "DIECI" + Unidades(unidad);
        }
      case 2:
        if (unidad === 0) return "VEINTE";
        return "VEINTI" + Unidades(unidad);
      case 3: return DecenasY("TREINTA", unidad);
      case 4: return DecenasY("CUARENTA", unidad);
      case 5: return DecenasY("CINCUENTA", unidad);
      case 6: return DecenasY("SESENTA", unidad);
      case 7: return DecenasY("SETENTA", unidad);
      case 8: return DecenasY("OCHENTA", unidad);
      case 9: return DecenasY("NOVENTA", unidad);
      default: return Unidades(unidad);
    }
  }

  function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0) return strSin + " Y " + Unidades(numUnidades);
    return strSin;
  }

  function Centenas(num) {
    const centenas = Math.floor(num / 100);
    const decenas = num - (centenas * 100);
    switch (centenas) {
      case 1: if (decenas > 0) return "CIENTO " + Decenas(decenas); return "CIEN";
      case 2: return "DOSCIENTOS " + Decenas(decenas);
      case 3: return "TRESCIENTOS " + Decenas(decenas);
      case 4: return "CUATROCIENTOS " + Decenas(decenas);
      case 5: return "QUINIENTOS " + Decenas(decenas);
      case 6: return "SEISCIENTOS " + Decenas(decenas);
      case 7: return "SETECIENTOS " + Decenas(decenas);
      case 8: return "OCHOCIENTOS " + Decenas(decenas);
      case 9: return "NOVECIENTOS " + Decenas(decenas);
      default: return Decenas(decenas);
    }
  }

  function Millones(num) {
    const divisor = 1000000;
    const cientos = Math.floor(num / divisor);
    const resto = num - (cientos * divisor);
    let strMillones = "";
    if (cientos === 1) strMillones = "UN MILLON";
    if (cientos > 1) strMillones = Centenas(cientos) + " MILLONES";
    return { letras: strMillones, resto };
  }

  function Miles(num) {
    const divisor = 1000;
    const cientos = Math.floor(num / divisor);
    const resto = num - (cientos * divisor);
    let strMiles = "";
    if (cientos === 1) strMiles = "UN MIL";
    if (cientos > 1) strMiles = Centenas(cientos) + " MIL";
    return { letras: strMiles, resto };
  }

  if (entero === 0) return `CERO PESOS ${centavosStr}/100 M.N.`;

  let res = Millones(entero);
  let texto = res.letras;
  let resto = res.resto;

  res = Miles(resto);
  if (texto && res.letras) texto += " ";
  texto += res.letras;
  resto = res.resto;

  if (resto > 0) {
    if (texto) texto += " ";
    texto += Centenas(resto);
  }

  return `${texto.trim()} PESOS ${centavosStr}/100 M.N.`;
}

function findPrecio(priceBook, id) {
  const m = priceBook.materiales.find((x) => x.id === id);
  return m ? m.precio : 0;
}

function findCuadrilla(priceBook, codigo) {
  return priceBook.manoObra.find((x) => x.codigo === codigo) || { precio: 0, descripcion: "—", codigo };
}

function calcConcepto(matrizKey, cantidad, priceBook, params, overrideRendimiento) {
  const mz = MATRICES[matrizKey];
  if (!mz) return { nombre: matrizKey, unidad: "m2", total: 0, puTotal: 0, cantidad: 0 };

  const matDetalle = mz.materiales.map((m) => {
    const insumo = priceBook.materiales.find((x) => x.id === m.id);
    const precio = insumo ? insumo.precio : 0;
    return { id: m.id, codigo: insumo?.codigo, descripcion: insumo?.descripcion || m.id, unidad: insumo?.unidad || "", cantidad: m.cant, precio, importe: precio * m.cant };
  });
  const costoMaterialesM2 = matDetalle.reduce((a, b) => a + b.importe, 0);
  const cuadrilla = findCuadrilla(priceBook, mz.cuadrilla);
  const umbral = num(params.umbralMinimoM2) || 15;
  
  const esTrabajoPequeno = cantidad > 0 && cantidad < umbral;
  let costoMOM2 = 0;
  let rendimiento = overrideRendimiento || mz.rendimiento;

  if (esTrabajoPequeno) {
    costoMOM2 = cuadrilla.precio / cantidad;
  } else {
    costoMOM2 = rendimiento ? cuadrilla.precio / rendimiento : 0;
  }

  const herrMenor = costoMOM2 * (num(params.herramientaMenor) / 100);
  const eqSeguridad = costoMOM2 * (num(params.equipoSeguridad) / 100);
  const puTotal = costoMaterialesM2 + costoMOM2 + herrMenor + eqSeguridad;

  return {
    nombre: mz.nombre,
    unidad: mz.unidad,
    matDetalle,
    costoMateriales: costoMaterialesM2,
    cuadrilla,
    rendimiento,
    costoMO: costoMOM2,
    matrizKey,
    cantidad,
    herrMenor,
    eqSeguridad,
    puTotal,
    total: puTotal * cantidad,
    esTrabajoPequeno
  };
}

function calcPreliminares(p, priceBook, params) {
  const items = [];
  const cantTrazo = num(p.trazo.m2);
  if (cantTrazo > 0) {
    if (p.trazo.puRapido) {
      const pu = num(p.trazo.puRapido);
      items.push({ id: "trazo", concepto: "Trazo y Nivelación", unidad: "m2", cantidad: cantTrazo, puTotal: pu, total: pu * cantTrazo, manual: true });
    } else {
      items.push({ id: "trazo", concepto: "Trazo y Nivelación", ...calcConcepto("trazo", cantTrazo, priceBook, params) });
    }
  }
  p.demoliciones.forEach((d) => {
    const cant = num(d.m2);
    if (cant <= 0) return;
    let key = "demol_mamposteria";
    let desc = "Muro de Mampostería";
    if (d.tipo === "ligero") {
      key = "demol_ligero";
      desc = "Muro Ligero (Panel Yeso/Durock)";
    } else if (d.tipo === "piso") {
      key = "demol_piso";
      desc = "Piso / Acabado de Cerámica o Porcelanato";
    } else if (d.tipo === "vano") {
      key = "demol_vano";
      desc = "Puertas y Ventanas (Carpintería / Aluminio / Herrería)";
    }
    items.push({ id: d.id, concepto: `Demolición / Retiro de ${desc}`, ...calcConcepto(key, cant, priceBook, params) });
  });
  p.conceptosExtra.forEach((c) => {
    const cant = num(c.cantidad), pu = num(c.pu);
    if (cant <= 0) return;
    items.push({ id: c.id, concepto: c.nombre || "Concepto personalizado", unidad: c.unidad || "pza", cantidad: cant, puTotal: pu, total: pu * cant, manual: true });
  });
  return items;
}

function calcAlbanileria(p, priceBook, params) {
  const items = [];
  
  const cantMuro = num(p.muros.m2);
  if (cantMuro > 0) {
    items.push({ id: "muro", concepto: "Muro de Tabique Rojo Recocido (matriz base)", ...calcConcepto("muro_tabique", cantMuro, priceBook, params) });
    const caraB = p.muros.mismoAcabado ? p.muros.caraA : p.muros.caraB;
    items.push({ id: "caraA", concepto: `Acabado Cara A: ${p.muros.caraA}`, ...calcConcepto(`acabado_${p.muros.caraA}`, cantMuro, priceBook, params) });
    items.push({ id: "caraB", concepto: `Acabado Cara B: ${caraB}`, ...calcConcepto(`acabado_${caraB}`, cantMuro, priceBook, params) });
  }

  if (p.murosLigeros && p.murosLigeros.length > 0) {
    p.murosLigeros.forEach((ml) => {
      const cant = num(ml.m2);
      if (cant <= 0) return;
      
      let key = "muro_tablaroca_st_2c";
      if (ml.tipo === "st") key = ml.caras === "1" ? "muro_tablaroca_st_1c" : "muro_tablaroca_st_2c";
      if (ml.tipo === "rh") key = ml.caras === "1" ? "muro_tablaroca_rh_1c" : "muro_tablaroca_rh_2c";
      if (ml.tipo === "durock") key = ml.caras === "1" ? "muro_durock_1c" : "muro_durock_2c";

      items.push({
        id: ml.id,
        concepto: `Muro Ligero: ${ml.tipo === "st" ? "Tablaroca ST" : ml.tipo === "rh" ? "Tablaroca RH (Humedad)" : "Durock (Cemento)"} a ${ml.caras} cara(s)`,
        ...calcConcepto(key, cant, priceBook, params)
      });
    });
  }

  if (p.resanes && p.resanes.length > 0) {
    p.resanes.forEach((r) => {
      const cantMl = num(r.ml);
      if (cantMl <= 0) return;

      let key = "resane_emboquillado";
      if (r.tipo === "huella") key = "resane_huella";
      if (r.tipo === "rozas") key = "resane_rozas";

      items.push({
        id: r.id,
        concepto: `Resane: ${r.tipo === "emboquillado" ? "Emboquillado / Perfilado en vano" : r.tipo === "huella" ? "Cierre de huella por muro demolidor" : "Cierre de rozas/ranuras de instalación"} (ancho ≤30 cm)`,
        ...calcConcepto(key, cantMl, priceBook, params)
      });
    });
  }

  const cantFirme = num(p.firmes.m2);
  if (cantFirme > 0) items.push({ id: "firme", concepto: "Firme de Concreto Interior f'c=200 kg/cm2", ...calcConcepto("firme", cantFirme, priceBook, params) });
  
  return items;
}

function calcEstructuras(p, priceBook, params) {
  return p.elementos.map((el) => {
    const pConcreto = findPrecio(priceBook, "concreto_250");
    const pAcero = findPrecio(priceBook, "acero_varilla");
    const pCimbra = findPrecio(priceBook, "cimbra_madera");
    const cuadrilla = findCuadrilla(priceBook, "MO-05");

    if (el.tipo === "Zapata Aislada (1.20x1.20m)") {
      const piezas = num(el.piezas) || 1;
      const volConc = 0.45 * piezas;
      const kgAcero = 42 * piezas;
      const m2Cimbra = 2.2 * piezas;

      const cConc = volConc * pConcreto;
      const cAcero = kgAcero * pAcero;
      const cCimb = m2Cimbra * pCimbra;
      const costoMateriales = cConc + cAcero + cCimb;

      const rendJornada = 2; 
      const costoMO = (piezas / rendJornada) * cuadrilla.precio;
      const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
      const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
      const total = costoMateriales + costoMO + herrMenor + eqSeguridad;

      return {
        id: el.id, concepto: `Zapata Aislada Paramétrica 1.20x1.20 m (Dado 30x30 cm)`, unidad: "pieza", cantidad: piezas,
        matDetalle: [
          { codigo: "MAT-10", descripcion: "Concreto Premezclado f'c=250", unidad: "m3", cantidad: Number(volConc.toFixed(2)), precio: pConcreto, importe: cConc },
          { codigo: "MAT-11", descripcion: "Acero de Refuerzo fy=4200 (42 kg/pza)", unidad: "kg", cantidad: Number(kgAcero.toFixed(1)), precio: pAcero, importe: cAcero },
          { codigo: "MAT-12", descripcion: "Cimbra de Madera", unidad: "m2", cantidad: Number(m2Cimbra.toFixed(2)), precio: pCimbra, importe: cCimb },
        ],
        costoMateriales, cuadrilla, rendimiento: rendJornada, costoMO, herrMenor, eqSeguridad, puTotal: total / piezas, total,
      };
    }

    if (el.tipo === "Zapata Corrida c/Contratrabe") {
      const ml = num(el.longitud) || 1;
      const volConc = 0.325 * ml;
      const kgAcero = 30 * ml;
      const m2Cimbra = 1.6 * ml;

      const cConc = volConc * pConcreto;
      const cAcero = kgAcero * pAcero;
      const cCimb = m2Cimbra * pCimbra;
      const costoMateriales = cConc + cAcero + cCimb;

      const rendJornada = 3.5; 
      const costoMO = (ml / rendJornada) * cuadrilla.precio;
      const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
      const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
      const total = costoMateriales + costoMO + herrMenor + eqSeguridad;

      return {
        id: el.id, concepto: `Zapata Corrida c/Contratrabe (Base 1.00 m, Contratrabe 30x60 cm)`, unidad: "ml", cantidad: ml,
        matDetalle: [
          { codigo: "MAT-10", descripcion: "Concreto Premezclado f'c=250", unidad: "m3", cantidad: Number(volConc.toFixed(2)), precio: pConcreto, importe: cConc },
          { codigo: "MAT-11", descripcion: "Acero de Refuerzo fy=4200 (30 kg/ml)", unidad: "kg", cantidad: Number(kgAcero.toFixed(1)), precio: pAcero, importe: cAcero },
          { codigo: "MAT-12", descripcion: "Cimbra de Madera", unidad: "m2", cantidad: Number(m2Cimbra.toFixed(2)), precio: pCimbra, importe: cCimb },
        ],
        costoMateriales, cuadrilla, rendimiento: rendJornada, costoMO, herrMenor, eqSeguridad, puTotal: total / ml, total,
      };
    }

    const anchoM = num(el.ancho) / 100, peralteM = num(el.peralte) / 100, longitud = num(el.longitud);
    const volumen = anchoM * peralteM * longitud;
    const cuantia = CUANTIAS_ACERO[el.tipo] || 70;
    const aceroKg = volumen * cuantia;
    const perimetro = 2 * (anchoM + peralteM);
    const cimbraM2 = perimetro * longitud;
    const costoConcreto = volumen * pConcreto, costoAcero = aceroKg * pAcero, costoCimbra = cimbraM2 * pCimbra;
    const costoMateriales = costoConcreto + costoAcero + costoCimbra;
    const rendimiento = 0.8;
    const costoMO = volumen > 0 ? (volumen / rendimiento) * cuadrilla.precio : 0;
    const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
    const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
    const total = costoMateriales + costoMO + herrMenor + eqSeguridad;
    return {
      id: el.id, concepto: `${el.tipo}: ${el.ancho || 0}×${el.peralte || 0} cm — ${el.longitud || 0} m`, unidad: "pieza", cantidad: 1,
      matDetalle: [
        { codigo: "MAT-10", descripcion: "Concreto Premezclado f'c=250", unidad: "m3", cantidad: Number(volumen.toFixed(3)), precio: pConcreto, importe: costoConcreto },
        { codigo: "MAT-11", descripcion: `Acero de Refuerzo Mínimo (${cuantia} kg/m3)`, unidad: "kg", cantidad: Number(aceroKg.toFixed(1)), precio: pAcero, importe: costoAcero },
        { codigo: "MAT-12", descripcion: "Cimbra de Madera", unidad: "m2", cantidad: Number(cimbraM2.toFixed(2)), precio: pCimbra, importe: costoCimbra },
      ],
      costoMateriales, cuadrilla, rendimiento, costoMO, herrMenor, eqSeguridad, puTotal: total, total,
    };
  });
}

function calcAcabados(p, priceBook, params) {
  const items = [];
  const cant = num(p.pintura.m2Muros) + num(p.pintura.m2Plafones);
  if (cant > 0) {
    const key = p.pintura.tipo === "vinilica" ? "pintura_vinilica" : "pasta_texturizada";
    items.push({ id: "pintura", concepto: `${p.pintura.tipo === "vinilica" ? "Pintura Vinílica (2 manos)" : "Pasta Texturizada"} — Muros y Plafones`, ...calcConcepto(key, cant, priceBook, params) });
  }
  return items;
}

function calcPisos(p, priceBook, params) {
  const cant = num(p.m2);
  if (cant <= 0) return [];
  const key = MAPA_PISOS_MATRIZ[p.tipo] || "piso_ceramico_mat";
  return [{ id: "piso", concepto: `Piso ${p.tipo}`, ...calcConcepto(key, cant, priceBook, params) }];
}

function calcCanceleria(p, priceBook, params) {
  return p.elementos.map((el) => {
    const areaBase = (num(el.ancho) / 100) * (num(el.alto) / 100);
    const modulaciones = Math.max(1, num(el.modulaciones) || 1);
    const factorMod = 1 + 0.08 * (modulaciones - 1);
    const area = areaBase * factorMod;
    const cuadrilla = findCuadrilla(priceBook, "MO-06");

    if (el.accion === "reubicacion") {
      const pInsumo = findPrecio(priceBook, "fijaciones_reubicacion");
      const costoMateriales = pInsumo;
      const rendimiento = 5; 
      const costoMO = (area / rendimiento) * cuadrilla.precio;
      const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
      const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
      const total = costoMateriales + costoMO + herrMenor + eqSeguridad;
      return {
        id: el.id,
        concepto: `Reubicación de Cancelería, Puertas y Ventanas (${el.ancho || 0}×${el.alto || 0}cm)`,
        unidad: "pieza",
        cantidad: 1,
        matDetalle: [{ codigo: "MAT-33", descripcion: "Consumibles y Fijaciones de Reubicación", unidad: "pza", cantidad: 1, precio: pInsumo, importe: costoMateriales }],
        costoMateriales, cuadrilla, rendimiento, costoMO, herrMenor, eqSeguridad, puTotal: total, total,
      };
    }

    const matId = MATERIALES_CANCELERIA[el.material] || "aluminio_nacional";
    const insumo = priceBook.materiales.find((m) => m.id === matId);
    const precioM2 = insumo ? insumo.precio : 0;
    const costoMateriales = area * precioM2;
    const rendimiento = 6;
    const costoMO = (area / rendimiento) * cuadrilla.precio;
    const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
    const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
    const total = costoMateriales + costoMO + herrMenor + eqSeguridad;
    return {
      id: el.id, concepto: `${el.elemento} ${el.material} — ${el.apertura} (${el.ancho || 0}×${el.alto || 0}cm, ${modulaciones} módulo${modulaciones > 1 ? "s" : ""})`,
      unidad: "pieza", cantidad: 1,
      matDetalle: [{ codigo: insumo?.codigo, descripcion: insumo?.descripcion, unidad: "m2", cantidad: Number(area.toFixed(2)), precio: precioM2, importe: costoMateriales }],
      costoMateriales, cuadrilla, rendimiento, costoMO, herrMenor, eqSeguridad, puTotal: total, total,
    };
  });
}

function calcInstalaciones(p, priceBook, params) {
  const items = [];
  const gruposE = {};
  p.electrica.forEach((s) => { gruposE[s.tipo] = gruposE[s.tipo] || { cantidad: 0, metros: 0 }; gruposE[s.tipo].cantidad += num(s.cantidad); gruposE[s.tipo].metros += num(s.metrosAdicionales) * num(s.cantidad); });
  Object.entries(gruposE).forEach(([tipo, g]) => {
    if (g.cantidad <= 0) return;
    const pKit = findPrecio(priceBook, "kit_salida_electrica"), pMl = findPrecio(priceBook, "ml_cable_adicional");
    const costoMateriales = g.cantidad * pKit + g.metros * pMl;
    const cuadrilla = findCuadrilla(priceBook, "MO-04");
    const rendimiento = 4;
    const costoMO = (g.cantidad / rendimiento) * cuadrilla.precio;
    const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
    const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
    const total = costoMateriales + costoMO + herrMenor + eqSeguridad;
    items.push({
      id: `elec-${tipo}`, concepto: `Salida Eléctrica: ${tipo}${g.metros > 0 ? ` (+${g.metros.toFixed(1)} ml)` : ""}`, unidad: "salida", cantidad: g.cantidad,
      matDetalle: [
        { codigo: "MAT-25", descripcion: "Kit Salida Eléctrica (hasta 3m)", unidad: "pza", cantidad: g.cantidad, precio: pKit, importe: g.cantidad * pKit },
        ...(g.metros > 0 ? [{ codigo: "MAT-26", descripcion: "Cable + Canalización Adicional", unidad: "ml", cantidad: g.metros, precio: pMl, importe: g.metros * pMl }] : []),
      ],
      costoMateriales, cuadrilla, rendimiento, costoMO, herrMenor, eqSeguridad, puTotal: total / g.cantidad, total,
    });
  });
  const gruposH = {};
  p.hidraulica.forEach((s) => { gruposH[s.tipo] = (gruposH[s.tipo] || 0) + num(s.cantidad); });
  Object.entries(gruposH).forEach(([tipo, cantidad]) => {
    if (cantidad <= 0) return;
    const pKit = findPrecio(priceBook, "kit_salida_hidraulica");
    const costoMateriales = cantidad * pKit;
    const cuadrilla = findCuadrilla(priceBook, "MO-04");
    const rendimiento = 3;
    const costoMO = (cantidad / rendimiento) * cuadrilla.precio;
    const herrMenor = costoMO * (num(params.herramientaMenor) / 100);
    const eqSeguridad = costoMO * (num(params.equipoSeguridad) / 100);
    const total = costoMateriales + costoMO + herrMenor + eqSeguridad;
    items.push({
      id: `hid-${tipo}`, concepto: `Salida Hidrosanitaria: ${tipo}`, unidad: "salida", cantidad,
      matDetalle: [{ codigo: "MAT-27", descripcion: "Kit Salida Hidrosanitaria", unidad: "pza", cantidad, precio: pKit, importe: costoMateriales }],
      costoMateriales, cuadrilla, rendimiento, costoMO, herrMenor, eqSeguridad, puTotal: total / cantidad, total,
    });
  });
  return items;
}

function calcExtraordinarios(p) {
  if (!p.conceptos || p.conceptos.length === 0) return [];
  return p.conceptos.map((c) => {
    const cant = num(c.cantidad);
    const pu = num(c.pu);
    const total = cant * pu;
    return {
      id: c.id,
      concepto: c.descripcion || "Trabajo Especial / Extraordinario",
      unidad: c.unidad || "Lote",
      cantidad: cant,
      puTotal: pu,
      total: total,
      manual: true,
      matDetalle: [{ codigo: "EXTRA", descripcion: "Costo Directo Especial / Subcontrato", unidad: c.unidad || "Lote", cantidad: cant, precio: pu, importe: total }]
    };
  });
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
    extraordinarios: calcExtraordinarios
  };
  const factorSobrecosto = 1 + (num(params.indirectos) + num(params.imprevistos)) / 100;

  const capitulos = CAPITULOS_META.map((meta) => {
    const p = partidas[meta.key] || { aplica: false };
    const itemsRaw = p.aplica ? calcMap[meta.key](p, priceBook, params) : [];
    
    const items = itemsRaw.map(it => {
      const puTotalConSobrecosto = it.puTotal * factorSobrecosto;
      const totalConSobrecosto = it.total * factorSobrecosto;
      return {
        ...it,
        puTotalCliente: puTotalConSobrecosto,
        totalCliente: totalConSobrecosto
      };
    });

    const subtotalDirecto = items.reduce((a, b) => a + b.total, 0);
    const subtotalCliente = items.reduce((a, b) => a + b.totalCliente, 0);

    return { ...meta, aplica: p.aplica, items, subtotal: subtotalDirecto, subtotalCliente };
  });

  const subtotalDirecto = capitulos.reduce((a, c) => a + c.subtotal, 0);
  const indirectos = subtotalDirecto * (num(params.indirectos) / 100);
  const imprevistos = subtotalDirecto * (num(params.imprevistos) / 100);
  const total = subtotalDirecto + indirectos + imprevistos;

  return { capitulos, subtotalDirecto, indirectos, imprevistos, total };
}

/* -------------------------------------------------------------------------
   PERSISTENCIA V5.2
   ------------------------------------------------------------------------- */
const STORAGE_KEYS = { priceBook: "prisma:pricebook:v5.2", historial: "prisma:historial:v5.2" };

function storageGet(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch { return false; }
}

/* -------------------------------------------------------------------------
   COMPONENTES UI Y PANTALLAS
   ------------------------------------------------------------------------- */
function DiamondToggle({ checked, onChange, labelOn = "Aplica", labelOff = "No Aplica" }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="group flex items-center gap-2.5 shrink-0 focus:outline-none">
      <span className="relative w-6 h-6 shrink-0">
        <span className="absolute inset-0 rotate-45 rounded-[3px] border-2 transition-colors duration-150" style={{ borderColor: checked ? "var(--pr-green)" : "var(--pr-line)", background: checked ? "var(--pr-green)" : "transparent" }} />
        {checked && (
          <svg viewBox="0 0 24 24" className="absolute inset-0 w-6 h-6 p-1.5" fill="none" stroke="#0B1210" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5,13 10,18 19,7" />
          </svg>
        )}
      </span>
      <span className="text-[11px] font-bold tracking-wide uppercase" style={{ color: checked ? "var(--pr-green-ink)" : "var(--pr-muted)" }}>
        {checked ? labelOn : labelOff}
      </span>
    </button>
  );
}

function Field({ label, children, hint, className = "" }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="block text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)] mb-1.5">{label}</span>}
      {children}
      {hint && <span className="block text-[11px] text-[color:var(--pr-muted)] mt-1">{hint}</span>}
    </label>
  );
}

const inputCls = "w-full rounded-md border border-[color:var(--pr-line)] bg-white px-3 py-2 text-[14px] text-[color:var(--pr-ink)] placeholder:text-[color:var(--pr-muted)]/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--pr-green)] focus:border-[color:var(--pr-green)] transition-shadow";

function TextInput(props) { return <input {...props} className={`${inputCls} ${props.className || ""}`} />; }
function NumberInput(props) { return <input type="number" inputMode="decimal" {...props} className={`${inputCls} tabular-nums ${props.className || ""}`} />; }
function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select {...props} className={`${inputCls} appearance-none pr-9 ${props.className || ""}`}>{children}</select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--pr-muted)]" />
    </div>
  );
}

function IconBtn({ onClick, children, tone = "ghost", type = "button", className = "", title }) {
  const tones = {
    ghost: "text-[color:var(--pr-muted)] hover:text-[color:var(--pr-ink)] hover:bg-black/5",
    danger: "text-[#B3392E] hover:bg-[#B3392E]/10",
    primary: "text-white bg-[color:var(--pr-ink)] hover:bg-black",
  };
  return (
    <button type={type} onClick={onClick} title={title} className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${tones[tone]} ${className}`}>
      {children}
    </button>
  );
}

function Btn({ children, onClick, variant = "solid", className = "", type = "button", disabled }) {
  const variants = {
    solid: "bg-[color:var(--pr-green)] text-[#0B1210] hover:brightness-95 shadow-sm",
    dark: "bg-[color:var(--pr-ink)] text-white hover:bg-black",
    outline: "border border-[color:var(--pr-line)] text-[color:var(--pr-ink)] hover:bg-black/5 bg-white",
    ghost: "text-[color:var(--pr-ink)] hover:bg-black/5",
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-bold uppercase tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

function SectionCard({ icon: Icon, title, subtitle, right, children, accent = false }) {
  return (
    <div className={`rounded-xl bg-white border ${accent ? "border-[color:var(--pr-green)]" : "border-[color:var(--pr-line)]"} overflow-hidden`}>
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[color:var(--pr-line)]">
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <span className="w-9 h-9 rounded-[8px] rotate-45 flex items-center justify-center shrink-0" style={{ background: "var(--pr-ink)" }}>
              <Icon size={16} className="-rotate-45 text-[color:var(--pr-green)]" />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="font-display text-[15px] tracking-wide text-[color:var(--pr-ink)] truncate">{title}</h3>
            {subtitle && <p className="text-[12px] text-[color:var(--pr-muted)] truncate">{subtitle}</p>}
          </div>
        </div>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function BlueprintTexture({ className = "" }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 w-full h-full opacity-[0.05] ${className}`} preserveAspectRatio="none">
      <defs>
        <pattern id="bp-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0 L0 0 0 28" fill="none" stroke="currentColor" strokeWidth="1" />
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
          <rect key={i} x="-9" y="-9" width="16" height="16" rx="1.5" transform={`rotate(${45 + r}) translate(6 6)`} fill="none" stroke="#22C55E" strokeWidth="1.2" opacity={i === 0 ? 1 : 0.55} />
        ))}
        <rect x="-7" y="-7" width="14" height="14" rx="1.5" transform="rotate(45)" fill="#22C55E" />
      </g>
    </svg>
  );
}

const STEPS = [
  { n: 1, label: "Proyecto", icon: Building2 },
  { n: 2, label: "Partidas", icon: ClipboardList },
  { n: 3, label: "APU", icon: Calculator },
  { n: 4, label: "Tarifario", icon: Database },
  { n: 5, label: "Resumen", icon: FileText },
];

function Header({ screen, setScreen, cliente }) {
  return (
    <header className="no-print sticky top-0 z-30 text-white" style={{ background: "var(--pr-ink)" }}>
      <div className="relative overflow-hidden">
        <BlueprintTexture className="text-[color:var(--pr-green)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <PrismaMark />
            <div className="min-w-0 leading-none">
              <div className="font-display text-[17px] tracking-[0.08em]">PRISMA <span className="text-[color:var(--pr-green)]">ARQUITECTURA</span></div>
              <div className="text-[10.5px] text-white/50 tracking-wide uppercase mt-0.5 truncate">Paramétrico — {cliente ? cliente : "Nuevo presupuesto"}</div>
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
              <button key={s.n} onClick={() => setScreen(s.n)} className="relative flex items-center gap-2 px-3.5 sm:px-4 py-3 shrink-0 group">
                <span className="w-5 h-5 rotate-45 rounded-[3px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors" style={{ borderColor: active || done ? "var(--pr-green)" : "rgba(255,255,255,0.25)", background: active ? "var(--pr-green)" : done ? "rgba(34,197,94,0.15)" : "transparent" }}>
                  <span className="-rotate-45 text-[10px] font-bold" style={{ color: active ? "#0B1210" : done ? "var(--pr-green)" : "rgba(255,255,255,0.5)" }}>{s.n}</span>
                </span>
                <span className={`text-[12px] font-bold uppercase tracking-wide whitespace-nowrap transition-colors ${active ? "text-white" : done ? "text-white/70" : "text-white/40"}`}>{s.label}</span>
                {active && <span className="absolute left-3.5 right-3.5 sm:left-4 sm:right-4 -bottom-px h-[2.5px] bg-[color:var(--pr-green)] rounded-full" />}
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
      <SectionCard icon={Building2} title="Registro de Proyecto y Cliente" subtitle="Información base para el presupuesto paramétrico">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nombre del Cliente"><TextInput value={proyecto.cliente} onChange={(e) => set("cliente", e.target.value)} placeholder="Ej. Familia Torres Domínguez" /></Field>
          <Field label="Ubicación / Dirección">
            <div className="relative">
              <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--pr-muted)]" />
              <TextInput value={proyecto.ubicacion} onChange={(e) => set("ubicacion", e.target.value)} placeholder="Calle, colonia, ciudad" className="pl-9" />
            </div>
          </Field>
          <Field label="Tipo de Inmueble">
            <Select value={proyecto.tipo} onChange={(e) => set("tipo", e.target.value)}>
              {TIPOS_INMUEBLE.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="Superficie a Intervenir (m²)">
            <div className="relative">
              <Ruler size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--pr-muted)]" />
              <NumberInput value={proyecto.superficie} onChange={(e) => set("superficie", e.target.value)} placeholder="0" className="pl-9" min="0" />
            </div>
          </Field>
        </div>
        <Field label="Nivel de Acabado Objetivo" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {NIVELES_ACABADO.map((n) => (
              <button key={n} type="button" onClick={() => set("nivel", n)} className={`rounded-lg border px-3 py-3 text-[13px] font-bold uppercase tracking-wide transition-colors ${proyecto.nivel === n ? "border-[color:var(--pr-green)] bg-[color:var(--pr-green)]/10 text-[color:var(--pr-green-ink)]" : "border-[color:var(--pr-line)] text-[color:var(--pr-muted)] hover:border-[color:var(--pr-ink)]/30"}`}>
                {n}
              </button>
            ))}
          </div>
        </Field>
      </SectionCard>

      <SectionCard icon={Settings2} title="Parámetros Generales y Reglas de Cobro" subtitle="Configuración de sobrecostos y umbral para trabajos pequeños">
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            ["indirectos", "Indirectos / Utilidad", "%"],
            ["herramientaMenor", "Herramienta Menor", "%"],
            ["imprevistos", "Imprevistos", "%"],
            ["equipoSeguridad", "Eq. Seguridad", "%"],
            ["umbralMinimoM2", "Umbral Mínimo M.O.", "m²"],
          ].map(([key, label, unit]) => (
            <Field key={key} label={label}>
              <div className="relative">
                <NumberInput value={params[key]} onChange={(e) => setParams((p) => ({ ...p, [key]: e.target.value }))} min="0" step="0.5" className="pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[color:var(--pr-muted)]">{unit}</span>
              </div>
            </Field>
          ))}
        </div>
        <div className="mt-3 p-3 rounded-lg border border-amber-200 bg-amber-50 text-[12px] text-amber-900 flex items-center gap-2">
          <ShieldAlert size={16} className="shrink-0 text-amber-600" />
          <span><b>Regla de Trabajo Pequeño / Destajo:</b> Si los m² o ml de una partida son menores a {params.umbralMinimoM2 || 15}, la app aplicará el cobro de 1 jornada completa de cuadrilla para cubrir costos mínimos de traslado.</span>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Btn onClick={onNext}>Continuar a Partidas <ArrowRight size={15} /></Btn>
      </div>
    </div>
  );
}

function CapituloShell({ meta, aplica, onToggle, subtotal, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  useEffect(() => { if (aplica) setOpen(true); }, [aplica]);
  const Icon = meta.icon;
  return (
    <div className="rounded-xl bg-white border border-[color:var(--pr-line)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4">
        <button onClick={() => aplica && setOpen((o) => !o)} className="flex items-center gap-3 min-w-0 text-left flex-1">
          <span className="w-9 h-9 rounded-[8px] rotate-45 flex items-center justify-center shrink-0" style={{ background: aplica ? "var(--pr-ink)" : "#EDEDE8" }}>
            <Icon size={16} className="-rotate-45" style={{ color: aplica ? "var(--pr-green)" : "var(--pr-muted)" }} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[14.5px] tracking-wide text-[color:var(--pr-ink)] truncate">{meta.nombre}</span>
            {aplica && subtotal > 0 && <span className="block text-[12px] text-[color:var(--pr-muted)] tabular-nums">{money(subtotal)}</span>}
          </span>
        </button>
        <div className="flex items-center gap-3 shrink-0">
          <DiamondToggle checked={aplica} onChange={onToggle} />
          {aplica && <ChevronDown size={18} className={`text-[color:var(--pr-muted)] transition-transform ${open ? "rotate-180" : ""}`} onClick={() => setOpen((o) => !o)} />}
        </div>
      </div>
      {aplica && open && <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[color:var(--pr-line)]">{children}</div>}
    </div>
  );
}

function RowList({ children, onAdd, addLabel }) {
  return (
    <div className="space-y-2.5">
      {children}
      <button type="button" onClick={onAdd} className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-[color:var(--pr-line)] py-2.5 text-[12.5px] font-bold uppercase tracking-wide text-[color:var(--pr-muted)] hover:border-[color:var(--pr-green)] hover:text-[color:var(--pr-green-ink)] transition-colors">
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  );
}

function Screen2({ partidas, setPartidas, priceBook, params }) {
  const update = (key, fn) => setPartidas((prev) => ({ ...prev, [key]: fn(prev[key]) }));
  const preview = useMemo(() => calcularPresupuesto(partidas, priceBook, params), [partidas, priceBook, params]);
  const subtotalOf = (key) => preview.capitulos.find((c) => c.key === key)?.subtotal || 0;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-dashed border-[color:var(--pr-line)] bg-white/60 px-4 py-3 text-[12.5px] text-[color:var(--pr-muted)]">
        Activa cada partida con el interruptor. Las partidas desactivadas no se incluyen en los totales ni en la exportación.
      </div>

      {/* 01. PRELIMINARES */}
      <CapituloShell meta={CAPITULOS_META[0]} aplica={partidas.preliminares.aplica} subtotal={subtotalOf("preliminares")} onToggle={(v) => update("preliminares", (p) => ({ ...p, aplica: v }))}>
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Trazo y Nivelación (m²)">
              <NumberInput value={partidas.preliminares.trazo.m2} onChange={(e) => update("preliminares", (p) => ({ ...p, trazo: { ...p.trazo, m2: e.target.value } }))} placeholder="0" min="0" />
            </Field>
            <Field label="Precio Unitario Rápido (opcional)">
              <NumberInput value={partidas.preliminares.trazo.puRapido} onChange={(e) => update("preliminares", (p) => ({ ...p, trazo: { ...p.trazo, puRapido: e.target.value } }))} placeholder="$/m²" min="0" />
            </Field>
          </div>
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)] mb-2">Demoliciones y Desmantelamientos</span>
            <RowList addLabel="Agregar Demolición / Retiro" onAdd={() => update("preliminares", (p) => ({ ...p, demoliciones: [...p.demoliciones, { id: uid(), tipo: "mamposteria", m2: "" }] }))}>
              {partidas.preliminares.demoliciones.map((d) => (
                <div key={d.id} className="flex items-center gap-2">
                  <Select value={d.tipo} onChange={(e) => update("preliminares", (p) => ({ ...p, demoliciones: p.demoliciones.map((x) => x.id === d.id ? { ...x, tipo: e.target.value } : x) }))} className="flex-1">
                    <option value="mamposteria">Muro de Mampostería</option>
                    <option value="ligero">Muro Ligero (Panel Yeso/Durock)</option>
                    <option value="piso">Piso / Acabado de Cerámica o Porcelanato</option>
                    <option value="vano">Puertas y Ventanas (Carpintería / Aluminio / Herrería)</option>
                  </Select>
                  <NumberInput value={d.m2} onChange={(e) => update("preliminares", (p) => ({ ...p, demoliciones: p.demoliciones.map((x) => x.id === d.id ? { ...x, m2: e.target.value } : x) }))} placeholder="m²" className="w-28" min="0" />
                  <IconBtn tone="danger" onClick={() => update("preliminares", (p) => ({ ...p, demoliciones: p.demoliciones.filter((x) => x.id !== d.id) }))}><Trash2 size={15} /></IconBtn>
                </div>
              ))}
            </RowList>
          </div>
        </div>
      </CapituloShell>

      {/* 02. ALBAÑILERÍA Y MUROS */}
      <CapituloShell meta={CAPITULOS_META[1]} aplica={partidas.albanileria.aplica} subtotal={subtotalOf("albanileria")} onToggle={(v) => update("albanileria", (p) => ({ ...p, aplica: v }))}>
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[color:var(--pr-ink)]">1. Muro Tradicional de Tabique Rojo</span>
            <Field label="Muros de Tabique Rojo Recocido (m²)">
              <NumberInput value={partidas.albanileria.muros.m2} onChange={(e) => update("albanileria", (p) => ({ ...p, muros: { ...p.muros, m2: e.target.value } }))} placeholder="0" min="0" />
            </Field>
            <div className="rounded-lg border border-[color:var(--pr-line)] p-4 space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)]">Configuración de Caras (Tabique)</span>
                <button type="button" onClick={() => update("albanileria", (p) => ({ ...p, muros: { ...p.muros, mismoAcabado: !p.muros.mismoAcabado, caraB: p.muros.caraA } }))} className={`text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors ${partidas.albanileria.muros.mismoAcabado ? "border-[color:var(--pr-green)] bg-[color:var(--pr-green)]/10 text-[color:var(--pr-green-ink)]" : "border-[color:var(--pr-line)] text-[color:var(--pr-muted)]"}`}>
                  Ambas Caras con Mismo Acabado
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Cara A">
                  <Select value={partidas.albanileria.muros.caraA} onChange={(e) => update("albanileria", (p) => ({ ...p, muros: { ...p.muros, caraA: e.target.value, caraB: p.muros.mismoAcabado ? e.target.value : p.muros.caraB } }))}>
                    {TIPOS_ACABADO_MURO.map((t) => <option key={t} value={t}>{t}</option>)}
                  </Select>
                </Field>
                <Field label="Cara B">
                  <Select disabled={partidas.albanileria.muros.mismoAcabado} value={partidas.albanileria.muros.caraB} onChange={(e) => update("albanileria", (p) => ({ ...p, muros: { ...p.muros, caraB: e.target.value } }))}>
                    {TIPOS_ACABADO_MURO.map((t) => <option key={t} value={t}>{t}</option>)}
                  </Select>
                </Field>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[color:var(--pr-line)]">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[color:var(--pr-ink)]">2. Muros Ligeros (Tablaroca / Durock)</span>
            <RowList
              addLabel="Agregar Muro Ligero (Tablaroca ST / RH / Durock)"
              onAdd={() => update("albanileria", (p) => ({ ...p, murosLigeros: [...(p.murosLigeros || []), { id: uid(), tipo: "st", caras: "2", m2: "" }] }))}
            >
              {(partidas.albanileria.murosLigeros || []).map((ml) => (
                <div key={ml.id} className="grid sm:grid-cols-[1.5fr_1fr_1fr_auto] gap-2.5 items-end rounded-lg border border-[color:var(--pr-line)] p-3">
                  <Field label="Tipo de Panel">
                    <Select value={ml.tipo} onChange={(e) => update("albanileria", (p) => ({ ...p, murosLigeros: p.murosLigeros.map((x) => x.id === ml.id ? { ...x, tipo: e.target.value } : x) }))}>
                      <option value="st">Tablaroca ST (Estándar)</option>
                      <option value="rh">Tablaroca RH (Humedad)</option>
                      <option value="durock">Durock / Panel Cemento</option>
                    </Select>
                  </Field>
                  <Field label="Caras">
                    <Select value={ml.caras} onChange={(e) => update("albanileria", (p) => ({ ...p, murosLigeros: p.murosLigeros.map((x) => x.id === ml.id ? { ...x, caras: e.target.value } : x) }))}>
                      <option value="1">1 Cara</option>
                      <option value="2">2 Caras</option>
                    </Select>
                  </Field>
                  <Field label="Superficie (m²)">
                    <NumberInput value={ml.m2} onChange={(e) => update("albanileria", (p) => ({ ...p, murosLigeros: p.murosLigeros.map((x) => x.id === ml.id ? { ...x, m2: e.target.value } : x) }))} placeholder="0" min="0" />
                  </Field>
                  <IconBtn tone="danger" onClick={() => update("albanileria", (p) => ({ ...p, murosLigeros: p.murosLigeros.filter((x) => x.id !== ml.id) }))}><Trash2 size={15} /></IconBtn>
                </div>
              ))}
            </RowList>
          </div>

          <div className="space-y-3 pt-3 border-t border-[color:var(--pr-line)]">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[color:var(--pr-ink)]">3. Resanes y Emboquillados (Ancho base ≤30 cm)</span>
            <RowList
              addLabel="Agregar Tramo de Resane / Emboquillado (ml)"
              onAdd={() => update("albanileria", (p) => ({ ...p, resanes: [...(p.resanes || []), { id: uid(), tipo: "emboquillado", ml: "" }] }))}
            >
              {(partidas.albanileria.resanes || []).map((r) => (
                <div key={r.id} className="grid sm:grid-cols-[2fr_1fr_auto] gap-2.5 items-end rounded-lg border border-[color:var(--pr-line)] p-3">
                  <Field label="Tipo de Resane">
                    <Select value={r.tipo} onChange={(e) => update("albanileria", (p) => ({ ...p, resanes: p.resanes.map((x) => x.id === r.id ? { ...x, tipo: e.target.value } : x) }))}>
                      <option value="emboquillado">Emboquillado / Perfilado en vano o marco</option>
                      <option value="huella">Cierre de huella por demolición de muro</option>
                      <option value="rozas">Cierre de rozas / ranuras de instalaciones</option>
                    </Select>
                  </Field>
                  <Field label="Longitud (ml)">
                    <NumberInput value={r.ml} onChange={(e) => update("albanileria", (p) => ({ ...p, resanes: p.resanes.map((x) => x.id === r.id ? { ...x, ml: e.target.value } : x) }))} placeholder="0" min="0" />
                  </Field>
                  <IconBtn tone="danger" onClick={() => update("albanileria", (p) => ({ ...p, resanes: p.resanes.filter((x) => x.id !== r.id) }))}><Trash2 size={15} /></IconBtn>
                </div>
              ))}
            </RowList>
          </div>

          <div className="pt-3 border-t border-[color:var(--pr-line)]">
            <Field label="4. Firmes de Concreto Interior f'c=200 (m²)">
              <NumberInput value={partidas.albanileria.firmes.m2} onChange={(e) => update("albanileria", (p) => ({ ...p, firmes: { m2: e.target.value } }))} placeholder="0" min="0" />
            </Field>
          </div>
        </div>
      </CapituloShell>

      {/* 03. ESTRUCTURAS */}
      <CapituloShell meta={CAPITULOS_META[2]} aplica={partidas.estructuras.aplica} subtotal={subtotalOf("estructuras")} onToggle={(v) => update("estructuras", (p) => ({ ...p, aplica: v }))}>
        <RowList addLabel="Agregar Elemento Estructural" onAdd={() => update("estructuras", (p) => ({ ...p, elementos: [...p.elementos, { id: uid(), tipo: "Columna", ancho: "", peralte: "", longitud: "", piezas: "" }] }))}>
          {partidas.estructuras.elementos.map((el) => {
            const esZapataAislada = el.tipo === "Zapata Aislada (1.20x1.20m)";
            const esZapataCorrida = el.tipo === "Zapata Corrida c/Contratrabe";

            return (
              <div key={el.id} className="rounded-lg border border-[color:var(--pr-line)] p-3.5">
                <div className="grid sm:grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-2.5 items-end">
                  <Field label="Elemento">
                    <Select value={el.tipo} onChange={(e) => update("estructuras", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, tipo: e.target.value } : x) }))}>
                      {TIPOS_ESTRUCTURA.map((t) => <option key={t} value={t}>{t}</option>)}
                    </Select>
                  </Field>

                  {esZapataAislada ? (
                    <Field label="Cantidad (Piezas)"><NumberInput value={el.piezas} onChange={(e) => update("estructuras", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, piezas: e.target.value } : x) }))} min="1" placeholder="Ej. 4" /></Field>
                  ) : esZapataCorrida ? (
                    <Field label="Longitud Total (m)"><NumberInput value={el.longitud} onChange={(e) => update("estructuras", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, longitud: e.target.value } : x) }))} min="0" placeholder="Ej. 12" /></Field>
                  ) : (
                    <>
                      <Field label="Ancho (cm)"><NumberInput value={el.ancho} onChange={(e) => update("estructuras", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, ancho: e.target.value } : x) }))} min="0" /></Field>
                      <Field label="Peralte (cm)"><NumberInput value={el.peralte} onChange={(e) => update("estructuras", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, peralte: e.target.value } : x) }))} min="0" /></Field>
                      <Field label="Altura / Long. (m)"><NumberInput value={el.longitud} onChange={(e) => update("estructuras", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, longitud: e.target.value } : x) }))} min="0" /></Field>
                    </>
                  )}

                  <IconBtn tone="danger" onClick={() => update("estructuras", (p) => ({ ...p, elementos: p.elementos.filter((x) => x.id !== el.id) }))}><Trash2 size={15} /></IconBtn>
                </div>
              </div>
            );
          })}
        </RowList>
      </CapituloShell>

      {/* 04. ACABADOS */}
      <CapituloShell meta={CAPITULOS_META[3]} aplica={partidas.acabados.aplica} subtotal={subtotalOf("acabados")} onToggle={(v) => update("acabados", (p) => ({ ...p, aplica: v }))}>
        <div className="space-y-4">
          <Field label="Tipo de Aplicación">
            <div className="grid grid-cols-2 gap-2.5">
              {[["vinilica", "Pintura Vinílica (2 manos)"], ["pasta", "Pasta Texturizada"]].map(([v, l]) => (
                <button key={v} type="button" onClick={() => update("acabados", (p) => ({ ...p, pintura: { ...p.pintura, tipo: v } }))} className={`rounded-lg border px-3 py-2.5 text-[12.5px] font-bold text-left transition-colors ${partidas.acabados.pintura.tipo === v ? "border-[color:var(--pr-green)] bg-[color:var(--pr-green)]/10 text-[color:var(--pr-green-ink)]" : "border-[color:var(--pr-line)] text-[color:var(--pr-muted)]"}`}>{l}</button>
              ))}
            </div>
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Muros (m²)"><NumberInput value={partidas.acabados.pintura.m2Muros} onChange={(e) => update("acabados", (p) => ({ ...p, pintura: { ...p.pintura, m2Muros: e.target.value } }))} placeholder="0" min="0" /></Field>
            <Field label="Plafones (m²)"><NumberInput value={partidas.acabados.pintura.m2Plafones} onChange={(e) => update("acabados", (p) => ({ ...p, pintura: { ...p.pintura, m2Plafones: e.target.value } }))} placeholder="0" min="0" /></Field>
          </div>
        </div>
      </CapituloShell>

      {/* 05. PISOS Y RECUBRIMIENTOS */}
      <CapituloShell meta={CAPITULOS_META[4]} aplica={partidas.pisos.aplica} subtotal={subtotalOf("pisos")} onToggle={(v) => update("pisos", (p) => ({ ...p, aplica: v }))}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Tipo de Recubrimiento">
            <Select value={partidas.pisos.tipo} onChange={(e) => update("pisos", (p) => ({ ...p, tipo: e.target.value }))}>
              {TIPOS_PISO.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="Superficie (m²)">
            <NumberInput value={partidas.pisos.m2} onChange={(e) => update("pisos", (p) => ({ ...p, m2: e.target.value }))} placeholder="0" min="0" />
          </Field>
        </div>
      </CapituloShell>

      {/* 06. CANCELERÍA Y HERRERÍA */}
      <CapituloShell meta={CAPITULOS_META[5]} aplica={partidas.canceleria.aplica} subtotal={subtotalOf("canceleria")} onToggle={(v) => update("canceleria", (p) => ({ ...p, aplica: v }))}>
        <RowList addLabel="Agregar Vano o Reubicación" onAdd={() => update("canceleria", (p) => ({ ...p, elementos: [...p.elementos, { id: uid(), accion: "suministro", material: 'Aluminio (2")', elemento: "Ventana", apertura: "Corrediza", ancho: "", alto: "", modulaciones: 1 }] }))}>
          {partidas.canceleria.elementos.map((el) => (
            <div key={el.id} className="rounded-lg border border-[color:var(--pr-line)] p-3.5 space-y-2.5">
              <div className="flex items-center gap-2 mb-1">
                <Select value={el.accion || "suministro"} onChange={(e) => update("canceleria", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, accion: e.target.value } : x) }))} className="w-60 font-bold">
                  <option value="suministro">Suministro e Instalación Nuevo</option>
                  <option value="reubicacion">Reubicación de Cancelería / Vano Existente</option>
                </Select>
              </div>

              {el.accion === "reubicacion" ? (
                <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2.5 items-end">
                  <Field label="Ancho (cm)"><NumberInput value={el.ancho} onChange={(e) => update("canceleria", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, ancho: e.target.value } : x) }))} min="0" /></Field>
                  <Field label="Alto (cm)"><NumberInput value={el.alto} onChange={(e) => update("canceleria", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, alto: e.target.value } : x) }))} min="0" /></Field>
                  <IconBtn tone="danger" onClick={() => update("canceleria", (p) => ({ ...p, elementos: p.elementos.filter((x) => x.id !== el.id) }))}><Trash2 size={15} /></IconBtn>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-3 gap-2.5">
                    <Field label="Material">
                      <Select value={el.material} onChange={(e) => update("canceleria", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, material: e.target.value } : x) }))}>
                        {Object.keys(MATERIALES_CANCELERIA).map((m) => <option key={m} value={m}>{m}</option>)}
                      </Select>
                    </Field>
                    <Field label="Elemento">
                      <Select value={el.elemento} onChange={(e) => update("canceleria", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, elemento: e.target.value } : x) }))}>
                        <option value="Puerta">Puerta</option><option value="Ventana">Ventana</option>
                      </Select>
                    </Field>
                    <Field label="Apertura">
                      <Select value={el.apertura} onChange={(e) => update("canceleria", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, apertura: e.target.value } : x) }))}>
                        <option>Fijo</option><option>Corrediza</option><option>Abatible</option>
                      </Select>
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-2.5 items-end">
                    <Field label="Ancho (cm)"><NumberInput value={el.ancho} onChange={(e) => update("canceleria", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, ancho: e.target.value } : x) }))} min="0" /></Field>
                    <Field label="Alto (cm)"><NumberInput value={el.alto} onChange={(e) => update("canceleria", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, alto: e.target.value } : x) }))} min="0" /></Field>
                    <Field label="Modulaciones"><NumberInput value={el.modulaciones} onChange={(e) => update("canceleria", (p) => ({ ...p, elementos: p.elementos.map((x) => x.id === el.id ? { ...x, modulaciones: e.target.value } : x) }))} min="1" /></Field>
                    <IconBtn tone="danger" onClick={() => update("canceleria", (p) => ({ ...p, elementos: p.elementos.filter((x) => x.id !== el.id) }))}><Trash2 size={15} /></IconBtn>
                  </div>
                </>
              )}
            </div>
          ))}
        </RowList>
      </CapituloShell>

      {/* 07. INSTALACIONES */}
      <CapituloShell meta={CAPITULOS_META[6]} aplica={partidas.instalaciones.aplica} subtotal={subtotalOf("instalaciones")} onToggle={(v) => update("instalaciones", (p) => ({ ...p, aplica: v }))}>
        <div className="space-y-5">
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)] mb-2"><Zap size={13} /> Eléctrica — Cotización por Salida</span>
            <RowList addLabel="Agregar Salida Eléctrica" onAdd={() => update("instalaciones", (p) => ({ ...p, electrica: [...p.electrica, { id: uid(), tipo: "Contacto", cantidad: "", metrosAdicionales: "" }] }))}>
              {partidas.instalaciones.electrica.map((s) => (
                <div key={s.id} className="grid grid-cols-[1.2fr_80px_110px_auto] gap-2 items-center">
                  <Select value={s.tipo} onChange={(e) => update("instalaciones", (p) => ({ ...p, electrica: p.electrica.map((x) => x.id === s.id ? { ...x, tipo: e.target.value } : x) }))}>
                    {TIPOS_SALIDA_ELECTRICA.map((t) => <option key={t} value={t}>{t}</option>)}
                  </Select>
                  <NumberInput value={s.cantidad} onChange={(e) => update("instalaciones", (p) => ({ ...p, electrica: p.electrica.map((x) => x.id === s.id ? { ...x, cantidad: e.target.value } : x) }))} placeholder="Cant." min="0" />
                  <NumberInput value={s.metrosAdicionales} onChange={(e) => update("instalaciones", (p) => ({ ...p, electrica: p.electrica.map((x) => x.id === s.id ? { ...x, metrosAdicionales: e.target.value } : x) }))} placeholder="+ ml c/u" min="0" />
                  <IconBtn tone="danger" onClick={() => update("instalaciones", (p) => ({ ...p, electrica: p.electrica.filter((x) => x.id !== s.id) }))}><Trash2 size={15} /></IconBtn>
                </div>
              ))}
            </RowList>
          </div>
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pr-muted)] mb-2"><Droplets size={13} /> Hidráulica y Sanitaria — Cotización por Salida</span>
            <RowList addLabel="Agregar Salida Hidrosanitaria" onAdd={() => update("instalaciones", (p) => ({ ...p, hidraulica: [...p.hidraulica, { id: uid(), tipo: "Lavabo", cantidad: "" }] }))}>
              {partidas.instalaciones.hidraulica.map((s) => (
                <div key={s.id} className="grid grid-cols-[1.2fr_80px_auto] gap-2 items-center">
                  <Select value={s.tipo} onChange={(e) => update("instalaciones", (p) => ({ ...p, hidraulica: p.hidraulica.map((x) => x.id === s.id ? { ...x, tipo: e.target.value } : x) }))}>
                    {TIPOS_SALIDA_HIDRAULICA.map((t) => <option key={t} value={t}>{t}</option>)}
                  </Select>
                  <NumberInput value={s.cantidad} onChange={(e) => update("instalaciones", (p) => ({ ...p, hidraulica: p.hidraulica.map((x) => x.id === s.id ? { ...x, cantidad: e.target.value } : x) }))} placeholder="Cant." min="0" />
                  <IconBtn tone="danger" onClick={() => update("instalaciones", (p) => ({ ...p, hidraulica: p.hidraulica.filter((x) => x.id !== s.id) }))}><Trash2 size={15} /></IconBtn>
                </div>
              ))}
            </RowList>
          </div>
        </div>
      </CapituloShell>

      {/* 08. PARTIDA COMODÍN — TRABAJOS EXTRAORDINARIOS */}
      <CapituloShell meta={CAPITULOS_META[7]} aplica={partidas.extraordinarios?.aplica || false} subtotal={subtotalOf("extraordinarios")} onToggle={(v) => update("extraordinarios", (p) => ({ ...p, aplica: v }))}>
        <div className="space-y-4">
          <div className="text-[12px] text-[color:var(--pr-muted)] bg-[color:var(--pr-canvas)]/60 p-3 rounded-lg border border-[color:var(--pr-line)]">
            Usa esta partida comodín para agregar trabajos especiales (ej. carpintería a medida, clósets, herrería artesanal, etc.). Se le aplicarán automáticamente tus porcentajes de sobrecosto.
          </div>
          <RowList
            addLabel="Agregar Concepto Extraordinario"
            onAdd={() => update("extraordinarios", (p) => ({ ...p, conceptos: [...(p.conceptos || []), { id: uid(), descripcion: "", unidad: "Pza", cantidad: 1, pu: "" }] }))}
          >
            {(partidas.extraordinarios?.conceptos || []).map((c) => (
              <div key={c.id} className="grid sm:grid-cols-[2fr_80px_90px_130px_auto] gap-2 items-end rounded-lg border border-[color:var(--pr-line)] p-3">
                <Field label="Descripción del Trabajo">
                  <TextInput value={c.descripcion} onChange={(e) => update("extraordinarios", (p) => ({ ...p, conceptos: p.conceptos.map((x) => x.id === c.id ? { ...x, descripcion: e.target.value } : x) }))} placeholder="Ej. Clóset de madera en MDF según diseño" />
                </Field>
                <Field label="Unidad">
                  <TextInput value={c.unidad} onChange={(e) => update("extraordinarios", (p) => ({ ...p, conceptos: p.conceptos.map((x) => x.id === c.id ? { ...x, unidad: e.target.value } : x) }))} placeholder="Pza" />
                </Field>
                <Field label="Cantidad">
                  <NumberInput value={c.cantidad} onChange={(e) => update("extraordinarios", (p) => ({ ...p, conceptos: p.conceptos.map((x) => x.id === c.id ? { ...x, cantidad: e.target.value } : x) }))} placeholder="1" min="0" />
                </Field>
                <Field label="Costo Dir. Unit. ($)">
                  <NumberInput value={c.pu} onChange={(e) => update("extraordinarios", (p) => ({ ...p, conceptos: p.conceptos.map((x) => x.id === c.id ? { ...x, pu: e.target.value } : x) }))} placeholder="0.00" min="0" />
                </Field>
                <IconBtn tone="danger" onClick={() => update("extraordinarios", (p) => ({ ...p, conceptos: p.conceptos.filter((x) => x.id !== c.id) }))}><Trash2 size={15} /></IconBtn>
              </div>
            ))}
          </RowList>
        </div>
      </CapituloShell>
    </div>
  );
}

function APUItemCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-[color:var(--pr-line)] overflow-hidden bg-white">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-black/[0.02] transition-colors">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13.5px] font-semibold text-[color:var(--pr-ink)] truncate">{item.concepto}</span>
            {item.esTrabajoPequeno && (
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                Jornada Mínima Aplicada
              </span>
            )}
            {item.manual && (
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                Directo / Comodín
              </span>
            )}
          </div>
          <div className="text-[11.5px] text-[color:var(--pr-muted)] tabular-nums">{item.cantidad} {item.unidad} × {money(item.puTotal)}</div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-display text-[14px] tabular-nums text-[color:var(--pr-ink)]">{money(item.total)}</span>
          <ChevronDown size={16} className={`text-[color:var(--pr-muted)] transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-[color:var(--pr-line)] bg-[color:var(--pr-canvas)]/40 text-[12.5px] space-y-2">
          {item.matDetalle?.length > 0 && (
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-wide text-[color:var(--pr-muted)] my-1">Insumos / Base Directa</div>
              {item.matDetalle.map((m, i) => (
                <div key={i} className="flex justify-between text-[12px]">
                  <span>{m.descripcion}</span>
                  <b>{money(m.importe)}</b>
                </div>
              ))}
            </div>
          )}
          {item.cuadrilla && (
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-wide text-[color:var(--pr-muted)] my-1">Mano de Obra</div>
              <div className="flex justify-between text-[12px]">
                <span>{item.cuadrilla?.descripcion} {item.esTrabajoPequeno && "(Mínimo Cuadrilla)"}</span>
                <b>{money(item.costoMO)} / {item.unidad}</b>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Screen3({ partidas, priceBook, params }) {
  const presupuesto = useMemo(() => calcularPresupuesto(partidas, priceBook, params), [partidas, priceBook, params]);
  const activos = presupuesto.capitulos.filter((c) => c.aplica && c.items.length > 0);

  return (
    <div className="space-y-4">
      {activos.map((cap) => (
        <SectionCard key={cap.key} icon={cap.icon} title={cap.nombre} right={<span className="font-display text-[15px] tabular-nums">{money(cap.subtotal)}</span>}>
          <div className="space-y-2">{cap.items.map((it) => <APUItemCard key={it.id} item={it} />)}</div>
        </SectionCard>
      ))}
    </div>
  );
}

function Screen4({ priceBook, setPriceBook, onSaveAsDefault }) {
  const [tab, setTab] = useState("materiales");
  const cfg = {
    materiales: [["codigo", "Código", 90], ["descripcion", "Descripción", null], ["unidad", "Unidad", 80], ["precio", "Precio CDMX ($)", 130]],
    manoObra: [["codigo", "Código", 90], ["descripcion", "Cuadrilla", null], ["unidad", "Unidad", 80], ["precio", "Precio Jornada ($)", 130]],
    equipo: [["codigo", "Código", 90], ["descripcion", "Descripción", null], ["unidad", "Unidad", 80], ["precio", "Precio ($)", 130]],
  }[tab];

  const updateRow = (id, field, value) => {
    setPriceBook((pb) => ({ ...pb, [tab]: pb[tab].map((r) => (r.id === id ? { ...r, [field]: value } : r)) }));
  };

  return (
    <div className="space-y-4">
      <SectionCard
        icon={Database}
        title="Tarifario y Base de Datos Dinámica"
        subtitle="Modifica y guarda tus precios predeterminados para todos tus futuros proyectos"
        right={
          <Btn variant="solid" onClick={onSaveAsDefault}>
            <Save size={14} /> Guardar Tarifario Predeterminado
          </Btn>
        }
      >
        <div className="flex gap-2 mb-4 border-b pb-3">
          {["materiales", "manoObra", "equipo"].map((k) => (
            <button key={k} onClick={() => setTab(k)} className={`px-3 py-1.5 rounded-lg text-[12px] font-bold uppercase ${tab === k ? "bg-black text-white" : "text-gray-500"}`}>
              {k} ({priceBook[k].length})
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                {cfg.map(([k, l]) => <th key={k} className="pb-2">{l}</th>)}
              </tr>
            </thead>
            <tbody>
              {priceBook[tab].map((r) => (
                <tr key={r.id} className="border-b">
                  {cfg.map(([k]) => (
                    <td key={k} className="py-2 pr-2">
                      {k === "precio" ? (
                        <NumberInput value={r.precio} onChange={(e) => updateRow(r.id, "precio", parseFloat(e.target.value) || 0)} />
                      ) : (
                        <TextInput value={r[k] || ""} onChange={(e) => updateRow(r.id, k, e.target.value)} disabled={k === "codigo"} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function LineaResumen({ label, value, bold, accent, big }) {
  return (
    <div className={`flex items-center justify-between gap-4 ${big ? "py-3" : "py-2"}`}>
      <span className={`${bold ? "font-bold" : ""} ${big ? "font-display text-[15px] tracking-wide" : "text-[13.5px]"}`} style={{ color: accent ? "var(--pr-green-ink)" : "var(--pr-ink)" }}>{label}</span>
      <span className={`tabular-nums ${bold ? "font-bold" : ""} ${big ? "font-display text-[22px]" : "text-[13.5px]"}`} style={{ color: accent ? "var(--pr-green-ink)" : "var(--pr-ink)" }}>{value}</span>
    </div>
  );
}

function PrintReport({ proyecto, presupuesto }) {
  const activos = presupuesto.capitulos.filter((c) => c.aplica && c.items.length > 0);
  const fecha = new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
  return (
    <div className="print-only hidden">
      <div className="p-10 text-[#14181B] text-[12px]">
        <div className="flex items-center justify-between border-b-2 border-[#14181B] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <PrismaMark size={36} />
            <div>
              <div className="font-display text-[20px] tracking-wide">PRISMA ARQUITECTURA</div>
              <div className="text-[11px] text-[#5B6560]">Presupuesto Paramétrico de Obra</div>
            </div>
          </div>
          <div className="text-right text-[11px] text-[#5B6560]">
            <div>Fecha: {fecha}</div>
            <div>Moneda: MXN ($)</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-[12px] bg-black/[0.02] p-4 rounded border border-black/10">
          <div><span className="font-bold">Cliente:</span> {proyecto.cliente || "—"}</div>
          <div><span className="font-bold">Ubicación:</span> {proyecto.ubicacion || "—"}</div>
          <div><span className="font-bold">Tipo de Inmueble:</span> {proyecto.tipo}</div>
          <div><span className="font-bold">Superficie:</span> {proyecto.superficie || 0} m²</div>
          <div><span className="font-bold">Nivel de Acabado:</span> {proyecto.nivel}</div>
        </div>

        {activos.map((cap) => (
          <div key={cap.key} className="mb-5 break-inside-avoid">
            <div className="font-display text-[13px] bg-black/5 px-2.5 py-1.5 mb-1.5 rounded-sm">{cap.nombre}</div>
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="text-left text-[#5B6560] border-b border-black/20">
                  <th className="py-1.5">Concepto</th>
                  <th className="py-1.5 w-20">Cant.</th>
                  <th className="py-1.5 w-16">Und.</th>
                  <th className="py-1.5 w-24 text-right">P.U.</th>
                  <th className="py-1.5 w-28 text-right">Importe</th>
                </tr>
              </thead>
              <tbody>
                {cap.items.map((it) => (
                  <tr key={it.id} className="border-t border-black/10">
                    <td className="py-1.5 pr-2">{it.concepto}</td>
                    <td className="py-1.5 tabular-nums">{it.cantidad}</td>
                    <td className="py-1.5">{it.unidad}</td>
                    <td className="py-1.5 text-right tabular-nums">{money(it.puTotalCliente)}</td>
                    <td className="py-1.5 text-right tabular-nums font-bold">{money(it.totalCliente)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right text-[11.5px] font-bold mt-1.5">Subtotal Capítulo: {money(cap.subtotalCliente)}</div>
          </div>
        ))}

        <div className="mt-6 border-t-2 border-[#14181B] pt-4 ml-auto w-80 text-[12px]">
          <div className="flex justify-between py-1 font-bold text-[15px]">
            <span>TOTAL DEL PROYECTO</span>
            <span className="tabular-nums">{money(presupuesto.total)}</span>
          </div>
          {num(proyecto.superficie) > 0 && (
            <div className="flex justify-between text-[11px] text-[#5B6560] pt-0.5">
              <span>Costo por m²</span>
              <span className="tabular-nums">{money(presupuesto.total / num(proyecto.superficie))} / m²</span>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-black/[0.03] border border-black/15 rounded text-[11px] font-bold">
          <span className="text-[#5B6560] font-normal uppercase">Importe con letra: </span>
          {numeroALetras(presupuesto.total)}
        </div>

        <div className="mt-8 pt-4 border-t border-black/20 text-[10.5px] text-[#444] space-y-1.5 leading-relaxed">
          <p className="font-bold text-[#14181B] uppercase tracking-wider mb-1">Notas y Condiciones Comerciales:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Los precios presentados corresponden a costos parametrizados expresados en Moneda Nacional (MXN).</li>
            <li className="font-bold text-[#14181B]">
              En caso de requerir comprobante fiscal (factura), los precios presentados son MÁS EL 16% DE I.V.A.
            </li>
            <li>Esta propuesta parametrizada tiene una vigencia de 15 días naturales a partir de su fecha de emisión.</li>
            <li>Los alcances finales y especificaciones de materiales se ratificarán al momento de formalizar el contrato ejecutivo de obra.</li>
          </ul>
        </div>

        <div className="mt-12 pt-3 border-t border-black/10 text-[9.5px] text-[#5B6560] flex justify-between items-center">
          <span>Prisma Arquitectura · Cotizador Paramétrico</span>
          <span>contacto@prismaarquitectura.mx</span>
        </div>
      </div>
    </div>
  );
}

function Screen5({ proyecto, presupuesto, params, onSave, historial, onLoadHistorial, onDeleteHistorial }) {
  const porM2 = num(proyecto.superficie) > 0 ? presupuesto.total / num(proyecto.superficie) : 0;
  const activos = presupuesto.capitulos.filter((c) => c.aplica && c.items.length > 0);

  const resumenTexto = () => {
    let t = `*Presupuesto Paramétrico — Prisma Arquitectura*\nCliente: ${proyecto.cliente || "—"}\nUbicación: ${proyecto.ubicacion || "—"}\nSuperficie: ${proyecto.superficie || 0} m²\n\n`;
    activos.forEach((c) => {
      t += `*${c.nombre}*: ${money(c.subtotalCliente)}\n`;
      c.items.forEach(it => {
        t += `  • ${it.concepto} (${it.cantidad} ${it.unidad}): ${money(it.totalCliente)}\n`;
      });
    });
    t += `\n*TOTAL DEL PROYECTO: ${money(presupuesto.total)}*\nImporte con letra: ${numeroALetras(presupuesto.total)}\n\n_En caso de requerir factura, los precios son MÁS EL 16% DE I.V.A. Vigencia: 15 días naturales._`;
    return t;
  };

  const handleWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(resumenTexto())}`, "_blank");
  const handleEmail = () => window.open(`mailto:?subject=${encodeURIComponent(`Presupuesto Paramétrico — ${proyecto.cliente || "Proyecto"}`)}&body=${encodeURIComponent(resumenTexto())}`, "_blank");
  const handlePrint = () => window.print();

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <SectionCard icon={FileText} title="Resumen Ejecutivo y Desglose de Cotización">
            {activos.length === 0 ? (
              <p className="text-[13px] text-[color:var(--pr-muted)]">No hay partidas activas. Regresa a la Pantalla 2 para capturar conceptos.</p>
            ) : (
              <div className="space-y-4">
                {activos.map((cap) => (
                  <div key={cap.key} className="rounded-lg border border-[color:var(--pr-line)] overflow-hidden">
                    <div className="bg-black/5 px-4 py-2.5 flex justify-between items-center font-display text-[13.5px]">
                      <span>{cap.nombre}</span>
                      <span>{money(cap.subtotalCliente)}</span>
                    </div>
                    <div className="p-3 space-y-1.5 text-[12.5px] bg-white">
                      {cap.items.map((it) => (
                        <div key={it.id} className="flex justify-between items-center border-b border-gray-100 pb-1">
                          <span className="text-gray-700">{it.concepto} <span className="text-[11px] text-gray-400">({it.cantidad} {it.unidad})</span></span>
                          <b className="tabular-nums">{money(it.totalCliente)}</b>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-[12px] text-amber-900 space-y-1.5">
            <div className="font-bold uppercase tracking-wider text-amber-800">Notas y Condiciones Comerciales:</div>
            <ul className="list-disc list-inside space-y-1 text-amber-900/90">
              <li>Los precios presentados corresponden a costos parametrizados en Moneda Nacional (MXN).</li>
              <li><b>En caso de requerir comprobante fiscal (factura), los precios son MÁS EL 16% DE I.V.A.</b></li>
              <li>Propuesta con vigencia de <b>15 días naturales</b> a partir de su emisión.</li>
            </ul>
          </div>

          {historial.length > 0 && (
            <SectionCard icon={History} title="Historial de Presupuestos" subtitle={`${historial.length} guardado${historial.length > 1 ? "s" : ""}`}>
              <div className="space-y-2">
                {historial.slice().reverse().map((h) => (
                  <div key={h.id} className="flex items-center justify-between gap-3 rounded-lg border border-[color:var(--pr-line)] px-3.5 py-2.5">
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold truncate">{h.cliente || "Sin nombre"}</div>
                      <div className="text-[11px] text-[color:var(--pr-muted)]">{h.fecha} · {money(h.total)}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <IconBtn onClick={() => onLoadHistorial(h)} title="Cargar"><FolderOpen size={14} /></IconBtn>
                      <IconBtn tone="danger" onClick={() => onDeleteHistorial(h.id)} title="Eliminar"><Trash2 size={14} /></IconBtn>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-[color:var(--pr-line)]" style={{ background: "var(--pr-ink)" }}>
            <div className="relative px-5 py-5">
              <BlueprintTexture className="text-[color:var(--pr-green)]" />
              <div className="relative divide-y divide-white/10 text-white">
                <div className="pb-2.5"><LineaResumen label="Subtotal Directo de Obra" value={money(presupuesto.subtotalDirecto)} /></div>
                <div className="py-2.5"><LineaResumen label={`(+) Indirectos y Utilidad (${params.indirectos}%)`} value={money(presupuesto.indirectos)} /></div>
                <div className="py-2.5"><LineaResumen label={`(+) Reserva para Imprevistos (${params.imprevistos}%)`} value={money(presupuesto.imprevistos)} /></div>
                <div className="pt-3">
                  <div className="text-[11px] uppercase tracking-wide text-[color:var(--pr-green)] font-bold mb-1">Costo Total Paramétrico</div>
                  <div className="font-display text-[28px] tabular-nums leading-none">{money(presupuesto.total)}</div>
                  {porM2 > 0 && <div className="text-[12px] text-white/50 mt-1.5 tabular-nums">{money(porM2)} / m²</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <Btn onClick={handlePrint} className="w-full"><Download size={15} /> Imprimir / PDF Membretado</Btn>
            <div className="grid grid-cols-2 gap-2.5">
              <Btn variant="outline" onClick={handleWhatsApp}><Send size={14} /> WhatsApp</Btn>
              <Btn variant="outline" onClick={handleEmail}><Send size={14} /> Correo</Btn>
            </div>
            <Btn variant="dark" onClick={onSave} className="w-full">
              <Save size={15} /> Guardar Presupuesto en Historial
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   APP PRINCIPAL PRISMA
   ------------------------------------------------------------------------- */
export default function PrismaApp() {
  const [screen, setScreen] = useState(1);
  const [proyecto, setProyecto] = useState(defaultProyecto());
  const [params, setParams] = useState(defaultParams());
  const [partidas, setPartidas] = useState(defaultPartidas());
  const [priceBook, setPriceBook] = useState(DEFAULT_PRICEBOOK);
  const [historial, setHistorial] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedPB = storageGet(STORAGE_KEYS.priceBook);
    const savedHist = storageGet(STORAGE_KEYS.historial);
    if (savedPB) setPriceBook(savedPB);
    if (savedHist) setHistorial(savedHist);
  }, []);

  const presupuesto = useMemo(() => calcularPresupuesto(partidas, priceBook, params), [partidas, priceBook, params]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const handleSaveAsDefault = () => {
    storageSet(STORAGE_KEYS.priceBook, priceBook);
    showToast("¡Tarifario v5.2 guardado correctamente!");
  };

  const handleGuardarHistorial = () => {
    const entry = { id: uid(), fecha: new Date().toLocaleDateString("es-MX"), cliente: proyecto.cliente, total: presupuesto.total, proyecto, partidas, params };
    const next = [...historial, entry];
    setHistorial(next);
    storageSet(STORAGE_KEYS.historial, next);
    showToast("Presupuesto guardado en historial");
  };

  const handleCargarHistorial = (h) => {
    setProyecto(h.proyecto); setPartidas(h.partidas); setParams(h.params); setScreen(5);
    showToast("Presupuesto cargado");
  };

  const handleEliminarHistorial = (id) => {
    const next = historial.filter((h) => h.id !== id);
    setHistorial(next);
    storageSet(STORAGE_KEYS.historial, next);
  };

  return (
    <div style={{ "--pr-canvas": "#EEF0EC", "--pr-ink": "#14181B", "--pr-green": "#22C55E", "--pr-green-ink": "#15803D", "--pr-line": "#DDDFD8", "--pr-muted": "#697068" }} className="min-h-screen">
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
      <Header screen={screen} setScreen={setScreen} cliente={proyecto.cliente} />
      <main className="no-print max-w-6xl mx-auto px-4 py-6 pb-16">
        {screen === 1 && <Screen1 proyecto={proyecto} setProyecto={setProyecto} params={params} setParams={setParams} onNext={() => setScreen(2)} />}
        {screen === 2 && <Screen2 partidas={partidas} setPartidas={setPartidas} priceBook={priceBook} params={params} />}
        {screen === 3 && <Screen3 partidas={partidas} priceBook={priceBook} params={params} />}
        {screen === 4 && <Screen4 priceBook={priceBook} setPriceBook={setPriceBook} onSaveAsDefault={handleSaveAsDefault} />}
        {screen === 5 && <Screen5 proyecto={proyecto} presupuesto={presupuesto} params={params} onSave={handleGuardarHistorial} historial={historial} onLoadHistorial={handleCargarHistorial} onDeleteHistorial={handleEliminarHistorial} />}

        {screen > 1 && (
          <div className="flex justify-between border-t pt-4 mt-6">
            <Btn variant="ghost" onClick={() => setScreen((s) => Math.max(1, s - 1))}><ArrowLeft size={15} /> Anterior</Btn>
            {screen < 5 && <Btn onClick={() => setScreen((s) => Math.min(5, s + 1))}>Siguiente <ArrowRight size={15} /></Btn>}
          </div>
        )}
      </main>

      <PrintReport proyecto={proyecto} presupuesto={presupuesto} />

      {toast && (
        <div className="no-print fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[color:var(--pr-ink)] text-white px-5 py-3 text-[13px] shadow-xl">
          <CheckCircle2 size={16} className="text-[color:var(--pr-green)]" /> {toast}
        </div>
      )}
    </div>
  );
}