'use client';

import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface SpecEditorProps {
  specs: Record<string, any>;
  onChange: (specs: Record<string, any>) => void;
}

function isVariantObject(value: unknown): value is Record<string, string | number> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export default function SpecEditor({ specs, onChange }: SpecEditorProps) {
  const addSpec = (multiVariant: boolean) => {
    const newKey = `параметр_${Object.keys(specs).length + 1}`;
    onChange({
      ...specs,
      [newKey]: multiVariant ? { А: '' } : '',
    });
  };

  const deleteSpec = (key: string) => {
    const newSpecs = { ...specs };
    delete newSpecs[key];
    onChange(newSpecs);
  };

  const updateSpecKey = (oldKey: string, newKey: string) => {
    if (newKey && newKey !== oldKey) {
      const newSpecs = { ...specs };
      newSpecs[newKey] = newSpecs[oldKey];
      delete newSpecs[oldKey];
      onChange(newSpecs);
    }
  };

  const setSimpleValue = (specKey: string, value: string) => {
    onChange({ ...specs, [specKey]: value });
  };

  const toggleMode = (specKey: string) => {
    const current = specs[specKey];
    if (isVariantObject(current)) {
      const first = Object.values(current)[0];
      onChange({ ...specs, [specKey]: first != null ? String(first) : '' });
    } else {
      onChange({ ...specs, [specKey]: { А: current != null ? String(current) : '' } });
    }
  };

  const updateVariantValue = (
    specKey: string,
    variant: string,
    value: string
  ) => {
    const row = specs[specKey];
    if (!isVariantObject(row)) return;
    onChange({
      ...specs,
      [specKey]: { ...row, [variant]: value },
    });
  };

  const renameVariant = (specKey: string, oldVariant: string, newVariant: string) => {
    if (!newVariant || newVariant === oldVariant) return;
    const row = specs[specKey];
    if (!isVariantObject(row)) return;
    const next = { ...row };
    next[newVariant] = next[oldVariant];
    delete next[oldVariant];
    onChange({ ...specs, [specKey]: next });
  };

  const addVariant = (specKey: string) => {
    const row = specs[specKey];
    if (!isVariantObject(row)) return;
    let label = 'А';
    const existing = new Set(Object.keys(row));
    const alphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';
    for (const char of alphabet) {
      if (!existing.has(char)) {
        label = char;
        break;
      }
    }
    if (existing.has(label)) {
      label = `марка_${Object.keys(row).length + 1}`;
    }
    onChange({ ...specs, [specKey]: { ...row, [label]: '' } });
  };

  const removeVariant = (specKey: string, variant: string) => {
    const row = specs[specKey];
    if (!isVariantObject(row) || Object.keys(row).length <= 1) return;
    const next = { ...row };
    delete next[variant];
    onChange({ ...specs, [specKey]: next });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <label className="block text-sm font-medium text-slate-700">
          Технические характеристики
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addSpec(false)}
            className="flex items-center space-x-1 text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition"
          >
            <FiPlus size={14} /> <span>Строка</span>
          </button>
          <button
            type="button"
            onClick={() => addSpec(true)}
            className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
          >
            <FiPlus size={14} /> <span>Таблица марок</span>
          </button>
        </div>
      </div>

      <div className="space-y-2 bg-slate-50 p-3 rounded border border-slate-200">
        {Object.entries(specs).map(([specKey, specValue]) => {
          const multi = isVariantObject(specValue);

          return (
            <div
              key={specKey}
              className="bg-white p-3 rounded border border-slate-200 hover:shadow-sm transition"
            >
              <div className="flex justify-between items-center mb-2 gap-2">
                <input
                  type="text"
                  value={specKey}
                  onChange={(e) => updateSpecKey(specKey, e.target.value)}
                  className="flex-1 px-2 py-1 bg-slate-50 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => toggleMode(specKey)}
                  className="text-xs px-2 py-1 rounded border border-slate-300 text-slate-600 hover:bg-slate-50 whitespace-nowrap"
                  title="Переключить между одним значением и таблицей марок"
                >
                  {multi ? '→ одно значение' : '→ таблица марок'}
                </button>
                <button
                  type="button"
                  onClick={() => deleteSpec(specKey)}
                  className="p-1 hover:bg-red-50 text-red-600 rounded"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              {multi ? (
                <div className="space-y-2">
                  {Object.entries(specValue).map(([variant, value]) => (
                    <div key={variant} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={variant}
                        onChange={(e) =>
                          renameVariant(specKey, variant, e.target.value)
                        }
                        className="w-16 px-2 py-1 border border-slate-300 rounded text-sm text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Название марки"
                      />
                      <input
                        type="text"
                        value={String(value ?? '')}
                        onChange={(e) =>
                          updateVariantValue(specKey, variant, e.target.value)
                        }
                        className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariant(specKey, variant)}
                        className="p-1 hover:bg-red-50 text-red-600 rounded"
                        title="Удалить марку"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addVariant(specKey)}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <FiPlus size={12} /> Добавить марку
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  value={specValue != null ? String(specValue) : ''}
                  onChange={(e) => setSimpleValue(specKey, e.target.value)}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          );
        })}

        {Object.keys(specs).length === 0 && (
          <div className="text-center text-slate-500 text-sm py-4">
            Нет характеристик. «Строка» — одно значение, «Таблица марок» — несколько
            подвидов (А, Б, В…).
          </div>
        )}
      </div>
    </div>
  );
}
