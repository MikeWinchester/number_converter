'use client';

import { AnalisisLexico } from '@/types';
import { Code2 } from 'lucide-react';

interface LexicalAnalysisProps {
  data: AnalisisLexico;
}

export default function LexicalAnalysis({ data }: LexicalAnalysisProps) {
  const getTokenColor = (tipo: string) => {
    switch (tipo) {
      case 'NUMERO':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'DESTINO':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'FIN':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 animate-slide-up">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
        <Code2 className="w-8 h-8 text-green-600" />
        Análisis Léxico
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Línea
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tipo de Token
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Valor
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Posición
              </th>
            </tr>
          </thead>
          <tbody>
            {data.tokens.map((token, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300 font-mono">
                  {token.linea}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getTokenColor(
                      token.tipo
                    )}`}
                  >
                    {token.tipo}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300 font-mono font-semibold">
                  {token.valor}
                </td>
                <td className="py-4 px-4 text-gray-500 dark:text-gray-400 font-mono text-sm">
                  {token.posicion ?? '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">
            Tokens NUMERO
          </div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            {data.tokens.filter((t) => t.tipo === 'NUMERO').length}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">
            Tokens DESTINO
          </div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {data.tokens.filter((t) => t.tipo === 'DESTINO').length}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">
            Total Tokens
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {data.tokens.length}
          </div>
        </div>
      </div>
    </div>
  );
}