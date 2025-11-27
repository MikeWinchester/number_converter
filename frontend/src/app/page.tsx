'use client';

import { useState } from 'react';
import { RespuestaCompleta } from '@/types';
import { convertirTexto, convertirArchivo } from '@/services/api';
import ConversionForm from '@/components/ConversionForm';
import LexicalAnalysis from '@/components/LexicalAnalysis';
import SyntacticAnalysis from '@/components/SyntacticAnalysis';
import SyntaxTree from '@/components/SyntaxTree';
import { AlertCircle, Calculator } from 'lucide-react';

export default function Home() {
  const [resultado, setResultado] = useState<RespuestaCompleta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextSubmit = async (text: string) => {
    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      const data = await convertirTexto(text);
      setResultado(data);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.detail || err.message || 'Error al procesar la conversión';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSubmit = async (file: File) => {
    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      const data = await convertirArchivo(file);
      setResultado(data);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.detail || err.message || 'Error al procesar el archivo';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
              Conversor de Números
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Análisis Léxico, Sintáctico y Construcción de Árbol con PLY y LARK
          </p>
        </div>

        {/* Form */}
        <div className="mb-8">
          <ConversionForm
            onSubmitText={handleTextSubmit}
            onSubmitFile={handleFileSubmit}
            loading={loading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 animate-fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                  Error al procesar
                </h3>
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {resultado && (
          <div className="space-y-8">
            {/* Success Message */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-300">
                    ¡Análisis completado!
                  </h3>
                  <p className="text-green-700 dark:text-green-400 text-sm">
                    {resultado.mensaje}
                  </p>
                </div>
              </div>
            </div>

            {/* Lexical Analysis */}
            <LexicalAnalysis data={resultado.analisis_lexico} />

            {/* Syntactic Analysis */}
            <SyntacticAnalysis data={resultado.analisis_sintactico} />

            {/* Syntax Tree */}
            <SyntaxTree data={resultado.arbol_sintactico} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Desarrollado con Python (FastAPI, PLY, LARK) + Next.js + TypeScript</p>
          <p className="mt-2">
            © 2025 - Proyecto de Análisis Léxico y Sintáctico
          </p>
        </footer>
      </div>
    </div>
  );
}