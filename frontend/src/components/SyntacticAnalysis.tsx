'use client';

import { AnalisisSintactico } from '@/types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface SyntacticAnalysisProps {
  data: AnalisisSintactico;
}

export default function SyntacticAnalysis({ data }: SyntacticAnalysisProps) {
  const getDestinoColor = (destino: string) => {
    switch (destino.toLowerCase()) {
      case 'hexadecimal':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'octal':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'binario':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'romano':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'alternativo':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
      case 'aleatorio':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 animate-slide-up">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
        <CheckCircle2 className="w-8 h-8 text-blue-600" />
        Análisis Sintáctico - Resultados
      </h2>

      <div className="space-y-4">
        {data.conversiones.map((conversion, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Entrada
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white font-mono bg-white dark:bg-gray-900 px-4 py-2 rounded-lg">
                    {conversion.numero}
                  </div>
                </div>

                <ArrowRight className="w-6 h-6 text-gray-400" />

                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Destino
                  </div>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${getDestinoColor(
                      conversion.destino
                    )}`}
                  >
                    {conversion.destino}
                  </span>
                </div>

                <ArrowRight className="w-6 h-6 text-gray-400" />

                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Resultado
                  </div>
                  <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-mono bg-white dark:bg-gray-900 px-4 py-2 rounded-lg">
                    {conversion.resultado}
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-3 py-1 rounded-full">
                #{index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.conversiones.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No hay conversiones para mostrar
        </div>
      )}

      <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-1">
              Total de Conversiones Exitosas
            </div>
            <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
              {data.conversiones.length}
            </div>
          </div>
          <CheckCircle2 className="w-16 h-16 text-indigo-300 dark:text-indigo-700" />
        </div>
      </div>
    </div>
  );
}