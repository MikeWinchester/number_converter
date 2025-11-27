from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class TokenInfo(BaseModel):
    linea: int
    tipo: str
    valor: Any
    posicion: Optional[int] = None

class ResultadoConversion(BaseModel):
    entrada: str
    numero: int
    destino: str
    resultado: str

class AnalisisLexico(BaseModel):
    tokens: List[TokenInfo]

class AnalisisSintactico(BaseModel):
    conversiones: List[ResultadoConversion]

class ArbolSintactico(BaseModel):
    representacion_texto: str
    representacion_json: Dict[str, Any]

class RespuestaCompleta(BaseModel):
    analisis_lexico: AnalisisLexico
    analisis_sintactico: AnalisisSintactico
    arbol_sintactico: ArbolSintactico
    success: bool
    mensaje: Optional[str] = None

class EntradaTexto(BaseModel):
    texto: str