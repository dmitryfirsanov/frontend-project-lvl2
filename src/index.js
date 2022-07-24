import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import compare from './compare.js';
import parser from './parser.js';

const findFile = (file) => readFileSync(path.resolve(cwd(), '__fixtures__/', file), 'utf-8');
const getFormat = (file) => path.extname(file);

const genDiff = (file1, file2) => {
  const readFile1 = parser(findFile(file1), getFormat(file1));
  const readFile2 = parser(findFile(file2), getFormat(file2));

  return `{\n${compare(readFile1, readFile2)}}`;
};

export default genDiff;
