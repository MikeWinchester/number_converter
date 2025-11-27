'use client';

import { useState } from 'react';
import { FileText, Type, Upload, Loader2 } from 'lucide-react';

interface ConversionFormProps {
  onSubmitText: (text: string) => void;
  onSubmitFile: (file: File) => void;
  loading: boolean;
}

export default function ConversionForm({ onSubmitText, onSubmitFile, loading }: ConversionFormProps) {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmitText(text);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.txt')) {
      onSubmitFile(file);
    } else {
      alert('Por favor selecciona un archivo .txt');
    }
  };

  const ejemploTexto = `125Romano
525Hexadecimal
987Binario
2024Octal
$`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
        <FileText className="w-8 h-8 text-indigo-600" />
        Entrada de Conversiones
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
            activeTab === 'text'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          <Type className="w-5 h-5" />
          Texto
        </button>
        <button
          onClick={() => setActiveTab('file')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
            activeTab === 'file'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          <Upload className="w-5 h-5" />
          Archivo
        </button>
      </div>

      {/* Text Input Tab */}
      {activeTab === 'text' && (
        <form onSubmit={handleTextSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ingresa las conversiones (terminar con $)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={ejemploTexto}
              className="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono text-sm"
              disabled={loading}
            />
          </div>

          <button
            type="button"
            onClick={() => setText(ejemploTexto)}
            className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium"
            disabled={loading}
          >
            Usar ejemplo
          </button>

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Procesando...
              </>
            ) : (
              'Convertir y Analizar'
            )}
          </button>
        </form>
      )}

      {/* File Upload Tab */}
      {activeTab === 'file' && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-indigo-500 transition-colors">
            <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <label className="cursor-pointer">
              <span className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Selecciona un archivo
              </span>
              <span className="text-gray-600 dark:text-gray-400"> o arrastra aquí</span>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="hidden"
                disabled={loading}
              />
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Solo archivos .txt
            </p>
          </div>
        </div>
      )}

      {/* Formato de entrada */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          📝 Formato de entrada:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
          <li>• <strong>NúmeroDestino</strong> (sin espacios)</li>
          <li>• Destinos válidos: Hexadecimal, Octal, Binario, Romano, Alternativo, Aleatorio</li>
          <li>• Terminar con <strong>$</strong></li>
        </ul>
      </div>
    </div>
  );
}