export interface TokenInfo {
  linea: number;
  tipo: string;
  valor: string | number;
  posicion?: number;
}

export interface ResultadoConversion {
  entrada: string;
  numero: number;
  destino: string;
  resultado: string;
}

export interface AnalisisLexico {
  tokens: TokenInfo[];
}

export interface AnalisisSintactico {
  conversiones: ResultadoConversion[];
}

export interface TreeNode {
  error: any;
  tipo: string;
  regla?: string;
  nombre?: string;
  valor?: string;
  hijos?: TreeNode[];
}

export interface ArbolSintactico {
  representacion_texto: string;
  representacion_json: TreeNode;
}

export interface RespuestaCompleta {
  analisis_lexico: AnalisisLexico;
  analisis_sintactico: AnalisisSintactico;
  arbol_sintactico: ArbolSintactico;
  success: boolean;
  mensaje?: string;
}