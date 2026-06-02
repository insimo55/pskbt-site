import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export async function readJSON(filename: string) {
  try {
    const filePath = path.join(dataDir, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
}

export async function writeJSON(filename: string, data: any) {
  try {
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

export async function getProducts() {
  return readJSON('products.json');
}

export async function saveProducts(data: any) {
  return writeJSON('products.json', data);
}

export async function getTechnologies() {
  return readJSON('technologies.json');
}

export async function saveTechnologies(data: any) {
  return writeJSON('technologies.json', data);
}

export async function getNews() {
  const content = await fs.readFile(path.join(dataDir, 'press.ts'), 'utf-8');
  const match = content.match(/export const news\s*=\s*(\[[\s\S]*\])\s*;?\s*$/);
  if (match) {
    return JSON.parse(match[1]);
  }
  throw new Error('Could not parse news data');
}

export async function saveNews(newsArray: any[]) {
  const content = `export const news = ${JSON.stringify(newsArray, null, 4)};\n`;
  const filePath = path.join(dataDir, 'press.ts');
  await fs.writeFile(filePath, content, 'utf-8');
}
