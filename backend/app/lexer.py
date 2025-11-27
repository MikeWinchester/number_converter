import ply.lex as lex
from typing import List
from app.models import TokenInfo

class ConvertidorLexer:
    """Analizador léxico para el conversor de números."""
    
    tokens = ["NUMERO", "DESTINO", "FIN"]
    
    t_ignore = " \t"
    
    def __init__(self):
        self.lexer = lex.lex(module=self)
        self.tokens_encontrados: List[TokenInfo] = []
        self.linea_actual = 1
    
    def t_NEWLINE(self, t):
        r'\n+'
        t.lexer.lineno += len(t.value)
        self.linea_actual += len(t.value)
    
    def t_NUMERO(self, t):
        r'\d+'
        t.value = int(t.value)
        self.tokens_encontrados.append(TokenInfo(
            linea=t.lineno,
            tipo="NUMERO",
            valor=t.value,
            posicion=t.lexpos
        ))
        return t
    
    def t_DESTINO(self, t):
        r'Hexadecimal|Octal|Binario|Romano|Alternativo|Aleatorio'
        self.tokens_encontrados.append(TokenInfo(
            linea=t.lineno,
            tipo="DESTINO",
            valor=t.value,
            posicion=t.lexpos
        ))
        return t
    
    def t_FIN(self, t):
        r'\$'
        self.tokens_encontrados.append(TokenInfo(
            linea=t.lineno,
            tipo="FIN",
            valor=t.value,
            posicion=t.lexpos
        ))
        return t
    
    def t_error(self, t):
        print(f"Carácter ilegal '{t.value[0]}' en línea {t.lineno}")
        t.lexer.skip(1)
    
    def tokenize(self, texto: str) -> List[TokenInfo]:
        """Tokeniza el texto de entrada y retorna la lista de tokens."""
        self.tokens_encontrados = []
        self.linea_actual = 1
        self.lexer.input(texto)
        
        # Procesar todos los tokens
        while True:
            tok = self.lexer.token()
            if not tok:
                break
        
        return self.tokens_encontrados
    
    def reset(self):
        """Reinicia el estado del lexer."""
        self.tokens_encontrados = []
        self.linea_actual = 1