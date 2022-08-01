import { readFileSync } from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parser from './parser.js';
import formatter from './formatters/index.js';

const pathToFile = (file) => path.resolve(process.cwd(), '__fixtures__/', file);
const findContent = (file) => readFileSync(pathToFile(file), 'utf-8');
const getFormat = (file) => path.extname(file);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parser(findContent(filepath1), getFormat(filepath1));
  const file2 = parser(findContent(filepath2), getFormat(filepath2));
  const diffInfo = buildTree(file1, file2);

  return formatter(diffInfo, formatName);
};

export default genDiff;
