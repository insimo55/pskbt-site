'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiFileText } from 'react-icons/fi';
import ImageUpload from './ImageUpload';
import Modal from './Modal';
import { createNewsContentTemplate } from '@/lib/newsContentTemplates';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  readTime: string;
  category: string;
  hasContent?: boolean;
}

function getNextNewsId(items: NewsItem[]): string {
  const numericIds = items
    .map((n) => parseInt(n.id, 10))
    .filter((n) => !Number.isNaN(n));
  const max = numericIds.length ? Math.max(...numericIds) : 0;
  return String(max + 1);
}

function formatNewsDate() {
  return new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState<NewsItem | null>(null);
  const [markdown, setMarkdown] = useState('');
  const [contentLoading, setContentLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch('/admin/api/news');
      const data = await response.json();
      if (response.ok) {
        setNews(data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const loadArticleContent = async (id: string) => {
    setContentLoading(true);
    try {
      const response = await fetch(`/admin/api/news?id=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (response.ok) {
        setMarkdown(data.content ?? '');
      } else {
        setMarkdown('');
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setMarkdown('');
    } finally {
      setContentLoading(false);
    }
  };

  const openCreateModal = () => {
    const nextId = getNextNewsId(news);
    setEditingNews(null);
    setFormData({
      id: nextId,
      title: '',
      description: '',
      date: formatNewsDate(),
      image: `/images/press/${nextId}.jpg`,
      readTime: '5 мин',
      category: 'События',
    });
    setMarkdown(createNewsContentTemplate());
    setIsModalOpen(true);
  };

  const openEditModal = async (item: NewsItem) => {
    setEditingNews(item);
    setFormData(item);
    setIsModalOpen(true);
    await loadArticleContent(item.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setFormData(null);
    setMarkdown('');
  };

  const insertMarkdownSnippet = (snippet: string) => {
    setMarkdown((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
  };

  const saveNews = async () => {
    if (!formData?.id?.trim() || !formData.title?.trim()) {
      alert('Укажите ID и название новости');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/admin/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: editingNews ? 'update' : 'add',
          data: formData,
          content: markdown,
        }),
      });

      if (response.ok) {
        await fetchNews();
        closeModal();
      } else {
        const err = await response.json();
        alert(err.error || 'Не удалось сохранить новость');
      }
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  const deleteNews = async (id: string) => {
    if (!confirm('Удалить новость и файл content/' + id + '.md?')) return;

    try {
      const response = await fetch('/admin/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id } }),
      });

      if (response.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-slate-600">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Управление новостями</h2>
          <p className="text-sm text-slate-500 mt-1">
            Метаданные — <code className="text-xs bg-slate-100 px-1 rounded">data/press.ts</code>,
            текст статьи — <code className="text-xs bg-slate-100 px-1 rounded">content/ID.md</code>
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FiPlus /> <span>Новая новость</span>
        </button>
      </div>

      <div className="grid gap-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg border border-slate-200 flex gap-4 hover:shadow-md transition"
          >
            {item.image && (
              <div className="w-24 h-24 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                {item.hasContent ? (
                  <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full flex items-center gap-1">
                    <FiFileText size={12} /> content/{item.id}.md
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full">
                    нет файла контента
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
              <div className="flex gap-3 mt-2 text-xs text-slate-500">
                <span>ID: {item.id}</span>
                <span>{item.date}</span>
                <span>{item.readTime}</span>
                <span>{item.category}</span>
              </div>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={() => openEditModal(item)}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => deleteNews(item.id)}
                className="p-2 hover:bg-red-50 text-red-600 rounded"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {formData && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingNews ? 'Редактировать новость' : 'Новая новость'}
          size="2xl"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  ID (имя файла)
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      id: e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''),
                    })
                  }
                  disabled={!!editingNews}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Файл: content/{formData.id || '…'}.md
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Категория</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Продукт">Продукт</option>
                  <option value="События">События</option>
                  <option value="Разработка">Разработка</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Название</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Краткое описание (лид)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Дата</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="15 Янв 2026"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Время чтения
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="5 мин"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Изображение (обложка)
              </label>
              <ImageUpload
                currentImage={formData.image}
                onUploadSuccess={(path) => setFormData({ ...formData, image: path })}
                folder="press"
              />
            </div>

            <div className="border-t border-slate-200 pt-4">
              <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                <label className="block text-sm font-medium text-slate-700">
                  Текст статьи (Markdown)
                </label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => insertMarkdownSnippet('## Заголовок\n\nТекст параграфа.')}
                    className="text-xs px-2 py-1 bg-slate-100 rounded hover:bg-slate-200"
                  >
                    + заголовок
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSnippet('### Подзаголовок\n\n')}
                    className="text-xs px-2 py-1 bg-slate-100 rounded hover:bg-slate-200"
                  >
                    + подзаголовок
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      insertMarkdownSnippet('- пункт списка;\n- ещё пункт;')
                    }
                    className="text-xs px-2 py-1 bg-slate-100 rounded hover:bg-slate-200"
                  >
                    + список
                  </button>
                  {!editingNews && formData.title && (
                    <button
                      type="button"
                      onClick={() =>
                        setMarkdown(createNewsContentTemplate(formData.title))
                      }
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      шаблон из названия
                    </button>
                  )}
                </div>
              </div>

              {contentLoading ? (
                <div className="text-sm text-slate-500 py-8 text-center">
                  Загрузка текста из content/{formData.id}.md…
                </div>
              ) : (
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder="## Начните писать статью в формате Markdown…"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y min-h-[280px]"
                  rows={14}
                />
              )}
              <p className="text-xs text-slate-500 mt-2">
                На сайте отображается через ReactMarkdown. Заголовок и лид берутся из полей
                выше, здесь — основной текст под hero-блоком.
              </p>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-slate-200">
              <button
                onClick={saveNews}
                disabled={saving || contentLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving ? 'Сохранение…' : 'Сохранить'}
              </button>
              <button
                onClick={closeModal}
                disabled={saving}
                className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition"
              >
                Отмена
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
