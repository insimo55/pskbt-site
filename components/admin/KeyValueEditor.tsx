'use client';

import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface KeyValueEditorProps {
  label: string;
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}

export default function KeyValueEditor({ label, values, onChange }: KeyValueEditorProps) {
  const entries = Object.entries(values || {});

  const addRow = () => {
    const key = `параметр_${entries.length + 1}`;
    onChange({ ...values, [key]: '' });
  };

  const updateKey = (oldKey: string, newKey: string) => {
    if (!newKey || newKey === oldKey) return;
    const next = { ...values };
    next[newKey] = next[oldKey];
    delete next[oldKey];
    onChange(next);
  };

  const updateValue = (key: string, value: string) => {
    onChange({ ...values, [key]: value });
  };

  const removeRow = (key: string) => {
    const next = { ...values };
    delete next[key];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
        >
          <FiPlus size={14} /> <span>Добавить</span>
        </button>
      </div>
      <div className="space-y-2 bg-slate-50 p-3 rounded border border-slate-200">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-2 items-center">
            <input
              type="text"
              value={key}
              onChange={(e) => updateKey(key, e.target.value)}
              placeholder="Название"
              className="w-1/3 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => updateValue(key, e.target.value)}
              placeholder="Значение"
              className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeRow(key)}
              className="p-1 hover:bg-red-50 text-red-600 rounded"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-2">Нет записей</p>
        )}
      </div>
    </div>
  );
}
