import random

def a_romano(num: int) -> str:
    """Convierte un número decimal a romano."""
    if num <= 0 or num > 3999:
        return "Fuera de rango (1-3999)"
    
    valores = [
        (1000, "M"), (900, "CM"), (500, "D"),
        (400, "CD"), (100, "C"), (90, "XC"),
        (50, "L"), (40, "XL"), (10, "X"),
        (9, "IX"), (5, "V"), (4, "IV"), (1, "I")
    ]
    resultado = ""
    for v, s in valores:
        while num >= v:
            resultado += s
            num -= v
    return resultado

def a_bcd(num: int) -> str:
    """Convierte cada dígito decimal a 4 bits BCD (Binary Coded Decimal)."""
    bcd = []
    for dig in str(num):
        bits = format(int(dig), "04b")
        bcd.append(bits)
    return " ".join(bcd)

def convertir(num: int, destino: str) -> str:
    """
    Convierte un número al formato de destino especificado.
    
    Args:
        num: Número decimal a convertir
        destino: Formato destino (Hexadecimal, Octal, Binario, Romano, Alternativo, Aleatorio)
    
    Returns:
        String con la representación convertida
    """
    destino_lower = destino.lower()
    
    if destino_lower == "hexadecimal":
        return hex(num)[2:].upper()
    
    elif destino_lower == "octal":
        return oct(num)[2:]
    
    elif destino_lower == "binario":
        return bin(num)[2:]
    
    elif destino_lower == "romano":
        return a_romano(num)
    
    elif destino_lower == "alternativo":
        # BCD como sistema alternativo
        return a_bcd(num)
    
    elif destino_lower == "aleatorio":
        opciones = ["hexadecimal", "octal", "binario", "romano", "alternativo"]
        random_dest = random.choice(opciones)
        return f"{convertir(num, random_dest)} ({random_dest.capitalize()})"
    
    else:
        raise ValueError(f"Destino desconocido: {destino}")