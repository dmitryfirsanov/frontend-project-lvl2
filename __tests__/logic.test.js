import { test, expect } from '@jest/globals';
import {readFileSync} from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/logic.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('JSON files', () => {
  const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFile('result.txt');
  expect(actual1).toEqual(expected);
});
