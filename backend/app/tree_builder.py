from lark import Lark, Tree, Token
from typing import Dict, Any
import json

# Gramática LARK mejorada para el conversor de números
gramatica_lark = """
    start: conversion+ FIN
    
    conversion: NUMERO DESTINO
    
    NUMERO: /[0-9]+/
    DESTINO: "Hexadecimal" | "Octal" | "Binario" | "Romano" | "Alternativo" | "Aleatorio"
    FIN: "$"
    
    %import common.WS
    %ignore WS
"""

class TreeBuilder:
    """Constructor de árbol sintáctico usando LARK."""
    
    def __init__(self):
        self.parser = Lark(gramatica_lark, parser='lalr')
    
    def construir_arbol(self, texto: str) -> tuple:
        """
        Construye el árbol sintáctico del texto.
        
        Returns:
            tuple: (representación_texto, representación_json)
        """
        try:
            arbol = self.parser.parse(texto)
            
            # Generar representación en texto con formato mejorado
            texto_arbol = self._pretty_tree(arbol)
            
            # Generar representación JSON
            json_arbol = self._tree_to_dict(arbol)
            
            return texto_arbol, json_arbol
        
        except Exception as e:
            error_msg = f"Error construyendo árbol: {str(e)}"
            return error_msg, {"error": error_msg}
    
    def _pretty_tree(self, tree, level: int = 0) -> str:
        """Genera una representación bonita del árbol."""
        indent = "  " * level
        lines = []
        
        if isinstance(tree, Tree):
            lines.append(f"{indent}├─ {tree.data}")
            for child in tree.children:
                lines.append(self._pretty_tree(child, level + 1))
        elif isinstance(tree, Token):
            lines.append(f"{indent}└─ {tree.type}: {tree.value}")
        else:
            lines.append(f"{indent}└─ {str(tree)}")
        
        return "\n".join(lines)
    
    def _tree_to_dict(self, tree) -> Dict[str, Any]:
        """Convierte un árbol de LARK a diccionario."""
        if isinstance(tree, Tree):
            return {
                "tipo": "nodo",
                "regla": tree.data,
                "hijos": [self._tree_to_dict(child) for child in tree.children]
            }
        elif isinstance(tree, Token):
            return {
                "tipo": "token",
                "nombre": tree.type,
                "valor": str(tree.value)
            }
        else:
            return {
                "tipo": "literal",
                "valor": str(tree)
            }
    
    def generar_representacion_visual(self, json_arbol: Dict[str, Any], nivel: int = 0) -> str:
        """Genera una representación visual del árbol en texto."""
        if "error" in json_arbol:
            return json_arbol["error"]
        
        indent = "  " * nivel
        resultado = []
        
        if json_arbol["tipo"] == "nodo":
            simbolo = "🌿" if nivel == 0 else "├─"
            resultado.append(f"{indent}{simbolo} {json_arbol['regla']}")
            for hijo in json_arbol.get("hijos", []):
                resultado.append(self.generar_representacion_visual(hijo, nivel + 1))
        
        elif json_arbol["tipo"] == "token":
            resultado.append(f"{indent}└─ 🟢 {json_arbol['nombre']}: {json_arbol['valor']}")
        
        return "\n".join(resultado)