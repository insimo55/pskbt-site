import fs from 'fs/promises';
import path from 'path';

const defaultDataDir = path.join(process.cwd(), 'data');
const dataDir = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : defaultDataDir;

function resolveDataPath(filename: string) {
  return path.join(dataDir, filename);
}

export async function readJSON(filename: string) {
  try {
    const filePath = resolveDataPath(filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filename} from ${dataDir}:`, error);
    throw error;
  }
}

export async function writeJSON(filename: string, data: any) {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const filePath = resolveDataPath(filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename} to ${dataDir}:`, error);
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
  const content = await fs.readFile(resolveDataPath('press.ts'), 'utf-8');
  const match = content.match(/export const news\s*=\s*(\[[\s\S]*\])\s*;?\s*$/);
  if (match) {
    return JSON.parse(match[1]);
  }
  throw new Error('Could not parse news data');
}

export async function saveNews(newsArray: any[]) {
  const content = `export const news = ${JSON.stringify(newsArray, null, 4)};\n`;
  await fs.mkdir(dataDir, { recursive: true });
  const filePath = resolveDataPath('press.ts');
  await fs.writeFile(filePath, content, 'utf-8');
}
