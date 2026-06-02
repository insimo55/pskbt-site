'use client';

import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiChevronDown } from 'react-icons/fi';
import ImageUpload from './ImageUpload';
import KeyValueEditor from './KeyValueEditor';
import StringListEditor from './StringListEditor';
import ComponentsEditor from './ComponentsEditor';
import Modal from './Modal';

interface TechCategory {
  id: string;
  title: string;
  slug?: string;
  descr: string;
  background: string;
  icon: string;
}

interface TechSystem {
  id: string;
  categoryId: string;
  slug: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  shortDescription: string;
  cardImage?: string;
  heroImage?: string;
  categorySpecs?: Record<string, string>;
  specs?: Record<string, string>;
  fullDescription?: string;
  advantages?: string[];
  applicationArea?: string;
  components?: { name: string; slug: string; category: string }[];
  [key: string]: any;
}

export default function TechnologiesManager() {
  const [categories, setCategories] = useState<TechCategory[]>([]);
  const [systems, setSystems] = useState<TechSystem[]>([]);
  const [productCategories, setProductCategories] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'systems'>('categories');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const [editingCategory, setEditingCategory] = useState<TechCategory | null>(null);
  const [editingSystem, setEditingSystem] = useState<TechSystem | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'category' | 'system'>('category');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [techRes, productsRes] = await Promise.all([
        fetch('/admin/api/technologies'),
        fetch('/admin/api/products'),
      ]);
      const data = await techRes.json();
      const productsData = await productsRes.json();
      setCategories(data.realTechnologies);
      setSystems(data.systems);
      setProductCategories(productsData.categories || []);
    } catch (error) {
      console.error('Error fetching technologies:', error);
    } finally {
      setLoading(false);
    }
  };

  const emptySystem = (): Partial<TechSystem> => ({
    id: `sys-${Date.now()}`,
    categoryId: categories[0]?.id || '',
    slug: '',
    title: '',
    subtitle: '',
    tags: [],
    shortDescription: '',
    cardImage: '',
    heroImage: '',
    categorySpecs: {},
    specs: {},
    fullDescription: '',
    advantages: [],
    applicationArea: '',
    components: [],
  });

  const saveCategory = async () => {
    try {
      const response = await fetch('/admin/api/technologies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: editingCategory ? 'updateCategory' : 'addCategory',
          data: formData,
        }),
      });

      if (response.ok) {
        fetchData();
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({});
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Удалить категорию?')) return;

    try {
      const response = await fetch('/admin/api/technologies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteCategory', data: { id } }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const saveSystem = async () => {
    try {
      const response = await fetch('/admin/api/technologies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: editingSystem ? 'updateSystem' : 'addSystem',
          data: formData,
        }),
      });

      if (response.ok) {
        fetchData();
        setIsModalOpen(false);
        setEditingSystem(null);
        setFormData({});
      }
    } catch (error) {
      console.error('Error saving system:', error);
    }
  };

  const deleteSystem = async (id: string) => {
    if (!confirm('Удалить систему?')) return;

    try {
      const response = await fetch('/admin/api/technologies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteSystem', data: { id } }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting system:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-slate-600">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'categories'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Категории технологий
        </button>
        <button
          onClick={() => setActiveTab('systems')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'systems'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Системы
        </button>
      </div>

      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-slate-900">Категории технологий</h3>
            <button
              onClick={() => {
                setModalType('category');
                setEditingCategory(null);
                setFormData({
                  id: `cat-${Date.now()}`,
                  title: '',
                  descr: '',
                  background: '',
                  icon: '',
                });
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiPlus /> <span>Новая категория</span>
            </button>
          </div>

          <div className="grid gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-900">{cat.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{cat.descr}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setModalType('category');
                        setEditingCategory(cat);
                        setFormData(cat);
                        setIsModalOpen(true);
                      }}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Modal
            isOpen={isModalOpen && modalType === 'category'}
            onClose={() => {
              setIsModalOpen(false);
              setEditingCategory(null);
              setFormData({});
            }}
            title={editingCategory ? 'Редактировать категорию' : 'Новая категория'}
            size="md"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ID</label>
                <input
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="water-based"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Название</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Описание</label>
                <textarea
                  value={formData.descr || ''}
                  onChange={(e) => setFormData({ ...formData, descr: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Фоновое изображение
                </label>
                <ImageUpload
                  currentImage={formData.background}
                  onUploadSuccess={(path) => setFormData({ ...formData, background: path })}
                  folder="tech"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Иконка</label>
                <ImageUpload
                  currentImage={formData.icon}
                  onUploadSuccess={(path) => setFormData({ ...formData, icon: path })}
                  folder="icons/tech"
                />
              </div>

              <div className="flex space-x-2 pt-4 border-t border-slate-200">
                <button
                  onClick={saveCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                    setFormData({});
                  }}
                  className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition"
                >
                  Отмена
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {activeTab === 'systems' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-slate-900">Системы</h3>
            <button
              onClick={() => {
                setEditingSystem(null);
                setFormData(emptySystem());
                setModalType('system');
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiPlus /> <span>Новая система</span>
            </button>
          </div>

          <div className="grid gap-4">
            {categories.map((cat) => {
              const catSystems = systems.filter((s) => s.categoryId === cat.id);
              if (catSystems.length === 0) return null;

              return (
                <div key={cat.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedCategory(expandedCategory === cat.id ? null : cat.id)
                    }
                    className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 transition flex items-center justify-between font-semibold text-slate-900"
                  >
                    <span>{cat.title}</span>
                    <FiChevronDown
                      className={`transition ${
                        expandedCategory === cat.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedCategory === cat.id && (
                    <div className="p-4 space-y-3">
                      {catSystems.map((sys) => (
                        <div
                          key={sys.id}
                          className="bg-white p-3 rounded border border-slate-200 flex justify-between items-start hover:shadow-md transition"
                        >
                          <div className="flex-1">
                            <h5 className="font-semibold text-slate-900">{sys.title}</h5>
                            <p className="text-sm text-slate-600">{sys.shortDescription}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingSystem(sys);
                                setFormData({
                                  ...emptySystem(),
                                  ...sys,
                                  tags: sys.tags || [],
                                  advantages: sys.advantages || [],
                                  components: sys.components || [],
                                  categorySpecs: sys.categorySpecs || {},
                                  specs: sys.specs || {},
                                });
                                setModalType('system');
                                setIsModalOpen(true);
                              }}
                              className="p-2 hover:bg-blue-50 text-blue-600 rounded"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteSystem(sys.id)}
                              className="p-2 hover:bg-red-50 text-red-600 rounded"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Modal
            isOpen={isModalOpen && modalType === 'system'}
            onClose={() => {
              setIsModalOpen(false);
              setEditingSystem(null);
              setFormData({});
            }}
            title={editingSystem ? 'Редактировать систему' : 'Новая система'}
            size="2xl"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ID</label>
                  <input
                    type="text"
                    value={formData.id || ''}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Категория</label>
                <select
                  value={formData.categoryId || ''}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Название</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Подзаголовок</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <StringListEditor
                label="Теги"
                items={formData.tags || []}
                onChange={(tags) => setFormData({ ...formData, tags })}
                placeholder="Универсальность"
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Краткое описание
                </label>
                <textarea
                  value={formData.shortDescription || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Полное описание
                </label>
                <textarea
                  value={formData.fullDescription || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, fullDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Изображение карточки
                  </label>
                  <ImageUpload
                    currentImage={formData.cardImage}
                    onUploadSuccess={(path) =>
                      setFormData({ ...formData, cardImage: path })
                    }
                    folder="tech"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hero-изображение
                  </label>
                  <ImageUpload
                    currentImage={formData.heroImage}
                    onUploadSuccess={(path) =>
                      setFormData({ ...formData, heroImage: path })
                    }
                    folder="tech"
                  />
                </div>
              </div>

              <KeyValueEditor
                label="Характеристики для списка (categorySpecs)"
                values={formData.categorySpecs || {}}
                onChange={(categorySpecs) => setFormData({ ...formData, categorySpecs })}
              />

              <KeyValueEditor
                label="Полные характеристики (specs)"
                values={formData.specs || {}}
                onChange={(specs) => setFormData({ ...formData, specs })}
              />

              <StringListEditor
                label="Преимущества"
                items={formData.advantages || []}
                onChange={(advantages) => setFormData({ ...formData, advantages })}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Область применения
                </label>
                <textarea
                  value={formData.applicationArea || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, applicationArea: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  rows={3}
                />
              </div>

              <ComponentsEditor
                components={formData.components || []}
                productCategories={productCategories}
                onChange={(components) => setFormData({ ...formData, components })}
              />

              <div className="flex space-x-2 pt-4 border-t border-slate-200">
                <button
                  onClick={saveSystem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingSystem(null);
                    setFormData({});
                  }}
                  className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition text-sm"
                >
                  Отмена
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
