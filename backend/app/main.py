from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.models import (
    EntradaTexto, RespuestaCompleta, AnalisisLexico,
    AnalisisSintactico, ArbolSintactico
)
from app.lexer import ConvertidorLexer
from app.parser_ply import ConvertidorParser
from app.tree_builder import TreeBuilder
import os
from pathlib import Path

# Cargar variables de entorno desde .env en la raíz
from dotenv import load_dotenv
env_path = Path(__file__).resolve().parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# Configuración desde .env
DEBUG = os.getenv('DEBUG').lower() == 'true'
BACKEND_HOST = os.getenv('BACKEND_HOST')
BACKEND_PORT = int(os.getenv('BACKEND_PORT'))

app = FastAPI(
    title="API Conversor de Números",
    description="API para convertir números entre diferentes bases numéricas con análisis léxico y sintáctico",
    version="1.0.0",
    debug=DEBUG
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios exactos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Endpoint raíz con información de la API."""
    return {
        "mensaje": "API Conversor de Números",
        "version": "1.0.0",
        "endpoints": {
            "convertir": "/api/convertir",
            "convertir_archivo": "/api/convertir-archivo",
            "health": "/health"
        }
    }

@app.get("/health")
async def health_check():
    """Verifica el estado de la API."""
    return {"status": "ok", "mensaje": "API funcionando correctamente"}

@app.post("/api/convertir", response_model=RespuestaCompleta)
async def convertir_texto(entrada: EntradaTexto):
    """
    Convierte el texto de entrada realizando análisis léxico, sintáctico y construcción del árbol.
    
    Args:
        entrada: Objeto con el texto a procesar
    
    Returns:
        RespuestaCompleta con análisis léxico, sintáctico y árbol
    """
    try:
        texto = entrada.texto.strip()
        
        if not texto:
            raise HTTPException(status_code=400, detail="El texto no puede estar vacío")
        
        # Verificar que termine con $
        if not texto.endswith("$"):
            texto += "\n$"
        
        # 1. ANÁLISIS LÉXICO
        lexer = ConvertidorLexer()
        tokens = lexer.tokenize(texto)
        
        analisis_lexico = AnalisisLexico(tokens=tokens)
        
        # 2. ANÁLISIS SINTÁCTICO
        parser = ConvertidorParser()
        conversiones, errores = parser.parse(texto)
        
        if errores:
            raise HTTPException(
                status_code=400,
                detail=f"Errores de sintaxis encontrados: {'; '.join(errores)}"
            )
        
        analisis_sintactico = AnalisisSintactico(conversiones=conversiones)
        
        # 3. CONSTRUCCIÓN DEL ÁRBOL con LARK
        tree_builder = TreeBuilder()
        texto_arbol, json_arbol = tree_builder.construir_arbol(texto)
        
        arbol_sintactico = ArbolSintactico(
            representacion_texto=texto_arbol,
            representacion_json=json_arbol
        )
        
        # Respuesta completa
        respuesta = RespuestaCompleta(
            analisis_lexico=analisis_lexico,
            analisis_sintactico=analisis_sintactico,
            arbol_sintactico=arbol_sintactico,
            success=True,
            mensaje=f"Se procesaron {len(conversiones)} conversiones exitosamente"
        )
        
        return respuesta
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")

@app.post("/api/convertir-archivo", response_model=RespuestaCompleta)
async def convertir_archivo(file: UploadFile = File(...)):
    """
    Convierte el contenido de un archivo de texto.
    
    Args:
        file: Archivo .txt con las conversiones a realizar
    
    Returns:
        RespuestaCompleta con análisis léxico, sintáctico y árbol
    """
    try:
        # Verificar que sea un archivo de texto
        if not file.filename.endswith('.txt'):
            raise HTTPException(
                status_code=400,
                detail="Solo se aceptan archivos .txt"
            )
        
        # Leer contenido del archivo
        contenido = await file.read()
        texto = contenido.decode('utf-8')
        
        # Procesar usando el mismo endpoint de texto
        entrada = EntradaTexto(texto=texto)
        return await convertir_texto(entrada)
    
    except HTTPException:
        raise
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="El archivo debe estar codificado en UTF-8"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error procesando archivo: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=BACKEND_HOST, port=BACKEND_PORT)