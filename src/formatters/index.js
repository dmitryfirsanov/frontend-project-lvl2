import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`Format: ${format} is not supported`);
  }
};
