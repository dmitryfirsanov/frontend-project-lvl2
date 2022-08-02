import { readFileSync } from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import makeParse from './parser.js';
import makeFormat from './formatters/index.js';

const getPathToFile = (file) => path.resolve(process.cwd(), '__fixtures__/', file);
const getExtensions = (file) => path.extname(file).slice(1);

const getContentFromFile = (filePath) => {
  const fileContent = readFileSync(getPathToFile(filePath), 'utf-8');
  const extension = getExtensions(filePath);
  return makeParse(fileContent, extension);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1Content = getContentFromFile(filepath1);
  const file2Content = getContentFromFile(filepath2);
  const diffInfo = buildTree(file1Content, file2Content);

  return makeFormat(diffInfo, formatName);
};

export default genDiff;
