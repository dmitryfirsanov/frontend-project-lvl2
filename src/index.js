import { readFileSync } from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parse from './parser.js';
import format from './formatters/index.js';

const getPathToFile = (file) => path.resolve(process.cwd(), '__fixtures__/', file);
const getExtensions = (file) => path.extname(file).slice(1);

const getContent = (filePath) => {
  const fileContent = readFileSync(getPathToFile(filePath), 'utf-8');
  const extension = getExtensions(filePath);
  return parse(fileContent, extension);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1Content = getContent(filepath1);
  const file2Content = getContent(filepath2);
  const differenceTree = buildTree(file1Content, file2Content);

  return format(differenceTree, formatName);
};

export default genDiff;
