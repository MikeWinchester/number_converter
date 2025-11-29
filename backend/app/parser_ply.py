import ply.yacc as yacc
from app.lexer import ConvertidorLexer
from app.convert import convertir
from app.models import ResultadoConversion
from typing import List


class ConvertidorParser:
    """Analizador sintáctico para el conversor de números."""

    tokens = ConvertidorLexer.tokens

    def __init__(self):
        # Ya NO creamos un lexer interno
        self.lexer_obj: ConvertidorLexer | None = None
        self.parser = yacc.yacc(module=self, debug=False)
        self.conversiones: List[ResultadoConversion] = []
        self.errores: List[str] = []

    # -----------------------------
    # Reglas de gramática
    # -----------------------------

    def p_lista(self, p):
        """lista : conversiones FIN"""
        pass

    def p_conversiones_multiple(self, p):
        """conversiones : conversion conversiones"""
        pass

    def p_conversiones_single(self, p):
        """conversiones : conversion"""
        pass

    def p_conversion(self, p):
        """conversion : NUMERO DESTINO"""
        num, dest = p[1], p[2]

        try:
            resultado = convertir(num, dest)
            self.conversiones.append(ResultadoConversion(
                entrada=f"{num} {dest}",
                numero=num,
                destino=dest,
                resultado=resultado
            ))
        except Exception as e:
            self.errores.append(f"Error convirtiendo {num} a {dest}: {str(e)}")

    def p_error(self, p):
        if p:
            msg = f"Error de sintaxis en línea {p.lineno}: token '{p.value}' ({p.type})"
        else:
            msg = "Error de sintaxis: fin de entrada inesperado"

        self.errores.append(msg)

    # -----------------------------
    # Método parse
    # -----------------------------

    def parse(self, texto: str, lexer: ConvertidorLexer):
        """
        Parsea el texto usando el MISMO lexer que usó el análisis léxico.
        """
        self.conversiones = []
        self.errores = []
        self.lexer_obj = lexer

        self.parser.parse(texto, lexer=lexer.lexer)
        return self.conversiones, self.errores
