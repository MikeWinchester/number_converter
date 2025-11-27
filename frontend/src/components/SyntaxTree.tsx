'use client';

import { ArbolSintactico, TreeNode } from '@/types';
import { GitBranch, Code, TreePine } from 'lucide-react';
import { useState } from 'react';

interface SyntaxTreeProps {
  data: ArbolSintactico;
}

export default function SyntaxTree({ data }: SyntaxTreeProps) {
  const [showJson, setShowJson] = useState(false);

  const renderTreeNode = (node: TreeNode, level: number = 0, isLast: boolean = false): JSX.Element => {
    const indent = level * 32;
    const isToken = node.tipo === 'token';
    const isNodo = node.tipo === 'nodo';
    const connector = isLast ? '└─' : '├─';

    return (
      <div key={`${node.tipo}-${level}-${Math.random()}`} className="font-mono text-sm">
        {isNodo && (
          <>
            <div className="flex items-center gap-2 py-1" style={{ marginLeft: `${indent}px` }}>
              <span className="text-gray-400">{connector}</span>
              <TreePine className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span className="font-bold text-purple-700 dark:text-purple-400">
                {node.regla}
              </span>
            </div>
            {node.hijos &&
              node.hijos.map((child, idx) => (
                <div key={idx}>
                  {renderTreeNode(child, level + 1, idx === node.hijos!.length - 1)}
                </div>
              ))}
          </>
        )}
        {isToken && (
          <div className="flex items-center gap-2 py-1" style={{ marginLeft: `${indent}px` }}>
            <span className="text-gray-400">{connector}</span>
            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {node.nombre}:
            </span>
            <span className="text-gray-800 dark:text-gray-200 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
              {node.valor}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
          <GitBranch className="w-8 h-8 text-purple-600" />
          Árbol Sintáctico (LARK)
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setShowJson(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              !showJson
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <TreePine className="w-4 h-4" />
            Vista Árbol
          </button>
          <button
            onClick={() => setShowJson(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              showJson
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <Code className="w-4 h-4" />
            Vista JSON
          </button>
        </div>
      </div>

      {!showJson ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border-2 border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="mb-4 pb-4 border-b border-gray-300 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <TreePine className="w-5 h-5 text-purple-500" />
              Estructura Jerárquica
            </h3>
          </div>
          
          {data.representacion_json.error ? (
            <div className="text-red-600 dark:text-red-400 font-mono">
              {data.representacion_json.error}
            </div>
          ) : (
            <div className="space-y-1">
              {renderTreeNode(data.representacion_json, 0, true)}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="mb-4 pb-4 border-b border-gray-300 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-500" />
              Representación JSON
            </h3>
          </div>
          <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre font-mono overflow-x-auto">
            {JSON.stringify(data.representacion_json, null, 2)}
          </pre>
        </div>
      )}

      {/* Leyenda */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <TreePine className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-semibold text-purple-900 dark:text-purple-300">
              Nodos (Reglas)
            </h4>
          </div>
          <p className="text-sm text-purple-800 dark:text-purple-400">
            Representan las reglas gramaticales de la estructura sintáctica (start, conversion)
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <h4 className="font-semibold text-green-900 dark:text-green-300">
              Tokens (Terminales)
            </h4>
          </div>
          <p className="text-sm text-green-800 dark:text-green-400">
            Elementos léxicos identificados: números, destinos y símbolos de fin
          </p>
        </div>
      </div>

      <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          Acerca del Árbol Sintáctico
        </h3>
        <p className="text-sm text-indigo-800 dark:text-indigo-400">
          Este árbol fue generado usando <strong>LARK</strong>, un parser moderno para Python.
          Representa la estructura sintáctica de las conversiones procesadas, mostrando cómo se
          organizan jerárquicamente los tokens identificados en el análisis léxico según las
          reglas de producción definidas en la gramática.
        </p>
      </div>
    </div>
  );
}