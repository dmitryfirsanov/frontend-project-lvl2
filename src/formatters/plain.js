import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const plain = (diff) => {
  const iter = (tree, parent) => tree.map((node) => {
    const path = [...parent, node.key].join('.');

    switch (node.type) {
      case 'added':
        return `Property '${path}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${path}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'nested':
        return `${_.compact(iter(node.children, [path])).join('\n')}`;
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  const plainDiff = _.concat(iter(diff, []));
  return plainDiff.join('\n');
};

export default plain;
