'use client';

import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import ImageUpload from './ImageUpload';
import SpecEditor from './SpecEditor';
import StringListEditor from './StringListEditor';
import Modal from './Modal';

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  [key: string]: any;
}

export default function ProductsManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories');

  // Form states
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'category' | 'product'>('category');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/admin/api/products');
      const data = await response.json();
      setCategories(data.categories);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCategory = async () => {
    try {
      const response = await fetch('/admin/api/products', {
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
      const response = await fetch('/admin/api/products', {
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

  const saveProduct = async () => {
    try {
      const response = await fetch('/admin/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: editingProduct ? 'updateProduct' : 'addProduct',
          data: formData,
        }),
      });

      if (response.ok) {
        fetchData();
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({});
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Удалить продукт?')) return;

    try {
      const response = await fetch('/admin/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteProduct', data: { id } }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-slate-600">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'categories'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Категории
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'products'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Продукты
        </button>
      </div>

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-slate-900">Категории продуктов</h3>
            <button
              onClick={() => {
                setModalType('category');
                setEditingCategory(null);
                setFormData({ id: '', title: '', description: '', image: '' });
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiPlus /> <span>Новая категория</span>
            </button>
          </div>

          {/* Category List */}
          <div className="grid gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center hover:shadow-md transition"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{cat.title}</h4>
                  <p className="text-sm text-slate-600">{cat.description}</p>
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
            ))}
          </div>

          {/* Edit Category Form - Modal */}
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
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Изображение</label>
                <ImageUpload
                  currentImage={formData.image}
                  onUploadSuccess={(path) => setFormData({ ...formData, image: path })}
                  folder="products"
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

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-slate-900">Продукты</h3>
            <button
              onClick={() => {
                setModalType('product');
                setEditingProduct(null);
                setFormData({
                  id: '',
                  slug: '',
                  name: '',
                  category: '',
                  shortDescription: '',
                  longDescription: '',
                  image: '',
                  technical: {},
                  pack: '',
                  safety_req: '',
                  transport: '',
                  application: '',
                  properties: [],
                  safety: { msds: '' },
                });
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiPlus /> <span>Новый продукт</span>
            </button>
          </div>

          {/* Product List */}
          <div className="grid gap-4">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-start hover:shadow-md transition"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{prod.name}</h4>
                  <p className="text-sm text-slate-600">{prod.shortDescription}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Категория: {categories.find((c) => c.id === prod.category)?.title}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setModalType('product');
                      setEditingProduct(prod);
                      setFormData(prod);
                      setIsModalOpen(true);
                    }}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Product Form - Modal */}
          <Modal
            isOpen={isModalOpen && modalType === 'product'}
            onClose={() => {
              setIsModalOpen(false);
              setEditingProduct(null);
              setFormData({});
            }}
            title={editingProduct ? 'Редактировать продукт' : 'Новый продукт'}
            size="xl"
          >
            <div className="space-y-4">
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Название</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Категория</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Выбрать категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Короткое описание
                </label>
                <textarea
                  value={formData.shortDescription || ''}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Полное описание
                </label>
                <textarea
                  value={formData.longDescription || ''}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Изображение</label>
                <ImageUpload
                  currentImage={formData.image}
                  onUploadSuccess={(path) => setFormData({ ...formData, image: path })}
                  folder="products"
                />
              </div>

              <div>
                <SpecEditor
                  specs={formData.technical || {}}
                  onChange={(specs) => setFormData({ ...formData, technical: specs })}
                />
              </div>

              <StringListEditor
                label="Свойства"
                items={formData.properties || []}
                onChange={(properties) => setFormData({ ...formData, properties })}
                placeholder="Например: Ингибитор глин"
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Упаковка
                </label>
                <textarea
                  value={formData.pack || ''}
                  onChange={(e) => setFormData({ ...formData, pack: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Требования к безопасности
                </label>
                <textarea
                  value={formData.safety_req || ''}
                  onChange={(e) => setFormData({ ...formData, safety_req: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Транспортировка и хранение
                </label>
                <textarea
                  value={formData.transport || ''}
                  onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Применение
                </label>
                <textarea
                  value={formData.application || ''}
                  onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Паспорт безопасности (PDF)
                </label>
                <input
                  type="text"
                  value={formData.safety?.msds || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      safety: { ...formData.safety, msds: e.target.value },
                    })
                  }
                  placeholder="/files/msds/example.pdf"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="flex space-x-2 pt-4 border-t border-slate-200">
                <button
                  onClick={saveProduct}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
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
