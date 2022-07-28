import _ from 'lodash';

const stringify = (value, replacer, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const keyIndent = replacer.repeat(depth + 1);
  const bracketIndent = replacer.repeat(depth);
  const result = Object
    .entries(value)
    .map(([key, val]) => `${keyIndent}${key}: ${stringify(val, replacer, depth + 1)}`);

  return ['{', ...result, `${bracketIndent}}`].join('\n');
};

const stylish = (diff, replacer = '    ') => {
  const iter = (tree, depth = 1) => tree.map((node) => {
    const indent = replacer.repeat(depth);
    const signIndent = indent.slice(2);

    const makeLine = (value, mark) => `${signIndent}${mark} ${node.key}: ${stringify(value, replacer, depth)}`;

    switch (node.type) {
      case 'added':
        return makeLine(node.value, '+');
      case 'removed':
        return makeLine(node.value, '-');
      case 'unchanged':
        return makeLine(node.value, ' ');
      case 'nested':
        return `${indent}${node.key}: ${['{', ...iter(node.value, depth + 1), `${indent}}`].join('\n')}`;
      case 'changed':
        return [`${makeLine(node.value1, '-')}`,
          `${makeLine(node.value2, '+')}`].join('\n');
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  const stylishDiff = iter(diff);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default stylish;
