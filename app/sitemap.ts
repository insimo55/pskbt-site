import { MetadataRoute } from 'next'
import productsData from '@/data/products.json'
import technologiesData from '@/data/technologies.json'
import { news } from '@/data/press'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pskbt.ru'

  // Статические страницы
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/technologies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Категории продуктов
  const productCategories: MetadataRoute.Sitemap = productsData.categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Детальные страницы продуктов
  const productPages: MetadataRoute.Sitemap = productsData.products.map((product) => ({
    url: `${baseUrl}/products/${product.category}/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Категории технологий (только те, у которых есть slug)
  const techCategories = technologiesData.realTechnologies.filter((t) => t.slug)
  const techCategoryPages: MetadataRoute.Sitemap = techCategories.map((cat) => ({
    url: `${baseUrl}/technologies/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Системы технологий
  const techSystemPages: MetadataRoute.Sitemap = technologiesData.systems.map((sys) => {
    const category = techCategories.find((c) => c.id === sys.categoryId)
    const slug = category?.slug || 'other'
    return {
      url: `${baseUrl}/technologies/${slug}/${sys.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  // Страницы новостей
  const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${baseUrl}/press/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...productCategories,
    ...productPages,
    ...techCategoryPages,
    ...techSystemPages,
    ...newsPages,
  ]
}