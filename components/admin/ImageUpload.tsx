'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUploadSuccess: (path: string) => void;
  folder?: string;
  currentImage?: string;
}

export default function ImageUpload({
  onUploadSuccess,
  folder = 'uploads',
  currentImage,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/admin/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onUploadSuccess(data.path);
      } else {
        setError('Ошибка загрузки');
      }
    } catch (err) {
      setError('Ошибка подключения');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {currentImage && (
        <div className="relative w-full h-40 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
        <span className="text-slate-700">
          {uploading ? 'Загрузка...' : '📷 Выбрать изображение'}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {error && (
        <div className="p-2 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
