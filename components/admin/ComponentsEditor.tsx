'use client';

import { FiPlus, FiTrash2 } from 'react-icons/fi';

export interface TechComponent {
  name: string;
  slug: string;
  category: string;
}

interface ComponentsEditorProps {
  components: TechComponent[];
  productCategories: { id: string; title: string }[];
  onChange: (components: TechComponent[]) => void;
}

export default function ComponentsEditor({
  components,
  productCategories,
  onChange,
}: ComponentsEditorProps) {
  const list = components || [];

  const updateItem = (index: number, field: keyof TechComponent, value: string) => {
    const next = [...list];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const addItem = () => {
    onChange([
      ...list,
      { name: '', slug: '', category: productCategories[0]?.id || 'drilling' },
    ]);
  };

  const removeItem = (index: number) => {
    onChange(list.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-slate-700">
          Компоненты системы
        </label>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center space-x-1 text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
        >
          <FiPlus size={14} /> <span>Добавить</span>
        </button>
      </div>
      <div className="space-y-2 bg-slate-50 p-3 rounded border border-slate-200">
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-white p-2 rounded border border-slate-200"
          >
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              placeholder="Название"
              className="px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={item.slug}
              onChange={(e) => updateItem(index, 'slug', e.target.value)}
              placeholder="slug продукта"
              className="px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <select
                value={item.category}
                onChange={(e) => updateItem(index, 'category', e.target.value)}
                className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {productCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
                <option value="drilling">drilling</option>
                <option value="cementing">cementing</option>
              </select>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1 hover:bg-red-50 text-red-600 rounded"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-2">Компоненты не добавлены</p>
        )}
      </div>
    </div>
  );
}
