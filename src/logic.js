import path from 'path';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import compare from './compare.js';

const genDiff = (file1, file2) => {
  const findFile = (file) => readFileSync(path.resolve(cwd(), '__fixtures__/', file), 'utf-8');

  // const getFormat = (file) => path.extname(file);

  const readFile1 = JSON.parse(findFile(file1));
  const readFile2 = JSON.parse(findFile(file2));

  return `{\n${compare(readFile1, readFile2)}}`;
};

export default genDiff;
